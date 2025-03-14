# Wardrobe+ App

A virtual wardrobe app that helps you organize your clothing items and create outfits.

## Troubleshooting Common Issues

### Metro Connection Issues

If you encounter the "Disconnected from Metro (1001: 'Stream end encountered')" error, follow these steps:

#### Quick Fix

1. Stop the current Metro server (Ctrl+C)
2. Run the app with a cleared cache:
   ```
   npm run start
   ```

#### Complete Reset (if the quick fix doesn't work)

1. Run the reset script:
   ```
   ./reset-cache.sh
   ```

This script will:
- Stop any running Metro processes
- Clear watchman watches
- Clear Metro, Expo, React Native, and Babel caches
- Reinstall dependencies
- Start the app with a clean cache

#### Manual Steps (if the script doesn't work)

1. Stop the Metro server (Ctrl+C)
2. Clear watchman watches:
   ```
   watchman watch-del-all
   ```
3. Clear Metro cache:
   ```
   rm -rf $TMPDIR/metro-*
   rm -rf node_modules/.cache
   ```
4. Clear Expo cache:
   ```
   rm -rf .expo/
   ```
5. Restart the app with a cleared cache:
   ```
   npx expo start --clear
   ```

### Gesture Handler Issues

If you encounter the "GestureDetector must be used as a descendant of GestureHandlerRootView" error:

1. Make sure your app's root component is wrapped with `GestureHandlerRootView`
2. Check the `app/_layout.tsx` file to ensure it has:
   ```tsx
   import { GestureHandlerRootView } from 'react-native-gesture-handler';
   
   // In the return statement:
   return (
     <GestureHandlerRootView style={{ flex: 1 }}>
       {/* Your app content */}
     </GestureHandlerRootView>
   );
   ```

For more details, see the [GESTURE_FIX.md](./GESTURE_FIX.md) file.

### Babel Configuration Issues

If you encounter the "[BABEL]: expo-router/babel is deprecated in favor of babel-preset-expo in SDK 50" error:

1. Update your `babel.config.js` file to remove the deprecated plugin:
   ```js
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: [
         // Reanimated plugin (needs to be listed last)
         'react-native-reanimated/plugin',
       ],
     };
   };
   ```

For more details, see the [BABEL_FIX.md](./BABEL_FIX.md) file.

## Development

- Start the development server: `npm run dev`
- Start with a cleared cache: `npm run start`
- Build for web: `npm run build:web`
- Run on Android: `npm run android`
- Run on iOS: `npm run ios`

## Features

- Virtual wardrobe organization
- Outfit creation and suggestions
- Style analysis
- Seasonal categorization
- User profiles
- Gesture-based interactions 