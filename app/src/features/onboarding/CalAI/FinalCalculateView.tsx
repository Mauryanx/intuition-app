import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';

const { height } = Dimensions.get('window');

// Messages to type out
const MESSAGES = [
  "Hey there,", // In real app, inject user name here
  "Welcome to Intuition Trainer, your path to faster, sharper decisions.",
  "Based on your answers, we've built a cognitive training plan just for you.",
  "It's designed to help you process high-stakes choices 3x faster.",
  "Now, it's time to invest in your mind."
];

interface FinalCalculateViewProps {
  onComplete: () => void;
}

export function FinalCalculateView({ onComplete }: FinalCalculateViewProps) {
  const [currentText, setCurrentText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (messageIndex >= MESSAGES.length) {
      setIsTyping(false);
      setShowButton(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }

    const currentMessage = MESSAGES[messageIndex];

    if (charIndex < currentMessage.length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
        
        // Haptic feedback every 2nd char to be less aggressive but tactile
        if (charIndex % 2 === 0) {
           Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }, 40); // Typing speed
      return () => clearTimeout(timer);
    } else {
      // Message complete, pause then next line
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + "\n\n");
        setMessageIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 600); // Pause between paragraphs
      return () => clearTimeout(timer);
    }
  }, [charIndex, messageIndex]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.typewriterText}>
          {currentText}
          {isTyping && <Text style={styles.cursor}>|</Text>}
        </Text>
      </ScrollView>

      {showButton && (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.footer}
        >
          <TouchableOpacity onPress={onComplete} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>See My Plan</Text>
          </TouchableOpacity>
        </MotiView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 30,
    paddingTop: 60,
    paddingBottom: 120,
  },
  typewriterText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    lineHeight: 34,
  },
  cursor: {
    color: '#007AFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  continueButton: {
    backgroundColor: 'black',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

