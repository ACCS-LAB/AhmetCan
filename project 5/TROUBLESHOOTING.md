# Wardrobe+ App Troubleshooting Guide

This guide covers common issues you might encounter while developing or running the Wardrobe+ app and provides solutions for each.

## Table of Contents
1. [Metro Connection Issues](#metro-connection-issues)
2. [Gesture Handler Issues](#gesture-handler-issues)
3. [Babel Configuration Issues](#babel-configuration-issues)
4. [General React Native/Expo Issues](#general-react-nativeexpo-issues)

## Metro Connection Issues

### Issue: "Disconnected from Metro (1001: 'Stream end encountered')"

This error occurs when the Metro bundler loses connection with your app.

### Solutions:

#### Quick Fix
1. Stop the current Metro server (Ctrl+C)
2. Run the app with a cleared cache:
   ```
   npm run start
   ```

#### Complete Reset
1. Run the reset script:
   ```
   ./reset-cache.sh
   ```

#### Manual Steps
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

## Gesture Handler Issues

### Issue: "GestureDetector must be used as a descendant of GestureHandlerRootView"

This error occurs when you're using gesture components without properly setting up the gesture handler root view.

### Solution:
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

## Babel Configuration Issues

### Issue: "[BABEL]: expo-router/babel is deprecated in favor of babel-preset-expo in SDK 50"

This error occurs when using an outdated Babel plugin configuration with Expo SDK 50.

### Solution:
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

## General React Native/Expo Issues

### Issue: "Unable to resolve module X"

This error occurs when the Metro bundler can't find a module you're trying to import.

### Solutions:
1. Make sure the module is installed:
   ```
   npm install <module-name>
   ```
2. Clear the Metro cache:
   ```
   npm run clear
   ```
3. Check your import statement for typos

### Issue: App crashes on startup

If your app crashes immediately after launching:

### Solutions:
1. Check the error logs in the Metro bundler console
2. Look for red error screens in the app
3. Run the app in debug mode:
   ```
   npm run dev
   ```
4. Check for any syntax errors or runtime exceptions in your code

### Issue: Fonts not loading

If custom fonts aren't appearing in your app:

### Solutions:
1. Make sure the fonts are properly imported and loaded:
   ```tsx
   import { useFonts, Font_Name } from '@expo-google-fonts/font-family';
   
   export default function App() {
     const [fontsLoaded] = useFonts({
       'FontName': Font_Name,
     });
   
     if (!fontsLoaded) {
       return null;
     }
     
     // Rest of your app
   }
   ```
2. Check that the font names in your styles match the loaded font names
3. Verify that the fonts are properly installed in your project

### Issue: Slow app performance

If your app is running slowly:

### Solutions:
1. Use the Performance Monitor in the Expo DevTools
2. Check for unnecessary re-renders using React DevTools
3. Optimize large lists with `FlatList` and proper key usage
4. Use `useCallback` and `useMemo` for expensive operations
5. Implement proper image caching and optimization

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/) 