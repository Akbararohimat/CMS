<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Seeder;

class CargoFlowTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $filePath = database_path(
            'seeders/data/cargoflow-template-master.json'
        );

        if (!file_exists($filePath)) {
            throw new \RuntimeException(
                'File CargoFlow master JSON tidak ditemukan.'
            );
        }

        $config = json_decode(
            file_get_contents($filePath),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        Template::updateOrCreate(
            ['slug' => 'cargoflow'],
            [
                'name' => 'CargoFlow',
                'category' => 'Corporate',
                'description' => 'Industrial logistics, freight forwarding, warehousing, and supply chain website template.',
                'default_config' => $config,
                'version' => 1,
                'is_active' => true,
            ]
        );

        $this->command->info(
            'CargoFlow master template berhasil disimpan.'
        );
    }
}