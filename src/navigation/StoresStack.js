import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import CategoriesScreen from '@screens/stores/categoriesScreen';
import BookAppointmentScreen from '@screens/stores/bookAppointmentScreen';
import ConfirmationScreen from '@screens/stores/confirmationScreen';
import HistoryDetailScreen from '@screens/stores/historyDetailScreen';
import MessageScreen from '@screens/stores/messageScreen';
import CouponScreen from '@screens/stores/couponScreen';
import MainReviewScreen from '@screens/stores/mainReviewScreen';
import PaymentMethodScreen from '@screens/stores/paymentMethodScreen';
import ScheduleScreen from '@screens/stores/scheduleScreen';
import OngoingDetailScreen from '@screens/stores/ongoingDetailScreen';
import SearchScreen from '@screens/stores/searchScreen';
import SearchLocationScreen from '@screens/stores/searchLocationScreen';
import SpecialistProfileScreen from '@screens/stores/specialistProfileScreen';
import BookingDetail from '@screens/workers/bookingDetail';

const Stack = createStackNavigator();

const StoresStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name='categoriesScreen' component={CategoriesScreen} options={{ headerShown: false }} />
      <Stack.Screen name='bookAppointmentScreen' component={BookAppointmentScreen} options={{ headerShown: false }} />
      <Stack.Screen name='scheduleScreen' component={ScheduleScreen} options={{ headerShown: false }} />
      <Stack.Screen name='confirmationScreen' component={ConfirmationScreen} options={{ headerShown: false }} />
      <Stack.Screen name='messageScreen' component={MessageScreen} options={{ headerShown: false }} />
      <Stack.Screen name='couponScreen' component={CouponScreen} options={{ headerShown: false }} />
      <Stack.Screen name='paymentMethodScreen' component={PaymentMethodScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ongoingDetailScreen' component={OngoingDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name='searchLocationScreen' component={SearchLocationScreen} options={{ headerShown: false }} />
      <Stack.Screen name='historyDetailScreen' component={HistoryDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='specialistProfileScreen'
        component={SpecialistProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='mainReviewScreen' component={MainReviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name='searchScreen' component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name='bookingDetail' component={BookingDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StoresStack;
