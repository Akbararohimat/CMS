<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class CivicPortalTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/civicportal-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File CivicPortal master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'civicportal'],
            [
                'name' => 'CivicPortal',
                'category' => 'Government',
                'description' => 'Modern urban government public service portal master template.',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'CivicPortal master template berhasil disimpan.'
        );
    }
}
