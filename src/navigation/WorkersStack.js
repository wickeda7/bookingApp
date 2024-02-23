import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import CProfile from '@screens/workers/clients/cProfile';

const Stack = createStackNavigator();
const WorkersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name='CProfile' component={CProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default WorkersStack;
