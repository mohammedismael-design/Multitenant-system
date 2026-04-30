<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'tenant'])->group(function () {
    Route::get('/', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Tenant-scoped user management
    Route::resource('users', UserController::class)->except(['show']);
});

require __DIR__.'/auth.php';
require __DIR__.'/super-admin.php';
require __DIR__.'/soc.php';
