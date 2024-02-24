import { Text, Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { Fonts } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
import Device from 'react-native-device-info';
const isTablet = Device.isTablet();
const SplashScreen = (props) => {
  const { loading, loggedIn } = useAuthContext();
  useEffect(() => {
    if (!loading && loggedIn) {
      if (isTablet) {
        props.navigation.navigate('Home');
      } else {
        props.navigation.navigate('BottomTab');
      }
    }
    if (!loading && !loggedIn) {
      setTimeout(() => {
        if (isTablet) {
          props.navigation.navigate('onboardingScreen');
        } else {
          props.navigation.navigate('AuthStack', { screen: 'onboardingScreen' });
        }
      }, 500);
    }
  }, [loading, loggedIn]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MyStatusBar />
      <Image source={require('@assets/images/salonIcon.png')} />
      <Text style={Fonts.Primary40Bold}>Beauty</Text>
    </View>
  );
};

export default SplashScreen;
