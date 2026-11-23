<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable= [
        'company_name',
        'contact_name',
        'email',
        'phone',
        'address',
        'notes',
        'status',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User:: class);
    }

    public function websites(): HasMany
    {
        return $this->hasMany(Website::class);
    }
}