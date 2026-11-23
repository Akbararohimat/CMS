<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['required', 'string', 'max:100'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password tidak valid.'],
            ]);
        }

        if (! in_array($user->role, [
            User::ROLE_ADMIN,
            User::ROLE_CUSTOMER,
        ], true)) {
            return response()->json([
                'message' => 'Akun tidak memiliki role yang valid.',
            ], 403);
        }

        if ($user->isCustomer() && ! $user->customer_id) {
            return response()->json([
                'message' => 'Akun customer belum terhubung dengan data customer.',
            ], 403);
        }

        if ($user->isAdmin() && $user->customer_id !== null) {
            return response()->json([
                'message' => 'Konfigurasi akun admin tidak valid.',
            ], 403);
        }

        $token = $user->createToken(
            $credentials['device_name']
        )->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'customer_id' => $user->customer_id,
                ],
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }

    public function user(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'customer_id' => $user->customer_id,
            ],
        ]);
    }
}
