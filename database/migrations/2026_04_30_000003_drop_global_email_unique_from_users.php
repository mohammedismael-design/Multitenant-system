<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Drop the global unique constraint on users.email so that two tenants
 * can have users with the same email address. The per-tenant uniqueness
 * is already enforced by the (tenant_id, email) composite index added in
 * extend_users_table. Super-admin / SOC users (tenant_id = NULL) keep
 * their emails unique via the composite index as well, since NULL != NULL.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['email']);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unique('email');
        });
    }
};
