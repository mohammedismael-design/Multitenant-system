# Schoolzee – Multi-Tenant Platform

A multi-tenant SaaS platform built with **Laravel 13**, **Inertia.js**, **React**, and **TypeScript**.

---

## Requirements

| Tool | Version |
|------|---------|
| PHP  | ≥ 8.3   |
| Composer | ≥ 2.x |
| Node.js  | ≥ 20.x |
| npm      | ≥ 10.x |

> **Database:** SQLite is used by default (no server needed). Switch to PostgreSQL or MySQL by editing `.env`.

---

## Quick Start (one command)

After cloning, run from the project root:

```bash
bash setup.sh
```

This will:
1. Install PHP dependencies (`composer install`)
2. Create `.env` from `.env.example`
3. Generate the application key
4. Create the SQLite database file and run all migrations
5. Create the `storage` symlink
6. Install Node dependencies (`npm install`)
7. Build frontend assets (`npm run build`)

Then start the dev server:

```bash
composer run dev
```

That single command starts the Laravel server, queue worker, log viewer, and Vite dev server concurrently.

---

## Manual Setup (step by step)

```bash
# 1. Install PHP dependencies
composer install

# 2. Create environment file
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Create SQLite database file (skip for MySQL/PostgreSQL)
touch database/database.sqlite

# 5. Run database migrations
php artisan migrate

# 6. Create storage symlink
php artisan storage:link

# 7. Install Node dependencies
npm install

# 8. Build frontend assets
npm run build

# 9. Start development server
composer run dev
```

---

## Using PostgreSQL Instead of SQLite

Edit your `.env` and update these values:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

Then run `php artisan migrate`.

---

## Architecture Overview

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/            # Login / logout
│   │   ├── SuperAdmin/      # Super-admin panel controllers
│   │   └── Soc/             # Security Operations Center
│   └── Middleware/          # Tenant, role, IP blacklist, rate limit
├── Models/                  # Eloquent models
├── Modules/
│   └── Core/                # Core platform module (always enabled)
│       ├── Http/
│       ├── Models/
│       ├── Services/
│       └── migrations/
├── Providers/               # Service providers
└── Services/                # Business logic services

resources/js/
├── layouts/                 # App, SuperAdmin, Soc layouts
├── pages/                   # Inertia page components
└── components/              # Shared UI components

routes/
├── web.php                  # Tenant routes
├── super-admin.php          # Super-admin routes
├── soc.php                  # SOC routes
└── auth.php                 # Authentication routes
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `bash setup.sh` | Full first-time setup |
| `composer run dev` | Start all dev processes concurrently |
| `composer run test` | Run PHPUnit test suite |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build and bundle for production |

---

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
