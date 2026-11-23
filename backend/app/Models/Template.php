<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category',
        'description',
        'thumbnail',
        'default_config',
        'version',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'default_config' => 'array',
            'version' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function websites(): HasMany
    {
        return $this->hasMany(Website::class);
    }
}
