# Gesture Handler Fix

## Issue
The app was showing the following error:
```
GestureDetector must be used as a descendant of GestureHandlerRootView. Otherwise the gestures will not be recognized.
```

This error occurred because the `GestureDetector` component in `outfits.tsx` was not wrapped in a `GestureHandlerRootView` component.

## Solution
We fixed this by wrapping the entire app in a `GestureHandlerRootView` component in the root layout file (`app/_layout.tsx`).

### Changes Made:

1. Added import in `app/_layout.tsx`:
   ```tsx
   import { GestureHandlerRootView } from 'react-native-gesture-handler';
   import { StyleSheet } from 'react-native';
   ```

2. Wrapped the entire app in `GestureHandlerRootView`:
   ```tsx
   return (
     <GestureHandlerRootView style={styles.container}>
       <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index" />
         <Stack.Screen name="onboarding" />
         <Stack.Screen name="(tabs)" />
         <Stack.Screen name="+not-found" />
       </Stack>
       <StatusBar style="light" />
     </GestureHandlerRootView>
   );
   ```

3. Added styles for the container:
   ```tsx
   const styles = StyleSheet.create({
     container: {
       flex: 1,
     },
   });
   ```

## Why This Works
According to the [react-native-gesture-handler documentation](https://docs.swmansion.com/react-native-gesture-handler/docs/installation), the `GestureHandlerRootView` component must wrap your entire app to properly handle gestures. This is because the gesture system needs to intercept touch events at the root level.

By wrapping the entire app in `GestureHandlerRootView`, we ensure that all gesture detectors in the app (including those in `outfits.tsx`) have access to the gesture system.

## Additional Notes
- The `GestureHandlerRootView` component is only needed once at the root of your app.
- All `GestureDetector` components must be descendants of this root view.
- The `style={{ flex: 1 }}` is important to ensure the root view takes up the entire screen. 