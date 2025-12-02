import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'paywall.discount.startTime';
const DISCOUNT_DELAY_MS = 5 * 60 * 1000; // 5 minutes

type DiscountOfferCardProps = {
  onClaim: () => void;
};

export function DiscountOfferCard({ onClaim }: DiscountOfferCardProps) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialise = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const startTime = stored ? Number(stored) : Date.now();

        if (!stored) {
          await AsyncStorage.setItem(STORAGE_KEY, String(startTime));
        }

        const elapsed = Date.now() - startTime;

        if (elapsed >= DISCOUNT_DELAY_MS) {
          setShowDiscount(true);
          setRemainingMs(0);
          return;
        }

        const remaining = DISCOUNT_DELAY_MS - elapsed;
        setRemainingMs(remaining);
        timerRef.current = setInterval(() => {
          setRemainingMs((prev) => {
            if (prev === null) {
              return prev;
            }

            const next = prev - 1000;
            if (next <= 0) {
              setShowDiscount(true);
              clearInterval(timerRef.current as NodeJS.Timeout);
              return 0;
            }
            return next;
          });
        }, 1000);
      } catch (error) {
        console.warn('[paywall] discount timer error', error);
        setShowDiscount(true);
      }
    };

    initialise();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (showDiscount) {
    return (
      <View style={styles.card}>
        <Text style={styles.discountTitle}>Special Discount!</Text>
        <Text style={styles.discountBody}>Get 80% off Intuition Trainer Premium.</Text>
        <TouchableOpacity style={styles.discountButton} onPress={onClaim}>
          <Text style={styles.discountButtonText}>Claim Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.countdown}>
      <Text style={styles.countdownLabel}>Unlocking a special offer in</Text>
      <Text style={styles.countdownValue}>{formatCountdown(remainingMs)}</Text>
    </View>
  );
}

export function formatCountdown(remainingMs: number | null) {
  if (remainingMs === null || remainingMs <= 0) {
    return '00:00';
  }

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  discountTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  discountBody: {
    fontSize: 15,
    color: '#4b5563',
  },
  discountButton: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  discountButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  countdown: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 16,
  },
  countdownLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  countdownValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
});

