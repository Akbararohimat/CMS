<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Template;
use App\Models\Website;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class PtkmkWebsiteSeeder extends Seeder
{
    public function run(): void
    {
        $configPath = database_path('seeders/data/ptkmk-website.json');
        $mediaPath = database_path('seeders/data/ptkmk-media-export.json');

        if (! file_exists($configPath) || ! file_exists($mediaPath)) {
            throw new RuntimeException(
                'File import PT KMK tidak lengkap.'
            );
        }

        $config = json_decode(
            file_get_contents($configPath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        $mediaItems = json_decode(
            file_get_contents($mediaPath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        if (
            ! is_array($config) ||
            ! is_array($mediaItems) ||
            count($mediaItems) !== 8
        ) {
            throw new RuntimeException(
                'Data config atau 8 file media tidak valid.'
            );
        }

        if (
            ! isset($config['customers']['items']) ||
            ! is_array($config['customers']['items'])
        ) {
            throw new RuntimeException(
                'Struktur customers.items pada config tidak valid.'
            );
        }

        $customer = Customer::findOrFail(1);

        $template = Template::where('slug', 'corppro')
            ->where('is_active', true)
            ->firstOrFail();

        $slug = 'pt-kmk-plastics-indonesia';

        $website = Website::where('slug', $slug)->first();

        if ($website && $website->customer_id !== $customer->id) {
            throw new RuntimeException(
                'Slug website sudah digunakan customer lain.'
            );
        }

        if ($website && $website->template_id !== $template->id) {
            throw new RuntimeException(
                'Website PT KMK sudah menggunakan template berbeda.'
            );
        }

        // Validasi semua media sebelum mulai menyimpan file.
        $validatedMedia = [];
        $seenIds = [];

        foreach ($mediaItems as $item) {
            if (! is_array($item)) {
                throw new RuntimeException(
                    'Format salah satu data media tidak valid.'
                );
            }

            foreach (['id', 'name', 'type', 'size', 'data'] as $field) {
                if (! array_key_exists($field, $item)) {
                    throw new RuntimeException(
                        "Field media {$field} tidak ditemukan."
                    );
                }
            }

            if (! Str::isUuid($item['id'])) {
                throw new RuntimeException('UUID media tidak valid.');
            }

            if (isset($seenIds[$item['id']])) {
                throw new RuntimeException(
                    "UUID media duplikat: {$item['id']}"
                );
            }

            $seenIds[$item['id']] = true;

            $extension = match ($item['type']) {
                'image/webp' => 'webp',
                'image/jpeg' => 'jpg',
                'image/png' => 'png',
                default => throw new RuntimeException(
                    "MIME type tidak didukung: {$item['type']}"
                ),
            };

            $binary = base64_decode($item['data'], true);

            if (
                $binary === false ||
                strlen($binary) !== (int) $item['size']
            ) {
                throw new RuntimeException(
                    "Data media {$item['name']} tidak valid."
                );
            }

            $validatedMedia[] = [
                'id' => $item['id'],
                'name' => $item['name'],
                'type' => $item['type'],
                'size' => strlen($binary),
                'extension' => $extension,
                'binary' => $binary,
            ];
        }

        // Pastikan seluruh referensi logo tersedia dalam export.
        $availableIds = array_fill_keys(array_keys($seenIds), true);

        foreach ($config['customers']['items'] as $index => $customerItem) {
            $sourceId = $customerItem['logo']['id'] ?? null;

            if ($sourceId && ! isset($availableIds[$sourceId])) {
                throw new RuntimeException(
                    "Referensi logo pada customer index {$index} tidak ditemukan."
                );
            }
        }

        $createdFiles = [];

        try {
            DB::transaction(function () use (
                &$website,
                $customer,
                $template,
                $slug,
                $config,
                $validatedMedia,
                &$createdFiles
            ) {
                $website ??= Website::create([
                    'customer_id' => $customer->id,
                    'template_id' => $template->id,
                    'name' => 'PT KMK Plastics Indonesia',
                    'slug' => $slug,
                    'domain' => null,
                    'status' => 'draft',
                ]);

                // Import seluruh media.
                foreach ($validatedMedia as $item) {
                    $existing = $website->media()
                        ->where('source_id', $item['id'])
                        ->first();

                    if ($existing) {
                        if (
                            ! Storage::disk($existing->disk)
                                ->exists($existing->file_path)
                        ) {
                            throw new RuntimeException(
                                "File media {$item['name']} tidak ditemukan di storage."
                            );
                        }

                        continue;
                    }

                    $filePath = "websites/{$website->id}/media/{$item['id']}.{$item['extension']}";

                    // Jangan menimpa file yang sudah ada tetapi
                    // belum memiliki metadata database.
                    if (Storage::disk('public')->exists($filePath)) {
                        throw new RuntimeException(
                            "File tujuan sudah ada tanpa metadata: {$filePath}"
                        );
                    }

                    $stored = Storage::disk('public')->put(
                        $filePath,
                        $item['binary']
                    );

                    if (! $stored) {
                        throw new RuntimeException(
                            "Gagal menyimpan media {$item['name']}."
                        );
                    }

                    // Catat segera setelah file berhasil ditulis.
                    // Digunakan untuk cleanup jika transaksi gagal.
                    $createdFiles[] = [
                        'disk' => 'public',
                        'path' => $filePath,
                    ];

                    $website->media()->create([
                        'source_id' => $item['id'],
                        'collection' => 'ptkmk-import',
                        'disk' => 'public',
                        'file_path' => $filePath,
                        'original_name' => $item['name'],
                        'mime_type' => $item['type'],
                        'file_size' => $item['size'],
                    ]);
                }

                // Ambil metadata media untuk membuat URL logo.
                $mediaBySourceId = $website->media()
                    ->get()
                    ->keyBy('source_id');

                foreach ($config['customers']['items'] as &$customerItem) {
                    $sourceId = $customerItem['logo']['id'] ?? null;

                    if (! $sourceId) {
                        continue;
                    }

                    $media = $mediaBySourceId->get($sourceId);

                    if (! $media) {
                        throw new RuntimeException(
                            "Media logo {$sourceId} belum berhasil diimpor."
                        );
                    }

                    $customerItem['logo']['url'] = Storage::disk(
                        $media->disk
                    )->url($media->file_path);
                }

                unset($customerItem);

                // Config hanya dibuat jika belum tersedia.
                // Import ulang tidak menimpa hasil edit website.
                $website->config()->firstOrCreate(
                    ['website_id' => $website->id],
                    [
                        'config' => $config,
                        'version' => 1,
                    ]
                );
            });
        } catch (Throwable $exception) {
            // Database rollback tidak menghapus file fisik.
            // Hanya hapus file yang dibuat oleh proses ini.
            foreach (array_reverse($createdFiles) as $file) {
                try {
                    Storage::disk($file['disk'])->delete($file['path']);
                } catch (Throwable $cleanupException) {
                    report($cleanupException);
                }
            }

            throw $exception;
        }

        $website->refresh();

        $this->command->info(
            'Website PT KMK berhasil diimpor.'
        );

        $this->command->info(
            "Website ID: {$website->id}"
        );

        $this->command->info(
            'Total media: ' . $website->media()->count()
        );

        $this->command->info(
            'Config version: ' . ($website->config?->version ?? 0)
        );
    }
}
