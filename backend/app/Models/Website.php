<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Website extends Model
{
    protected $fillable = [
        'customer_id',
        'template_id',
        'name',
        'slug',
        'domain',
        'status',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function config(): HasOne
    {
        return $this->hasOne(WebsiteConfig::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(WebsiteMedia::class);
    }
}
