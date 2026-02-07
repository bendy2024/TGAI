#!/usr/bin/env bash
set -euo pipefail

# Clean
rm -rf dist
mkdir -p dist

# Copy static assets
mkdir -p dist/css dist/js dist/assets
cp -R src/css/. dist/css/
cp -R src/js/. dist/js/
cp -R src/assets/. dist/assets/

# Build HTML (passthrough for now; include will be used next round)
NO_UPDATE_NOTIFIER=1 npx posthtml "src/pages/*.html" -o dist -c posthtml.config.cjs
