
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('website_media', function (Blueprint $table) {
            $table->uuid('source_id')
                ->nullable()
                ->unique()
                ->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('website_media', function (Blueprint $table) {
            $table->dropUnique(['source_id']);
            $table->dropColumn('source_id');
        });
    }
};
