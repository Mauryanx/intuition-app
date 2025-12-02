import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SuperwallMock } from '@/config/superwall';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { trackEvent } from '@/services/analytics';
import { useProfileStore } from '@/state/profile';

type PaywallPlacement =
  | 'under18'
  | 'age18to22'
  | 'age23to28'
  | 'age29to40'
  | 'over40'
  | 'fiftyOff'
  | 'free_trial';

export function usePaywallLogic() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { age } = useProfileStore();

  const primaryPlacement = useMemo(
    () => determinePlacement(age),
    [age],
  );

  const handleSuccess = useCallback(() => {
    trackEvent({ name: 'paywall_purchase_successful', params: { source: 'primary' } });
    navigation.replace('Main');
  }, [navigation]);

  const registerPlacement = useCallback(
    async (placement: PaywallPlacement) => {
      console.log('[paywall] registering placement', placement);
      await SuperwallMock.shared.register({
        placement,
        feature: handleSuccess,
      });
    },
    [handleSuccess],
  );

  const pressedButton = useCallback(() => {
    registerPlacement(primaryPlacement);
  }, [primaryPlacement, registerPlacement]);

  const fiftyOff = useCallback(() => {
    registerPlacement('fiftyOff');
  }, [registerPlacement]);

  const freeTrial = useCallback(() => {
    registerPlacement('free_trial');
  }, [registerPlacement]);

  return {
    pressedButton,
    fiftyOff,
    freeTrial,
  };
}

export function determinePlacement(age?: number | null): PaywallPlacement {
  if (typeof age !== 'number' || Number.isNaN(age)) {
    return 'age23to28';
  }

  if (age < 18) {
    return 'under18';
  }

  if (age <= 22) {
    return 'age18to22';
  }

  if (age <= 28) {
    return 'age23to28';
  }

  if (age <= 40) {
    return 'age29to40';
  }

  return 'over40';
}

