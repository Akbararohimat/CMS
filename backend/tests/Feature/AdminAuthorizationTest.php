<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_customer_management(): void
    {
        $this->getJson('/api/customers')
            ->assertUnauthorized();
    }

    public function test_admin_can_access_customer_management(): void
    {
        $admin = User::factory()->create();

        $admin->forceFill([
            'role' => User::ROLE_ADMIN,
            'customer_id' => null,
        ])->save();

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/customers')
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'current_page',
                'per_page',
                'total',
            ]);
    }

    public function test_customer_cannot_access_admin_customer_management(): void
    {
        $customer = Customer::create([
            'company_name' => 'Test Customer',
            'status' => 'active',
        ]);

        $user = User::factory()->create();

        $user->forceFill([
            'role' => User::ROLE_CUSTOMER,
            'customer_id' => $customer->id,
        ])->save();

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/customers')
            ->assertForbidden();
    }

    public function test_admin_can_access_template_management(): void
    {
        $admin = User::factory()->create();

        $admin->forceFill([
            'role' => User::ROLE_ADMIN,
            'customer_id' => null,
        ])->save();

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/templates')
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'current_page',
                'per_page',
                'total',
            ]);
    }

    public function test_admin_can_access_website_management(): void
    {
        $admin = User::factory()->create();

        $admin->forceFill([
            'role' => User::ROLE_ADMIN,
            'customer_id' => null,
        ])->save();

        $this->actingAs($admin, 'sanctum')
            ->getJson('/api/websites')
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'current_page',
                'per_page',
                'total',
            ]);
    }
}
