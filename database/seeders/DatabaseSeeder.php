<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a demo subscription plan
        $plan = SubscriptionPlan::firstOrCreate(
            ['code' => 'demo'],
            [
                'name'                    => 'Demo',
                'description'             => 'Demo plan for development',
                'applicable_tenant_types' => ['school'],
                'price_monthly'           => 0,
                'price_yearly'            => 0,
                'max_users'               => 0,
                'max_storage_mb'          => 1024,
                'features'                => [],
                'is_active'               => true,
                'sort_order'              => 0,
            ]
        );

        // Create a demo tenant
        $tenant = Tenant::firstOrCreate(
            ['slug' => 'demo'],
            [
                'name'                    => 'Demo School',
                'type'                    => 'school',
                'email'                   => 'admin@demo.test',
                'status'                  => 'active',
                'subscription_plan_id'    => $plan->id,
                'subscription_status'     => 'active',
                'subscription_start_date' => now()->toDateString(),
                'subscription_end_date'   => now()->addYear()->toDateString(),
                'billing_cycle'           => 'yearly',
                'max_users'               => 0,
                'max_storage_mb'          => 1024,
            ]
        );

        // Create a super-admin user (no tenant scope)
        User::firstOrCreate(
            ['email' => 'superadmin@schoolzee.test'],
            [
                'name'      => 'Super Admin',
                'password'  => Hash::make('password'),
                'user_type' => 'super_admin',
                'is_active' => true,
            ]
        );

        // Create a tenant admin for the demo school
        User::firstOrCreate(
            ['email' => 'admin@demo.test'],
            [
                'tenant_id' => $tenant->id,
                'name'      => 'Demo Admin',
                'password'  => Hash::make('password'),
                'user_type' => 'tenant_admin',
                'is_active' => true,
            ]
        );
    }
}
