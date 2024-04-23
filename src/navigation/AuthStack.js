import React from 'react';
import OnboardingScreen from '@screens/auth/onboardingScreen';
import LoginScreen from '@screens/auth/loginScreen';
import RegisterScreen from '@screens/auth/registerScreen';
import OtpScreen from '@screens/auth/otpScreen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name='onboardingScreen' component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name='loginScreen' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='registerScreen' component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='otpScreen' component={OtpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
