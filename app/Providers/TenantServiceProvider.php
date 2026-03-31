<?php

namespace App\Providers;

use App\Services\ModuleService;
use App\Services\PermissionService;
use App\Services\SubscriptionService;
use App\Services\TenantService;
use Illuminate\Support\ServiceProvider;

class TenantServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(TenantService::class);
        $this->app->singleton(ModuleService::class);
        $this->app->singleton(SubscriptionService::class);
        $this->app->singleton(PermissionService::class);
    }

    public function boot(): void {}
}
