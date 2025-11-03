import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { useColorScheme, View, Text, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

type RootStackParamList = {
  Placeholder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const scheme = useColorScheme();

  const theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: scheme === 'dark' ? '#050505' : '#f6f7fb',
      },
    }),
    [scheme],
  );

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function PlaceholderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Intuition Trainer</Text>
      <Text style={styles.copy}>
        Base project setup complete. Coming soon: onboarding flow and intuition games.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#111111',
  },
  headline: {
    color: '#f6f7fb',
    fontSize: 24,
    letterSpacing: 1,
  },
  copy: {
    color: '#b2b5c1',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
});
