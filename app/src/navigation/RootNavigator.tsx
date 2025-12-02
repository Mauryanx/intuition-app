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
import { OnboardingFlow } from '@/features/onboarding/OnboardingFlow';
import {
  GameHubScreen,
  PatternCompletionScreen,
  SignalVsNoiseScreen,
  WordSprintScreen,
  AnomalyScoutScreen,
} from '@/features/games/screens';
import { PaywallScreen } from '@/features/paywall/PaywallScreen';
import { useTheme } from '@/theme';
import { trackEvent } from '@/services/analytics';

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
  Paywall: { trigger?: string } | undefined;
};

export type MainStackParamList = {
  GameHub: undefined;
  PatternCompletion: undefined;
  SignalVsNoise: undefined;
  WordSprint: undefined;
  AnomalyScout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

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
        initialRouteName="Onboarding"
      >
        <Stack.Screen
          name="Auth"
          component={AuthPlaceholder}
          options={{ animationTypeForReplace: 'push' }}
        />
        <Stack.Screen name="Onboarding" component={OnboardingFlow} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Paywall" component={PaywallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthPlaceholder() {
  return <PlaceholderScreen titleKey="auth.welcome" />;
}

function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="GameHub"
    >
      <MainStack.Screen name="GameHub" component={GameHubScreen} />
      <MainStack.Screen name="PatternCompletion" component={PatternCompletionScreen} />
      <MainStack.Screen name="SignalVsNoise" component={SignalVsNoiseScreen} />
      <MainStack.Screen name="WordSprint" component={WordSprintScreen} />
      <MainStack.Screen name="AnomalyScout" component={AnomalyScoutScreen} />
    </MainStack.Navigator>
  );
}

