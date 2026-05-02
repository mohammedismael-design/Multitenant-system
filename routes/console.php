<?php

use App\Console\Commands\ModuleMakeCommand;
use App\Console\Commands\ModuleRegisterCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Module management commands are auto-discovered from app/Console/Commands/
