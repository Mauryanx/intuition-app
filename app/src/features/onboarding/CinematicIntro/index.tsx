import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  withRepeat,
  withSpring,
  interpolate,
  Extrapolation,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { MotiView, MotiText } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

const { width, height } = Dimensions.get('window');

// Asset imports
const HERO_HEADER = require('@/assets/cinematic/hero-header.png');
const HERO_FOOTER = require('@/assets/cinematic/hero-footer.png');
const AWARD_LEAVES = require('@/assets/cinematic/award-leaves.png');
const SHARK_IMG = require('@/assets/cinematic/onboarding-shark.png');
const FISH_WIREFRAME = require('@/assets/cinematic/onboarding-fish-wireframe.png');
const HAND_1 = require('@/assets/cinematic/onboarding-hand-animation-1.png');
const HAND_2 = require('@/assets/cinematic/onboarding-hand-animation-2.png');
const HAND_3 = require('@/assets/cinematic/onboarding-hand-animation-3.png');
// Placeholder avatar
const AVATAR_PLACEHOLDER = require('@/assets/splash-icon.png'); // Using app icon as placeholder avatar

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [step, setStep] = useState(0);
  // onboardingOpacity controls the fade out/in of the content container between steps
  const onboardingOpacity = useSharedValue(1);
  const theme = useTheme();

  const handleNext = () => {
    if (step === 2) {
      // End of flow
      onComplete();
    } else {
      // Fade out
      onboardingOpacity.value = withTiming(0, { duration: 500 }, () => {
        // Increment step
        // We use runOnJS because we're inside a worklet
        // But setState is stable so we can just call a wrapper or runOnJS
        // A simpler way for this high level orchestration is just setTimeout in JS thread
        // matching the duration.
      });

      // We'll manage state update in JS thread with timeout to match animation
      setTimeout(() => {
        setStep((prev) => prev + 1);
        // Fade in
        onboardingOpacity.value = withTiming(1, { duration: 500 });
      }, 500);
    }
  };

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: onboardingOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header - Fixed */}
      <View style={styles.headerContainer}>
        <Image source={HERO_HEADER} style={styles.headerImage} resizeMode="contain" />
      </View>

      {/* Main Content Area */}
      <Animated.View style={[styles.contentContainer, containerAnimatedStyle]}>
        
        {/* Visuals / Animations based on step */}
        <View style={styles.visualsContainer}>
          {step === 0 && <Step0Visuals />}
          {step === 1 && <Step1Visuals />}
          {step === 2 && <Step2Visuals />}
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          {step === 0 && (
            <View style={styles.textContent}>
              <Text style={styles.title}>Welcome to Intuition Trainer</Text>
              <Text style={styles.subtitle}>
                The most accurate and efficient way to calibrate your gut decisions.
              </Text>
            </View>
          )}
          {step === 1 && (
            <View style={styles.textContent}>
              <Text style={styles.title}>Train Your Gut Instinct</Text>
              <Text style={styles.subtitle}>
                Quickly and accurately sharpen your intuition with daily rapid-fire exercises.
              </Text>
            </View>
          )}
          {step === 2 && (
            <View style={styles.textContent}>
              <Text style={styles.title}>Backed by Science</Text>
              <Text style={styles.subtitle}>
                Experience the power of micro-prediction training, tailored to your personal cognitive style.
              </Text>
            </View>
          )}
        </View>

        {/* Controls (Button + Footer Info) */}
        <View style={styles.controlsContainer}>
          
            {/* Progress Indicators */}
            <ProgressView step={step} />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleNext}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.footerInfo}>
               {step === 0 && (
                 <FooterLabel icon="search" text="Trusted by 2,500+ Early Adopters" />
               )}
               {step === 1 && (
                 <FooterLabel icon="stats-chart" text="Over 10,000+ Decisions Logged" />
               )}
               {step === 2 && (
                 <FooterLabel icon="school" text="Based on 20+ Years of Research" />
               )}
            </View>
        </View>

      </Animated.View>

      {/* Footer - Fixed */}
      <View style={styles.footerContainer} pointerEvents="none">
        <Image source={HERO_FOOTER} style={styles.footerImage} resizeMode="contain" />
      </View>
    </View>
  );
}

// --- Sub-components for Visuals ---

function Step0Visuals() {
    // Testimonials
    return (
        <View style={styles.centerVisual}>
            <TestimonialView />
        </View>
    )
}

function Step1Visuals() {
  return (
    <View style={styles.centerVisual}>
        <FishAnimationView />
    </View>
  );
}

function Step2Visuals() {
  return (
    <View style={styles.centerVisual}>
        <SharkAnimationView />
    </View>
  );
}


// --- Animation Components ---

function TestimonialView() {
    // Simplified rotation logic for React Native
    const [index, setIndex] = useState(0);
    const testimonials = [
        { id: 1, title: "Such a good app", description: "" },
        // Add more to cycle
        { id: 1, title: "Amazing accuracy!", description: "" } 
    ];

    const opacity = useSharedValue(0);
    const scale = useSharedValue(2);
    const rotate = useSharedValue(30);

    useEffect(() => {
        // Entrance animation
        opacity.value = withTiming(1, { duration: 500 });
        scale.value = withTiming(1, { duration: 500 });
        rotate.value = withTiming(0, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { scale: scale.value },
            { rotate: `${rotate.value}deg` }
        ]
    }));

    return (
        <Animated.View style={[styles.testimonialCard, animatedStyle]}>
            <View style={styles.testimonialHeader}>
                 <Image source={AWARD_LEAVES} style={styles.leaves} resizeMode="contain" />
                 
                 <View style={styles.testimonialUser}>
                    <Image source={AVATAR_PLACEHOLDER} style={styles.avatar} />
                    <Text style={styles.testimonialTitle}>{testimonials[0].title}</Text>
                    <View style={styles.stars}>
                        {[1,2,3,4,5].map(i => (
                            <Ionicons key={i} name="star" size={16} color="#FFD700" />
                        ))}
                    </View>
                 </View>

                 <Image source={AWARD_LEAVES} style={[styles.leaves, { transform: [{ scaleX: -1 }] }]} resizeMode="contain" />
            </View>
        </Animated.View>
    )
}

function FishAnimationView() {
    // Sequence: Wireframe -> Hand enters -> Flash -> Hand w/ phone -> Identified
    // For MVP/Port: We'll fade these in sequence using Moti or Reanimated
    
    // Simplification: Just show the layers for now with basic timing
    const handOpacity = useSharedValue(0);
    
    useEffect(() => {
        handOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));
    }, []);

    const handStyle = useAnimatedStyle(() => ({
        opacity: handOpacity.value,
        transform: [{ scale: interpolate(handOpacity.value, [0, 1], [1.5, 1]) }]
    }));

    return (
        <View style={styles.fishContainer}>
            <Image source={FISH_WIREFRAME} style={styles.fishImage} resizeMode="contain" />
            
            <Animated.View style={[StyleSheet.absoluteFill, handStyle, { alignItems: 'center', justifyContent: 'center'}]}>
                 <Image source={HAND_1} style={styles.handImage} resizeMode="contain" />
            </Animated.View>
        </View>
    )
}

function SharkAnimationView() {
    // Scrolling binary text background + Shark image
    // We can simulate the scrolling text with an animated translation
    
    const scrollX = useSharedValue(0);

    useEffect(() => {
        scrollX.value = withRepeat(
            withTiming(-500, { duration: 10000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    const scrollStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: scrollX.value }]
    }));

    const BinaryRow = () => (
        <Animated.View style={[styles.binaryRow, scrollStyle]}>
            <Text style={styles.binaryText}>
                0101010101110000011001110111001001100001011001000110010100100000011101000110111100100000011101000110100001100101001000000111000001110010011001010110110101101001011101010110110100100000011101100110010101110010
            </Text>
        </Animated.View>
    );

    return (
        <View style={styles.sharkContainer}>
            <View style={styles.binaryBackground}>
                 <BinaryRow />
                 <BinaryRow />
                 <BinaryRow />
            </View>
            <Image source={SHARK_IMG} style={styles.sharkImage} resizeMode="contain" />
        </View>
    )
}

function ProgressView({ step }: { step: number }) {
    // Step indicators (Ladybug -> Camera -> Sparkles)
    const getIcon = (index: number) => {
        if (index === 0) return "bug";
        if (index === 1) return "camera";
        return "sparkles";
    };

    return (
        <View style={styles.progressContainer}>
            {[0, 1, 2].map((i) => {
                const isActive = step >= i;
                return (
                    <React.Fragment key={i}>
                        <View style={[styles.progressCircle, isActive && styles.progressCircleActive]}>
                             <Ionicons name={getIcon(i) as any} size={14} color="white" />
                        </View>
                        {i < 2 && (
                             <View style={[styles.progressLine, step > i && styles.progressLineActive]} />
                        )}
                    </React.Fragment>
                )
            })}
        </View>
    )
}

function FooterLabel({ icon, text }: { icon: string, text: string }) {
    return (
        <MotiView 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.footerLabelRow}
        >
            <Ionicons name={icon as any} size={16} color="#FF3B30" />
            <Text style={styles.footerLabelText}>{text}</Text>
        </MotiView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background as per reference
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 150,
    zIndex: 10,
    alignItems: 'center',
    paddingTop: 40,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 150,
    opacity: 0.5,
  },
  footerImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingTop: 120, // Space for header
  },
  visualsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // minHeight: 300,
  },
  centerVisual: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  textContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textContent: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
      color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  subtitle: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
  },
  controlsContainer: {
      gap: 20,
  },
  continueButton: {
      backgroundColor: '#FF3B30', // Red color from reference
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
  },
  continueButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
  },
  footerInfo: {
      alignItems: 'center',
      height: 20, // fixed height to prevent jumps
  },
  footerLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  footerLabelText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 12,
  },
  // Progress
  progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      marginBottom: 10,
  },
  progressCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'rgba(255,255,255,0.3)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  progressCircleActive: {
      backgroundColor: '#FF3B30',
  },
  progressLine: {
      flex: 1,
      height: 2,
      backgroundColor: 'rgba(255,255,255,0.1)',
      marginHorizontal: 4,
  },
  progressLineActive: {
      backgroundColor: '#FF3B30',
  },
  // Testimonials
  testimonialCard: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
  },
  testimonialHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 10,
  },
  testimonialUser: {
      alignItems: 'center',
      gap: 8,
  },
  avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
  },
  testimonialTitle: {
      color: 'white',
      fontSize: 20,
      fontStyle: 'italic',
      fontWeight: '600',
  },
  stars: {
      flexDirection: 'row',
      gap: 4,
  },
  leaves: {
      width: 40,
      height: 40,
  },
  // Fish
  fishContainer: {
      width: width * 0.8,
      height: width * 0.8,
      alignItems: 'center',
      justifyContent: 'center',
  },
  fishImage: {
      width: '100%',
      height: '100%',
      opacity: 0.6,
  },
  handImage: {
      width: '80%',
      height: '80%',
  },
  // Shark
  sharkContainer: {
      width: '100%',
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
  },
  sharkImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
  },
  binaryBackground: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.3,
  },
  binaryRow: {
      marginBottom: 10,
  },
  binaryText: {
      color: '#FF3B30',
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'Courier', // Monospace for binary look
      width: 2000, // Ensure it's long enough to scroll
  }
});

