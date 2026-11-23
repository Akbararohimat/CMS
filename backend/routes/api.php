<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\WebsiteController;
use App\Http\Controllers\Api\WebsiteConfigController;
use App\Http\Controllers\Api\WebsiteMediaController;
use App\Http\Controllers\Api\PublicWebsiteController;

// Authentication
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:login');

// Public website
Route::get('/public/websites/{slug}', [PublicWebsiteController::class, 'show']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Admin-only CMS management
    Route::middleware('admin')->group(function () {

        // Customer management
        Route::apiResource('customers', CustomerController::class);

        // Template management
        Route::apiResource('templates', TemplateController::class);

        // Website management
        Route::apiResource('websites', WebsiteController::class);

        // Website configuration
        Route::get(
            '/websites/{website}/config',
            [WebsiteConfigController::class, 'show']
        );

        Route::put(
            '/websites/{website}/config',
            [WebsiteConfigController::class, 'update']
        );

        // Website media management
        Route::get(
            '/websites/{website}/media',
            [WebsiteMediaController::class, 'index']
        );

        Route::post(
            '/websites/{website}/media',
            [WebsiteMediaController::class, 'store']
        );

        Route::delete(
            '/websites/{website}/media/{media}',
            [WebsiteMediaController::class, 'destroy']
        );
    });
});
