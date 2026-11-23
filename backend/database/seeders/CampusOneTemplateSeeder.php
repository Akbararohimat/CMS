<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class CampusOneTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/campusone-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File CampusOne master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'campusone'],
            [
                'name' => 'CampusOne',
                'category' => 'Education',
                'description' => 'Editorial university website template with interactive academic programs and campus life.',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'CampusOne master template berhasil disimpan.'
        );
    }
}
