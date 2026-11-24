<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class NusaGovTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/nusagov-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File NusaGov master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        // Pertahankan record ForgeWorks yang sudah ada.
        $template = Template::whereIn('slug', [
            'forgeworks',
            'nusagov',
        ])->first();

        if (!$template) {
            $template = new Template();
        }

        $template->fill([
            'name' => 'NusaGov',
            'slug' => 'nusagov',
            'category' => 'Government',
            'description' => 'Government institution and public service website template.',
            'default_config' => $config,
            'version' => 1,
            'is_active' => true,
        ]);

        $template->save();

        $this->command->info(
            'NusaGov master template berhasil disimpan.'
        );
    }
}
