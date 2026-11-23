<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WebsiteConfig extends Model
{
    protected $fillable = [
        'website_id',
        'config',
        'version',
    ];

    protected function casts(): array
    {
        return [
            'config' => 'array',
            'version' => 'integer',
        ];
    }

    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }
}
