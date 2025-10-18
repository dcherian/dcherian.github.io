#!/bin/bash

# org-mk EXPORT

# Build Vue.js typing game
echo "Building typ game..."
cd apps/typ/
npm run build
cd ../..

# Copy typ game to publish directory
echo "Copying typ game to publish/typ/..."
mkdir -p publish/typ
cp -r apps/typ/dist/* publish/typ/

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
cd publish/
git add --all && git commit -m "auto-commit" && git push -f origin
