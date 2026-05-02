#!/bin/bash

# 1. Get PHP version and install drivers
PHP_VER=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
echo "Detected PHP $PHP_VER. Installing PostgreSQL drivers..."
sudo apt-get update
sudo apt-get install -y php$PHP_VER-pgsql postgresql-client

# 2. Database & User Setup
# Uses 'sudo -u postgres' to bypass peer authentication issues
echo "Creating database and user..."
sudo -u postgres psql -c "CREATE DATABASE feeyangu;"
sudo -u postgres psql -c "CREATE USER feeyangu_user WITH PASSWORD 'IsmaTest';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE feeyangu TO feeyangu_user;"

# 3. Update Laravel .env
if [ -f .env ]; then
    echo "Updating .env file..."
    # Replace existing DB values or append if not found
    sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=pgsql/' .env
    sed -i 's/^DB_HOST=.*/DB_HOST=127.0.0.1/' .env
    sed -i 's/^DB_PORT=.*/DB_PORT=5432/' .env
    sed -i 's/^DB_DATABASE=.*/DB_DATABASE=feeyangu/' .env
    sed -i 's/^DB_USERNAME=.*/DB_USERNAME=feeyangu_user/' .env
    sed -i 's/^DB_PASSWORD=.*/DB_PASSWORD=IsmaTest/' .env
    
    # Clear Laravel cache
    php artisan config:clear
    echo "Setup complete! You can now run: php artisan migrate"
else
    echo "Error: .env file not found. Please run this script in your Laravel root folder."
fi
