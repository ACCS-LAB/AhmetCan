import { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
  withSequence,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Sparkles, Shirt, TrendingUp } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const backgroundOpacity1 = useSharedValue(0);
  const backgroundOpacity2 = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const iconRotate = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textSlideUp = useSharedValue(20);
  const progressWidth = useSharedValue(0);
  const sparkleOpacity = useSharedValue(0);

  useEffect(() => {
    // Background animation
    backgroundOpacity1.value = withTiming(1, { duration: 1000 });
    backgroundOpacity2.value = withDelay(500, withTiming(1, { duration: 1000 }));
    
    // Logo animation
    logoScale.value = withDelay(800, withSpring(1, { damping: 12 }));
    logoOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    
    // Icon animation
    iconRotate.value = withDelay(1200, withSequence(
      withTiming(15, { duration: 300 }),
      withTiming(-15, { duration: 300 }),
      withTiming(0, { duration: 300 })
    ));
    
    // Sparkle animation
    sparkleOpacity.value = withDelay(1800, withTiming(1, { duration: 500 }));

    // Text animations
    textOpacity.value = withDelay(1500, withTiming(1, { duration: 800 }));
    textSlideUp.value = withDelay(1500, withTiming(0, { duration: 800 }));

    // Progress bar animation
    progressWidth.value = withTiming(1, { duration: 2500 });

    // Navigate to onboarding after animations
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const backgroundStyle1 = useAnimatedStyle(() => ({
    opacity: backgroundOpacity1.value,
  }));

  const backgroundStyle2 = useAnimatedStyle(() => ({
    opacity: backgroundOpacity2.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotate.value}deg` }],
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textSlideUp.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: interpolate(
      progressWidth.value,
      [0, 1],
      [0, width - 80],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Animated background layers */}
      <Animated.View style={[styles.backgroundLayer, backgroundStyle1]}>
        <LinearGradient
          colors={['#3D261C', '#2C1810']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      
      <Animated.View style={[styles.backgroundPattern, backgroundStyle2]}>
        <LinearGradient
          colors={['rgba(212, 165, 116, 0.1)', 'rgba(212, 165, 116, 0)']}
          style={styles.patternGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={styles.content}>
        {/* Logo container with glow effect */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <View style={styles.logoGlow}>
            <Animated.View style={[styles.iconContainer, iconStyle]}>
              <Shirt size={60} color="#D4A574" />
            </Animated.View>
            
            <Animated.View style={[styles.sparkleContainer, sparkleStyle]}>
              <Sparkles size={24} color="#D4A574" style={styles.sparkleIcon} />
              <TrendingUp size={24} color="#D4A574" style={styles.trendIcon} />
            </Animated.View>
            
            <Text style={styles.logo}>Wardrobe+</Text>
          </View>
        </Animated.View>

        {/* Tagline with animation */}
        <Animated.View style={[styles.taglineContainer, textStyle]}>
          <Text style={styles.tagline}>Stilinizi Yeniden Keşfedin</Text>
          <Text style={styles.subTagline}>Yapay Zeka Destekli Kişisel Gardırop Asistanınız</Text>
        </Animated.View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C0F0A',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
  },
  patternGradient: {
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoGlow: {
    alignItems: 'center',
    shadowColor: '#D4A574',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(61, 38, 28, 0.8)',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D4A574',
    marginBottom: 20,
  },
  sparkleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkleIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  trendIcon: {
    position: 'absolute',
    bottom: 40,
    left: 0,
  },
  logo: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 42,
    color: '#D4A574',
    textShadowColor: 'rgba(212, 165, 116, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  tagline: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#D4A574',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTagline: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#8B7355',
    textAlign: 'center',
    maxWidth: width - 80,
  },
  progressContainer: {
    width: width - 80,
    height: 3,
    backgroundColor: 'rgba(61, 38, 28, 0.5)',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4A574',
    borderRadius: 1.5,
  },
});