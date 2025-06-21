#!/usr/bin/env bash
set -e

echo "Installing dependencies..."
npm ci

echo "Building React app..."
npm run build

echo "Build completed."
