#!/usr/bin/env bash
set -e

SITE_URL="http://localhost:${WP_PORT:-8090}"
TITLE="LaMa Dev"
ADMIN_USER="admin"
ADMIN_PASS="admin"
ADMIN_EMAIL="you@example.com"

echo "==> Installing WordPress (if not already)..."
docker compose exec -T wpcli bash -lc "wp core is-installed || wp core install --url='${SITE_URL}' --title='${TITLE}' --admin_user='${ADMIN_USER}' --admin_password='${ADMIN_PASS}' --admin_email='${ADMIN_EMAIL}' --skip-email"

echo "==> Installing plugins..."
docker compose exec -T wpcli bash -lc "wp plugin install wp-graphql wp-graphql-acf advanced-custom-fields wp-graphql-tax-query --activate"



