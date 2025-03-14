import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function OutfitsScreen() {
  // Create a proper gesture object
  const tap = Gesture.Tap()
    .onStart(() => {
      console.log('Tap gesture detected');
    });

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={tap}>
        <View style={styles.content}>
          <Text>Outfits Screen</Text>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 