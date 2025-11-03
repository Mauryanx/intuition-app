import { Text, StyleSheet, View } from 'react-native';

import { Screen, Button, ProgressDots } from '@/components';
import { t } from '@/localization';
import { useTheme } from '@/theme';

interface PlaceholderScreenProps {
  titleKey?: Parameters<typeof t>[0];
  bodyKey?: Parameters<typeof t>[0];
  showProgress?: boolean;
  step?: number;
  totalSteps?: number;
}

export function PlaceholderScreen({
  titleKey = 'common.placeholderHeadline',
  bodyKey = 'common.placeholderBody',
  showProgress = false,
  step = 0,
  totalSteps = 3,
}: PlaceholderScreenProps) {
  const theme = useTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.content}>
          {showProgress ? <ProgressDots total={totalSteps} activeIndex={step} /> : null}
          <Text
            style={[
              styles.headline,
              theme.typography.headline,
              { color: theme.colors.text.primary },
            ]}
          >
            {t(titleKey)}
          </Text>
          <Text style={[styles.body, { color: theme.colors.text.secondary }]}>
            {t(bodyKey)}
          </Text>
        </View>
        <Button label={t('common.continue')} onPress={() => {}} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  content: {
    gap: 16,
  },
  headline: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
});
