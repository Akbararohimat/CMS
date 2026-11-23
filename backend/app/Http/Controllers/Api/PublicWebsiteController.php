<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Website;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class PublicWebsiteController extends Controller
{
    public function show(string $slug): JsonResponse
    {
        $website = Website::query()
           ->where('slug', $slug)
           ->where('status', 'active')
           ->with([
            'template:id.name.slug.category',
            'config:id.website_id.config.version',
            'media',
           ])
           ->firstOrFail();
        $media = $website->media->map(function ($item) {
            return [
                'id' => $item->id,
                'collection' => $item->collection,
                'original_name' => $item->original_name,
                'mime_type' => $item->mime_type,
                'file_size' => $item->file_size,
                'alt_text' => $item->alt_text,
                'url' => Storage::disk($item->disk)->url($item->file_path),
            ];
        });

        return response()->json([
            'data' => [
                'name' => $website->name,
                'slug' => $website->slug,
                'domain' => $website->domain,
                'template' => $website->template,
                'config' => $website->config?->config,
                'config_version' => $website->config?->bversion,
                'media' => $media,
            ],
        ]);
    }
}