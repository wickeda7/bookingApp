import { Text, Image, View } from 'react-native';
import React from 'react';
import { Fonts } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';

const SplashScreen = (props) => {
  setTimeout(() => {
    props.navigation.push('AuthStack', { screen: 'onboardingScreen' });
    // props.navigation.push('AuthStack', { screen: 'otpScreen' });
  }, 2000);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MyStatusBar />
      <Image source={require('@assets/images/salonIcon.png')} />
      <Text style={Fonts.Primary40Bold}>Beauty</Text>
    </View>
  );
};

export default SplashScreen;
