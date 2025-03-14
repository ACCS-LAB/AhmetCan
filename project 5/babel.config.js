module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove expo-router/babel from plugins as it's deprecated
      // Reanimated plugin (needs to be listed last)
      'react-native-reanimated/plugin',
    ],
  };
}; 