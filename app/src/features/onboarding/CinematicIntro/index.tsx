import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { MotiView, MotiImage, AnimatePresence } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// --- Assets ---
// Using relative paths to app/assets based on project structure
const ASSETS = {
  shark: require('../../../../assets/cinematic/onboarding-shark.png'),
  leaves: require('../../../../assets/cinematic/award-leaves.png'),
  fishWireframe: require('../../../../assets/cinematic/onboarding-fish-wireframe.png'),
  hand1: require('../../../../assets/cinematic/onboarding-hand-animation-1.png'),
  hand2: require('../../../../assets/cinematic/onboarding-hand-animation-2.png'),
  hand3: require('../../../../assets/cinematic/onboarding-hand-animation-3.png'),
  heroHeader: require('../../../../assets/cinematic/hero-header.png'),
  heroFooter: require('../../../../assets/cinematic/hero-footer.png'),
};

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  console.log('Rendering CinematicIntro');
  const [step, setStep] = useState(0);

  const handleNext = () => {
    console.log('CinematicIntro handleNext called, current step:', step);
    if (step < 2) {
      console.log('Moving to step', step + 1);
      setStep(step + 1);
    } else {
      console.log('Calling onComplete');
      onComplete();
    }
  };

  return (
    <View 
      style={styles.container}
      onStartShouldSetResponderCapture={() => {
        console.log('SCREEN TAP');
        return false;
      }}
    >
      <StatusBar style="light" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#000000', '#1C1C1E', '#000000']}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <Pressable 
        style={StyleSheet.absoluteFill} 
        onPress={() => console.log('SCREEN TAP')} 
      />

      {/* Header / Top */}
      <OnboardingHeaderView />

      {/* Main Content Area */}
      <View style={styles.content} pointerEvents="box-none">
          {step === 0 && (
              <MotiView 
                  key="step0"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'timing', duration: 500 }}
                  style={styles.stepContainer}
                  pointerEvents="box-none"
              >
                   <View style={styles.textBlock}>
                      <Text style={styles.headline}>Welcome to Intuition Trainer</Text>
                      <Text style={styles.subheadline}>The most accurate and efficient way to calibrate your gut instinct</Text>
                   </View>
                   
                   <View style={{ flex: 1, justifyContent: 'center' }}>
                      <OnboardingTestimonialView />
                   </View>
              </MotiView>
          )}
          
          {step === 1 && (
               <MotiView 
                  key="step1"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'timing', duration: 500 }}
                  style={styles.stepContainer}
                  pointerEvents="box-none"
              >
                  <View style={styles.textBlock}>
                      <Text style={styles.headline}>Train Your Instincts</Text>
                      <Text style={styles.subheadline}>Quickly and accurately discover your decision patterns with rapid-fire exercises.</Text>
                   </View>

                  <View style={{ flex: 1, justifyContent: 'center' }}>
                      <CustomAnimationFishPhotoView />
                  </View>
              </MotiView>
          )}

          {step === 2 && (
              <MotiView 
                  key="step2"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'timing', duration: 500 }}
                  style={styles.stepContainer}
                  pointerEvents="box-none"
              >
                  <View style={styles.textBlock}>
                      <Text style={styles.headline}>Powered by Science</Text>
                      <Text style={styles.subheadline}>Experience the power of cognitive protocols tailored to your brain.</Text>
                   </View>

                  <View style={{ flex: 1, justifyContent: 'center' }}>
                      <CustomAnimationDigitalSharkView />
                  </View>
              </MotiView>
          )}
      </View>

      {/* Footer / Controls */}
      <View style={styles.footer}>
          <TouchableOpacity 
            onPress={() => {
              console.log('BUTTON PRESSED! Step:', step);
              handleNext();
            }} 
            activeOpacity={0.8}
            style={{ backgroundColor: '#EF4444', borderRadius: 12 }}
          >
              <View style={styles.button}>
                  <Text style={styles.buttonText}>Continue (Step {step})</Text>
              </View>
          </TouchableOpacity>
            
            <View style={styles.statsRow}>
                {step === 0 && (
                    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.statItem}>
                        <Ionicons name="search" size={16} color="#EF4444" />
                        <Text style={styles.statText}>Trusted by 10,000+ Users</Text>
                    </MotiView>
                )}
                {step === 1 && (
                     <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.statItem}>
                        <Ionicons name="image" size={16} color="#EF4444" />
                        <Text style={styles.statText}>Over 1M+ Decisions Logged</Text>
                    </MotiView>
                )}
                {step === 2 && (
                     <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.statItem}>
                        <Ionicons name="flash" size={16} color="#EF4444" />
                        <Text style={styles.statText}>Trained on 50+ Cognitive Models</Text>
                    </MotiView>
                )}
            </View>
            
          {/* Progress Bar */}
          <OnboardingProgressView step={step} />
      </View>
    </View>
  );
}

// --- Visual Components ---

function OnboardingHeaderView() {
    return (
        <View style={styles.headerContainer} pointerEvents="none">
            {/* Using absolute positioning to match reference logic of ignoring safe area for bg elements */}
            <Image source={ASSETS.heroHeader} style={styles.heroHeader} resizeMode="cover" />
             <View style={{ flex: 1 }} /> 
             {/* heroFooter is used at bottom of screen in reference, but here we might place it absolutely bottom zIndex -1 if needed. 
                 Reference has it in a VStack with Spacer. */}
             {/* <Image source={ASSETS.heroFooter} style={styles.heroFooter} resizeMode="contain" /> */}
        </View>
    )
}

function OnboardingProgressView({ step }: { step: number }) {
    return (
        <View style={styles.progressContainer}>
            <ProgressStep 
                active={step >= 0} 
                icon="leaf" // Placeholder for 'ladybug.fill'
                isLast={false} 
                filled={step > 0}
            />
             <ProgressStep 
                active={step >= 1} 
                icon="camera" 
                isLast={false} 
                filled={step > 1}
            />
             <ProgressStep 
                active={step >= 2} 
                icon="flash" 
                isLast={true} 
                filled={false}
            />
        </View>
    )
}

function ProgressStep({ active, icon, isLast, filled }: { active: boolean, icon: any, isLast: boolean, filled: boolean }) {
    return (
        <View style={{ flex: isLast ? 0 : 1, flexDirection: 'row', alignItems: 'center' }}>
            <MotiView 
                animate={{ scale: active ? 1.2 : 0.8 }}
                style={[styles.progressCircle, { backgroundColor: active ? '#EF4444' : 'rgba(255,255,255,0.3)' }]}
            >
                <Ionicons name={icon} size={12} color="white" />
            </MotiView>
            
            {!isLast && (
                <View style={[styles.progressLine, { backgroundColor: filled ? '#EF4444' : 'rgba(255,255,255,0.1)' }]} />
            )}
        </View>
    )
}


// --- Animation 1: Testimonials ---
function OnboardingTestimonialView() {
    // Basic cycle animation
    // Ref logic: opacity 1 -> wait 3.4s -> opacity 0 -> wait 0.4s -> next -> loop
    // Simplified for MVP with Moti loop or interval
    
    // We'll show one static for now or simple fade in/out if needed. 
    // Reference has award leaves scaling and avatar
    
    return (
        <MotiView 
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 600 }}
            style={styles.testimonialCard}
        >
             <View style={styles.testimonialHeader}>
                 <Image source={ASSETS.leaves} style={styles.leaves} />
                 <View style={{ alignItems: 'center', marginHorizontal: 12 }}>
                     {/* Placeholder Avatar Circle */}
                     <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={40} color="#666" />
                     </View>
                     <Text style={styles.testimonialTitle}>Such a good app</Text>
                     <View style={{ flexDirection: 'row', gap: 2, marginTop: 4 }}>
                         {[1,2,3,4,5].map(i => <Ionicons key={i} name="star" size={12} color="#FBBF24" />)}
                     </View>
                 </View>
                 <Image source={ASSETS.leaves} style={[styles.leaves, { transform: [{ scaleX: -1 }] }]} />
             </View>
        </MotiView>
    )
}


// --- Animation 2: Fish/Hand ---
function CustomAnimationFishPhotoView() {
    // Reference: Hand scales in, Flash goes off, Hand 3 appears (identified)
    // Assets: fishWireframe (bg), hand1 (holding phone), hand2 (flash), hand3 (result)
    
    const [state, setState] = useState(0); // 0: init, 1: hand in, 2: flash, 3: result
    
    useEffect(() => {
        let mounted = true;
        const sequence = async () => {
            // Reset
            setState(0);
            await new Promise(r => setTimeout(r, 600)); // wait
            if(!mounted) return;
            
            // Hand In
            setState(1); 
            await new Promise(r => setTimeout(r, 1700));
            if(!mounted) return;
            
            // Flash
            setState(2);
            await new Promise(r => setTimeout(r, 200));
            if(!mounted) return;
            
            // Result
            setState(3);
            
            // Loop? Reference loops after 2.3s fade out.
            await new Promise(r => setTimeout(r, 3000));
            if(mounted) sequence();
        };
        sequence();
        return () => { mounted = false; };
    }, []);

    return (
        <View style={styles.visualContainer}>
            {/* Wireframe BG */}
            <MotiImage 
                source={ASSETS.fishWireframe}
                style={[styles.fishImage, { opacity: state >= 1 ? 0.4 : 1 }]} // Dim when hand enters
                resizeMode="contain"
                animate={{ scale: state >= 1 ? 1.1 : 1 }}
                transition={{ duration: 400 }}
            />
            
            {/* Hand 1: Holding Phone */}
            <MotiImage 
                source={ASSETS.hand1}
                style={[styles.handImage]}
                resizeMode="contain"
                from={{ opacity: 0, scale: 1.5 }}
                animate={{ 
                    opacity: state >= 1 ? 1 : 0,
                    scale: state >= 1 ? 1 : 1.5
                }}
                transition={{ type: 'timing', duration: 500 }}
            />
            
             {/* Hand 2: Flash */}
             <MotiImage 
                source={ASSETS.hand2}
                style={[styles.handImage]}
                resizeMode="contain"
                animate={{ opacity: state === 2 ? 1 : 0 }} // Only show on flash step temporarily? Or overlay
                 // Ref logic: opacity(identifiedOpacity == 0 ? flashOpacity : 0)
                transition={{ duration: 100 }}
            />
            
            {/* Hand 3: Identified Result */}
             <MotiImage 
                source={ASSETS.hand3}
                style={[styles.handImage]}
                resizeMode="contain"
                animate={{ opacity: state === 3 ? 1 : 0 }}
                transition={{ duration: 300 }}
            />
        </View>
    );
}

// --- Animation 3: Digital Shark ---
function CustomAnimationDigitalSharkView() {
    // Reference: Scrolling binary text behind the shark
    // Three rows of binary text scrolling at different speeds/offsets
    
    // We can simulate the scrolling text with Moti translate
    
    return (
        <View style={styles.visualContainer}>
            <View style={styles.binaryContainer}>
                {/* Simulated Binary Rows */}
                 <BinaryRow delay={0} duration={8000} />
                 <BinaryRow delay={100} duration={12000} />
                 <BinaryRow delay={200} duration={10000} />
            </View>
            
            <Image 
                source={ASSETS.shark}
                style={styles.sharkImage}
                resizeMode="contain"
            />
        </View>
    )
}

function BinaryRow({ duration }: { delay: number, duration: number }) {
    const text = "0101010101110000011001110111001001100001011001000110010100100000011101000110111100100000011101000110100001100101001000000111000001110010011001010110110101101001011101010110110100100000011101100110010101110010";
    
    return (
        <View style={{ height: 40, overflow: 'hidden', width: '100%' }}>
            <MotiView
                from={{ translateX: 0 }}
                animate={{ translateX: -1000 }} // Arbitrary large scroll
                transition={{ 
                    type: 'timing', 
                    duration: duration, 
                    loop: true, 
                    easing: (t) => t // Linear
                }}
                style={{ flexDirection: 'row' }}
            >
                <Text style={styles.binaryText}>{text}</Text>
                <Text style={styles.binaryText}>{text}</Text> 
            </MotiView>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Matches .preferredColorScheme(.dark)
  },
  headerContainer: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     height: height * 0.3,
     zIndex: -1,
     opacity: 0.6,
  },
  heroHeader: {
      width: '100%',
      height: '100%',
  },
  content: {
    flex: 1,
    paddingTop: 80, // Space for top content
    paddingBottom: 150, // Space for footer
  },
  stepContainer: {
      flex: 1,
      justifyContent: 'space-between',
  },
  textBlock: {
      paddingHorizontal: 24,
      alignItems: 'center',
      gap: 16,
  },
  headline: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
  },
  subheadline: {
      fontSize: 18,
      color: 'rgba(255,255,255,0.8)',
      textAlign: 'center',
      lineHeight: 24,
  },
  
  // Footer
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24,
      paddingBottom: 50,
      backgroundColor: 'transparent',
      zIndex: 100,
      elevation: 10,
  },
  button: {
      backgroundColor: '#EF4444', // Color.red
      height: 56,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
  },
  buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
  },
  statsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
  },
  statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  statText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 12,
  },
  progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 40,
  },
  progressCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
  },
  progressLine: {
      flex: 1,
      height: 2,
      marginHorizontal: 4,
  },
  
  // Visuals
  visualContainer: {
      width: width,
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
  },
  testimonialCard: {
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
      padding: 20,
      marginHorizontal: 24,
  },
  testimonialHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
  },
  avatarCircle: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: '#333',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
  },
  testimonialTitle: {
      color: 'white',
      fontSize: 20,
      fontStyle: 'italic',
      fontWeight: '600',
  },
  leaves: {
      width: 45,
      height: 45,
      resizeMode: 'contain',
  },
  
  // Fish Animation
  fishImage: {
      width: width * 0.9,
      height: 250,
  },
  handImage: {
      position: 'absolute',
      width: width * 0.6,
      height: 400, // Taller to show arm
      bottom: -50,
  },
  
  // Shark
  sharkImage: {
      width: width * 0.9,
      height: 300,
      zIndex: 10,
  },
  binaryContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      gap: 10,
  },
  binaryText: {
      fontSize: 50,
      fontWeight: 'bold',
      color: '#EF4444',
      opacity: 0.2,
      width: 2000, // Ensure long enough line
  },
});
