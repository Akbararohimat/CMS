<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class GovConnectTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/govconnect-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File GovConnect master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'govconnect'],
            [
                'name' => 'GovConnect',
                'category' => 'Government',
                'description' => 'Government public service website master template..',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'GovConnect master template berhasil disimpan.'
        );
    }
}