<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class SchoolMateTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/schoolmate-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File SchoolMate master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'schoolmate'],
            [
                'name' => 'SchoolMate',
                'category' => 'Education',
                'description' => 'Playful modern school website template with interactive learning levels, student life filters, and creative project showcase..',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'SchoolMate master template berhasil disimpan.'
        );
    }
}