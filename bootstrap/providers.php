<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;
use App\Providers\ModuleServiceProvider;
use App\Providers\TenantServiceProvider;

return [
    AppServiceProvider::class,
    FortifyServiceProvider::class,
    TenantServiceProvider::class,
    ModuleServiceProvider::class,
];
