<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class EduProTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/edupro-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File EduPro master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'edupro'],
            [
                'name' =>'EduPro',
                'category' => 'Education',
                'description' => 'Education website master template.',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'EduPro master template berhasil disimpan.'
        );
    }
}