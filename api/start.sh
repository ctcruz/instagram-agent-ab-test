#!/usr/bin/env sh
set -e
echo "Running Prisma migrations..."
npx prisma migrate deploy
echo "Starting NestJS API..."
node dist/src/main.js
