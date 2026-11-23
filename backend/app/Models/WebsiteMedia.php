<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WebsiteMedia extends Model
{
    protected $fillable = [
        'source_id',
        'website_id',
        'collection',
        'disk',
        'file_path',
        'original_name',
        'mime_type',
        'file_size',
        'alt_text',
    ];

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
        ];
    }

    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }
}
