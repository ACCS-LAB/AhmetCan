#!/bin/bash

# Stop any running Metro processes
echo "Stopping any running Metro processes..."
pkill -f "node.*metro" || true

# Clear watchman watches
echo "Clearing watchman watches..."
watchman watch-del-all || true

# Clear Metro cache
echo "Clearing Metro cache..."
rm -rf $TMPDIR/metro-* || true
rm -rf node_modules/.cache || true

# Clear Expo cache
echo "Clearing Expo cache..."
rm -rf .expo/ || true

# Clear React Native cache
echo "Clearing React Native cache..."
rm -rf $TMPDIR/react-* || true
rm -rf $TMPDIR/haste-* || true

# Clear Babel cache
echo "Clearing Babel cache..."
rm -rf node_modules/.cache/babel-loader/ || true

# Install dependencies
echo "Reinstalling node modules..."
npm install

# Start the app with a clean cache
echo "Starting the app with a clean cache..."
npm run start:reset

echo "Cache reset complete!" 