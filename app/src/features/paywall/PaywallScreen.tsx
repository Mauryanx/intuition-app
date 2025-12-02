import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Screen } from '@/components';
import { usePaywallLogic } from './hooks/usePaywallLogic';
import { useProfileStore } from '@/state/profile';
import { DiscountOfferCard } from './components/DiscountOfferCard';

export function PaywallScreen() {
  const { pressedButton, freeTrial, fiftyOff } = usePaywallLogic();
  const { name } = useProfileStore();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>✓</Text>
          </View>
          <Text style={styles.headline}>
            {name ? `${name.trim()}, your plan is ready.` : 'Your plan is ready.'}
          </Text>
          <Text style={styles.body}>
            Unlock the full Intuition Trainer experience to keep your momentum.
          </Text>
        </View>

        <DiscountOfferCard onClaim={fiftyOff} />

        <View style={styles.ctaGroup}>
          <Button label="Let's get started" onPress={pressedButton} />
          <Button
            label="Try free preview"
            variant="ghost"
            onPress={freeTrial}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 48,
  },
  content: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroIconText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
  ctaGroup: {
    gap: 12,
    paddingHorizontal: 24,
  },
});

