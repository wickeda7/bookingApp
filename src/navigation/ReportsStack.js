import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Income from '@screens/workers/reports/income';
import Invoices from '@screens/workers/reports/Invoices';
import Weekly from '@screens/workers/reports/Weekly';
import InvoiceDetail from '@screens/workers/reports/InvoiceDetail';
const Stack = createStackNavigator();

const ReportsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name='Weekly' component={Weekly} options={{ headerShown: false }} />
      <Stack.Screen name='Income' component={Income} options={{ headerShown: false }} />
      <Stack.Screen name='Invoices' component={Invoices} options={{ headerShown: false }} />
      <Stack.Screen name='InvoiceDetail' component={InvoiceDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default ReportsStack;
