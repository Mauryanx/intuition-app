import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView, AnimatePresence } from 'moti';
import { Easing } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface AnalysisViewProps {
  onComplete: () => void;
}

export function AnalysisView({ onComplete }: AnalysisViewProps) {
  const [stage, setStage] = useState<'calculating' | 'complete'>('calculating');
  const [progress, setProgress] = useState(0);

  // Simulation of calculation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (stage === 'calculating') {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setStage('complete');
            return 100;
          }
          // Haptic feedback on progress ticks
          if (p % 10 === 0) {
             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          return p + 1;
        });
      }, 40); // 4 seconds total roughly
    }

    return () => clearInterval(interval);
  }, [stage]);

  const getSubtitle = (p: number) => {
    if (p < 30) return "Mapping cognitive biases...";
    if (p < 60) return "Identifying decision bottlenecks...";
    if (p < 90) return "Benchmarking against top performers...";
    return "Finalizing your profile...";
  };

  return (
    <View style={styles.container}>
      <AnimatePresence>
        {stage === 'calculating' ? (
          <MotiView
            key="calc"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }} // Explode effect
            style={styles.centerContainer}
          >
            <View style={styles.progressCircle}>
               <Text style={styles.progressText}>{progress}%</Text>
               <MotiView
                 from={{ rotate: '0deg' }}
                 animate={{ rotate: '360deg' }}
                 transition={{ loop: true, type: 'timing', duration: 2000, easing: Easing.linear }}
                 style={[StyleSheet.absoluteFill, styles.spinnerRing]}
               />
            </View>
            
            <Text style={styles.title}>Analyzing</Text>
            <Text style={styles.subtitle}>{getSubtitle(progress)}</Text>
          </MotiView>
        ) : (
          <MotiView
            key="result"
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.resultContainer}
          >
            <View style={styles.headerRow}>
               <Text style={styles.headerTitle}>Analysis Complete</Text>
               <Ionicons name="checkmark-circle" size={28} color="#32C730" />
            </View>

            {/* Placeholder for the Graph Image/Component */}
            <View style={styles.graphContainer}>
               <View style={styles.barContainer}>
                  <View style={styles.barLabelRow}>
                     <Text style={styles.barLabel}>Average Decision Speed</Text>
                  </View>
                  <View style={[styles.bar, { width: '40%', backgroundColor: '#E5E5EA' }]} />
               </View>

               <View style={styles.barContainer}>
                  <View style={styles.barLabelRow}>
                     <Text style={styles.barLabel}>Your Potential</Text>
                     <Ionicons name="rocket" size={16} color="#007AFF" />
                  </View>
                  <MotiView 
                    from={{ width: '0%' }}
                    animate={{ width: '90%' }}
                    transition={{ type: 'spring', delay: 300 }}
                    style={[styles.bar, { backgroundColor: '#007AFF' }]} 
                  />
               </View>
            </View>

            <Text style={styles.statText}>
              You could make decisions <Text style={styles.boldHighlight}>3x faster</Text> with <Text style={styles.boldHighlight}>20% higher accuracy</Text>.
            </Text>

            <Text style={styles.disclaimer}>
              * Projection based on your quiz responses compared to our user database.
            </Text>

            <TouchableOpacity
              onPress={onComplete}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    gap: 20,
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 15,
    borderColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  spinnerRing: {
    borderWidth: 15,
    borderColor: 'transparent',
    borderTopColor: '#007AFF', // Accent color
    borderRadius: 100,
  },
  progressText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  // Result Styles
  resultContainer: {
    flex: 1,
    width: '100%',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  graphContainer: {
    width: '100%',
    gap: 24,
    marginBottom: 40,
  },
  barContainer: {
    gap: 8,
  },
  barLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bar: {
    height: 40,
    borderRadius: 20,
  },
  statText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 10,
  },
  boldHighlight: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 60,
  },
  continueButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

