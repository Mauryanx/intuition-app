import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolation,
  SharedValue
} from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');

// Data for the carousel
const PAGES = [
  {
    id: '1',
    title: 'Overthinking is a Trap',
    subtitle: 'Your brain gets stuck in analysis loops, draining energy and missing the window of opportunity.',
    // In real app, use local assets. For now, placeholders or simple icons.
    icon: 'brain', 
    color: '#D90429', // Red/Blue theme from Cal AI
  },
  {
    id: '2',
    title: 'Analysis Paralysis',
    subtitle: 'Logic is slow. While you are weighing pros and cons, the situation has already changed.',
    icon: 'time',
    color: '#D90429',
  },
  {
    id: '3',
    title: 'The Speed Advantage',
    subtitle: 'Intuition is 10x faster than analytical thought. It is your brain\'s supercomputer.',
    icon: 'flash',
    color: '#D90429',
  },
  {
    id: '4',
    title: 'Calibrate, Don\'t Guess',
    subtitle: 'Intuition isn\'t magic. It is pattern recognition. And it can be trained like a muscle.',
    icon: 'stats-chart',
    color: '#D90429',
  },
  {
    id: '5',
    title: 'Your Secret Weapon',
    subtitle: 'Unlock the ability to make high-stakes decisions with confidence and speed.',
    icon: 'trophy',
    color: '#023e8a', // Blue for the final slide
  },
];

interface WhyViewProps {
  onComplete: () => void;
}

export function WhyView({ onComplete }: WhyViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);
  
  // Background color animation logic would go here, 
  // but for simplicity we'll just switch based on index for now
  const backgroundColor = currentIndex === PAGES.length - 1 ? '#023e8a' : '#D90429';

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const handleNext = () => {
    if (currentIndex < PAGES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleScrollEnd = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Logo Area */}
      <SafeAreaView>
        <View style={styles.header}>
           {/* Placeholder for Logo */}
           <Text style={styles.logoText}>INTUITION</Text>
        </View>
      </SafeAreaView>

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={PAGES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={({ item }) => (
            <View style={styles.pageContainer}>
              <View style={styles.iconContainer}>
                 <Ionicons name={item.icon as any} size={120} color="white" />
              </View>
              
              <Text style={styles.title}>{item.title}</Text>
              
              <Text style={styles.subtitle}>
                {parseMarkdown(item.subtitle)}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Footer controls */}
      <View style={styles.footer}>
        <PageIndicator scrollX={scrollX} count={PAGES.length} />
        
        <TouchableOpacity onPress={handleNext} activeOpacity={0.8}>
          <View style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper to bold text like "Using porn releases..." in reference
// For now, we just return text, but we can implement bold parsing later
function parseMarkdown(text: string) {
  return text.replace(/\*\*/g, ''); 
}

function PageIndicator({ scrollX, count }: { scrollX: SharedValue<number>; count: number }) {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <IndicatorDot key={i} index={i} scrollX={scrollX} />
      ))}
    </View>
  );
}

function IndicatorDot({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.4, 1, 0.4],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1.2, 0.8],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ scale }] };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // transition: 'background-color 0.3s ease', // Note: This is web CSS, won't work in RN natively without Reanimated color interpolation
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pageContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 60,
    // Add Lottie here later
  },
  title: {
    fontSize: 32,
    fontWeight: '900', // Black weight
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 50,
    gap: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  nextButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    minWidth: 160,
    justifyContent: 'center',
    gap: 8,
  },
  nextText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

