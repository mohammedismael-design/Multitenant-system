#!/bin/bash
# =============================================================================
# Schoolzee – Local Development Setup Script
# Run this once after cloning: bash setup.sh
# =============================================================================

set -e

echo ""
echo "============================================="
echo "  Schoolzee – Local Development Setup"
echo "============================================="
echo ""

# ---------------------------------------------------------------------------
# 1. PHP dependencies
# ---------------------------------------------------------------------------
echo "[1/7] Installing PHP dependencies..."
composer install --no-interaction

# ---------------------------------------------------------------------------
# 2. Environment file
# ---------------------------------------------------------------------------
echo "[2/7] Setting up .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "      .env created from .env.example"
else
    echo "      .env already exists – skipping"
fi

# ---------------------------------------------------------------------------
# 3. Application key
# ---------------------------------------------------------------------------
echo "[3/7] Generating application key..."
php artisan key:generate --ansi

# ---------------------------------------------------------------------------
# 4. Database
# ---------------------------------------------------------------------------
echo "[4/7] Preparing database..."

# Detect which connection is configured
DB_CONNECTION=$(grep '^DB_CONNECTION=' .env | cut -d '=' -f2 | tr -d '[:space:]')

if [ "$DB_CONNECTION" = "sqlite" ] || [ -z "$DB_CONNECTION" ]; then
    echo "      Using SQLite – creating database file..."
    php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
else
    echo "      Using $DB_CONNECTION – make sure the database server is running and .env is configured."
fi

php artisan migrate --force --ansi

# ---------------------------------------------------------------------------
# 5. Storage symlink
# ---------------------------------------------------------------------------
echo "[5/7] Creating storage symlink..."
php artisan storage:link --force

# ---------------------------------------------------------------------------
# 6. Node dependencies & frontend build
# ---------------------------------------------------------------------------
echo "[6/7] Installing Node dependencies..."
npm install

echo "[7/7] Building frontend assets..."
npm run build

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo ""
echo "============================================="
echo "  Setup complete!"
echo ""
echo "  Start the development server with:"
echo "    composer run dev"
echo ""
echo "  Or separately:"
echo "    php artisan serve"
echo "    npm run dev"
echo "============================================="
echo ""
