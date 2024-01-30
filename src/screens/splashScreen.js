import { Text, Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { Fonts } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
import { use } from 'i18next';

const SplashScreen = (props) => {
  const { loading, loggedIn } = useAuthContext();
  useEffect(() => {
    if (!loading && loggedIn) {
      props.navigation.navigate('BottomTab');
    }
    if (!loading && !loggedIn) {
      setTimeout(() => {
        props.navigation.push('AuthStack', { screen: 'onboardingScreen' });
        // props.navigation.push('AuthStack', { screen: 'otpScreen' });
      }, 2000);
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
