<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('website_configs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('website_id')
                ->unique()
                ->constrained('websites')
                ->cascadeOnDelete();

            $table->jsonb('config');

            $table->unsignedInteger('version')->default(1);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('website_configs');
    }
};
