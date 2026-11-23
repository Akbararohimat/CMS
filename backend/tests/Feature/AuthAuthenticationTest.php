<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin-test@example.com',
            'password' => 'password',
        ]);

        $user->forceFill([
            'role' => User::ROLE_ADMIN,
            'customer_id' => null,
        ])->save();

        $response = $this->postJson('/api/login', [
            'email' => 'admin-test@example.com',
            'password' => 'password',
            'device_name' => 'automated-test',
        ]);

        $response->assertOk()
            ->assertJsonPath('message', 'Login berhasil.')
            ->assertJsonPath('data.user.role', User::ROLE_ADMIN)
            ->assertJsonPath('data.token_type', 'Bearer')
            ->assertJsonStructure([
                'data' => [
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'role',
                        'customer_id',
                    ],
                    'token',
                    'token_type',
                ],
            ]);

        $this->assertNotEmpty($response->json('data.token'));
    }

    public function test_login_fails_with_wrong_password(): void
    {
        $user = User::factory()->create([
            'email' => 'wrong-password@example.com',
            'password' => 'password',
        ]);

        $user->forceFill([
            'role' => User::ROLE_ADMIN,
            'customer_id' => null,
        ])->save();

        $this->postJson('/api/login', [
            'email' => 'wrong-password@example.com',
            'password' => 'incorrect-password',
            'device_name' => 'automated-test',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('email');
    }

    public function test_login_fails_with_unregistered_email(): void
    {
        $this->postJson('/api/login', [
            'email' => 'unknown@example.com',
            'password' => 'password',
            'device_name' => 'automated-test',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('email');
    }

    public function test_login_requires_all_fields(): void
    {
        $this->postJson('/api/login', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'email',
                'password',
                'device_name',
            ]);
    }

    public function test_login_rejects_invalid_user_role(): void
    {
        $user = User::factory()->create([
            'email' => 'invalid-role@example.com',
            'password' => 'password',
        ]);

        $user->forceFill([
            'role' => 'invalid-role',
            'customer_id' => null,
        ])->save();

        $this->postJson('/api/login', [
            'email' => 'invalid-role@example.com',
            'password' => 'password',
            'device_name' => 'automated-test',
        ])->assertForbidden()
            ->assertJsonPath(
                'message',
                'Akun tidak memiliki role yang valid.'
            );
    }

    public function test_login_is_rate_limited_after_five_attempts(): void
    {
        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $this->postJson('/api/login', [
                'email' =>'rate-limit@example.com',
                'password' => 'wrong-password',
                'device_name' => 'automated-test',
            ])->assertUnprocessable();
        }

        $this->postJson('/api/login', [
            'email' => 'rate-limit@example.com',
            'password' => 'wrong-password',
            'device_name' => 'automated-test',
        ])->assertStatus(429);
    }

    public function test_logout_revokes_current_token(): void
    {
        $user = User::factory()->create([
            'email' => 'logout-test@example.com',
            'password' => 'password',
        ]);

        $user->forceFill([
            'role' => User::ROLE_ADMIN,
            'customer_id' => null,
        ])->save();

        $loginResponse = $this->postJson('/api/login', [
            'email' => 'logout-test@example.com',
            'password' => 'password',
            'device_name' => 'automated-test',
        ]);

        $loginResponse->assertOk();

        $token = $loginResponse->json('data.token');

        $this->withToken($token)
            ->postJson('/api/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Logout berhasil.');

        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $user->id,
        ]);

        $this->app['auth']->forgetGuards();

        $this->withToken($token)
            ->getJson('/api/user')
            ->assertUnauthorized();
    }
}
