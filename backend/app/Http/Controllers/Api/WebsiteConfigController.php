<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Website;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WebsiteConfigController extends Controller
{
    public function show(Website $website): JsonResponse
    {
        $config = $website->config()->firstOrFail();

        return response()->json([
            'data' => $config,
        ]);
    }

    public function update(Request $request, Website $website): JsonResponse
    {
        $validated = $request->validate([
            'config' => ['required', 'array'],
        ]);

        $config = DB::transaction(function () use ($website, $validated) {
            $websiteConfig = $website->config()
                ->lockForUpdate()
                ->firstOrFail();

            $websiteConfig->update([
                'config' => $validated['config'],
                'version' => $websiteConfig->version + 1,
            ]);

            return $websiteConfig->fresh();
        });

        return response()->json([
            'message' => 'Konfigurasi website berhasil diperbarui.',
            'data' => $config,
        ]);
    }
}
