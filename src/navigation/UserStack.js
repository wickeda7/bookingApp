import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
// import AccountScreen from '../screens/user/accountScreen';
// import ChatScreen from '../screens/user/chatScreen';
// import FavoriteScreen from '../screens/user/favoriteScreen';
// import LanguageScreen from '../screens/user/languageScreen';
// import SettingScreen from '../screens/user/settingScreen';
// import InviteFriendScreen from '../screens/user/inviteFriendScreen';
// import CouponScreen from '../screens/user/couponScreen';
// import HelpSupportScreen from '../screens/user/helpSupportScreen';
import NotificationScreen from '@screens/user/notificationScreen';

const Stack = createStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {/* <Stack.Screen name='accountScreen' component={AccountScreen} options={{ headerShown: false }} />

      <Stack.Screen name='chatScreen' component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name='favoriteScreen' component={FavoriteScreen} options={{ headerShown: false }} />
      <Stack.Screen name='languageScreen' component={LanguageScreen} options={{ headerShown: false }} />

      <Stack.Screen name='settingScreen' component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name='inviteFriendScreen' component={InviteFriendScreen} options={{ headerShown: false }} />

      <Stack.Screen name='couponScreen' component={CouponScreen} options={{ headerShown: false }} />
      <Stack.Screen name='helpSupportScreen' component={HelpSupportScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name='notificationScreen'
        component={NotificationScreen}
        options={{ title: 'Notification', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
