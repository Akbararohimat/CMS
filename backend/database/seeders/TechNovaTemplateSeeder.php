<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class TechNovaTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/technova-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File TechNova master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'technova'],
            [
                'name' => 'TechNova',
                'category' => 'Corporate',
                'description' => 'Corporate technology website master template.',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'TechNova master template berhasil disimpan.'
        );
    }
}
