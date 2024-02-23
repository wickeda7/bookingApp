import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Income from '@screens/workers/reports/income';
import Invoices from '@screens/workers/reports/Invoices';
const Stack = createStackNavigator();

const ReportsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name='Income' component={Income} options={{ headerShown: false }} />
      <Stack.Screen name='Invoices' component={Invoices} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default ReportsStack;
