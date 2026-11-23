<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        if (! $user instanceof User || ! $user->isAdmin()) {
            return response()->json([
                'message' => 'Anda tidakmemiliki akses untuk melakukan tindakan ini.',
            ], 403);
        }

        return $next($request);
    }
}