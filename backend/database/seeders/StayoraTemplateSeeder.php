<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class StayoraTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/stayora-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File Stayora master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'stayora'],
            [
                'name' => 'Stayora',
                'category' => 'Corporate',
                'description' => 'Contemporary hotel and hospitality website template.',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'Stayora master template berhasil disimpan.'
        );
    }
}
