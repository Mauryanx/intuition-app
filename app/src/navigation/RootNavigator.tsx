import {
  NavigationContainer,
  DefaultTheme,
  type NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

import { PlaceholderScreen } from '@/features/placeholders/PlaceholderScreen';
import { useTheme } from '@/theme';
import { trackEvent } from '@/services/analytics';

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
  Paywall: { trigger?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const routeNameRef = useRef<string | undefined>(undefined);

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background.primary,
      text: theme.colors.text.primary,
      primary: theme.colors.accent.primary,
      card: theme.colors.background.secondary,
      border: theme.colors.border.subtle,
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      onReady={() => {
        const route = navigationRef.current?.getCurrentRoute();
        if (route) {
          routeNameRef.current = route.name;
          trackEvent({ name: 'screen_view', params: { screen_name: route.name } });
        }
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        if (currentRouteName && currentRouteName !== routeNameRef.current) {
          routeNameRef.current = currentRouteName;
          trackEvent({ name: 'screen_view', params: { screen_name: currentRouteName } });
        }
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthPlaceholder}
          options={{ animationTypeForReplace: 'push' }}
        />
        <Stack.Screen name="Onboarding" component={OnboardingPlaceholder} />
        <Stack.Screen name="Main" component={MainPlaceholder} />
        <Stack.Screen name="Paywall" component={PaywallPlaceholder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthPlaceholder() {
  return <PlaceholderScreen titleKey="auth.welcome" />;
}

function OnboardingPlaceholder() {
  return (
    <PlaceholderScreen
      titleKey="onboarding.headline"
      bodyKey="onboarding.subheadline"
      showProgress
      step={1}
      totalSteps={4}
    />
  );
}

function MainPlaceholder() {
  return (
    <PlaceholderScreen
      titleKey="common.placeholderHeadline"
      bodyKey="common.placeholderBody"
    />
  );
}

function PaywallPlaceholder() {
  return <PlaceholderScreen titleKey="paywall.headline" bodyKey="paywall.cta" />;
}
