<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Website;
use App\Models\WebsiteMedia;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WebsiteMediaController extends Controller
{
    public function index(Website $website): JsonResponse
    {
        $media = $website->media()->latest()->get()->map(function ($item) {
            return [
                ...$item->toArray(),
                'url' => Storage::disk($item->disk)->url($item->file_path),
            ];
        });

        return response()->json([
            'data' => $media,
        ]);
    }

    public function store(Request $request, Website $website): JsonResponse
    {
        $validated = $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,webp,gif,mp4,webm',
                'max:102400',
            ],
            'collection' => ['nullable', 'string', 'max:255'],
            'alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $validated['file'];
        $disk = 'public';
        $path = $file->store("websites/{$website->id}", $disk);

        $media = $website->media()->create([
            'collection' => $validated['collection'] ?? null,
            'disk' => $disk,
            'file_path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'alt_text' => $validated['alt_text'] ?? null,
        ]);

        return response()->json([
            'message' => 'Media berhasil diunggah.',
            'data' => [
                ...$media->toArray(),
                'url' => Storage::disk($disk)->url($path),
            ],
        ], 201);
    }

    public function destroy(
        Website $website,
        WebsiteMedia $media
    ): JsonResponse {
        abort_unless($media->website_id === $website->id, 404);

        Storage::disk($media->disk)->delete($media->file_path);
        $media->delete();

        return response()->json([
            'message' => 'Media berhasil dihapus.',
        ]);
    }
}
