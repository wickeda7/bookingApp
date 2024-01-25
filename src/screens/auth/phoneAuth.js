import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Default, Fonts, Colors } from '@constants/style';
import React, { useRef, useState } from 'react';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import Toast from 'react-native-root-toast';
//import { signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier, getAuth } from 'firebase/auth';
//import auth from '@react-native-firebase/auth';

///https://firebase.google.com/docs/auth/web/phone-auth#web-modular-api_3 language for captcha
//https://docs.expo.dev/versions/v46.0.0/sdk/firebase-recaptcha/
//https://github.com/expo/fyi/blob/main/firebase-migration-guide.md

const PhoneAuth = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == 'rtl';
  function tr(key) {
    return t(`loginScreen:${key}`);
  }
  const { loading, setLoading, setUserData } = useAuthContext();
  const [phoneNumber, setPhoneNumber] = useState('6266754894');
  const recaptchaVerifier = useRef(null);
  const countryCode = '+1';

  const phoneLogin = async (props) => {
    // if (phoneNumber.length !== 10) {
    //   Toast.show(tr('enterValid'), {
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.BOTTOM,
    //     shadow: true,
    //     animation: true,
    //     hideOnPress: true,
    //     delay: 0,
    //     backgroundColor: Colors.black,
    //     textColor: Colors.white,
    //   });
    //   return;
    // }
    // console.log('phoneLogin', countryCode + phoneNumber);
    // const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
    // console.log('confirmation', confirmation);
    // setConfirm(confirmation);
    //console.log('phoneLogin', props);
    // props.navigation.navigate('otpScreen');
    try {
      console.log('phoneLogin', countryCode + phoneNumber);
      //   const phoneProvider = auth.PhoneAuthProvider();

      //   // Create an instance of RecaptchaVerifier
      //   recaptchaVerifier.current = auth.RecaptchaVerifier('recaptcha-container', {
      //     size: 'invisible',
      //   });

      //   const verificationId = await phoneProvider.verifyPhoneNumber(
      //     countryCode + phoneNumber,
      //     recaptchaVerifier.current
      //   );
      //   recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      //     size: 'invisible',
      //   });
      //   console.log('recaptchaVerifier', recaptchaVerifier.current);
      //   const verificationId = await signInWithPhoneNumber(auth, countryCode + phoneNumber, recaptchaVerifier.current);
      //   //const verificationId = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
      //   console.log('verificationId', verificationId);
      const phoneProvider = new auth.PhoneAuthProvider();

      // Create an instance of RecaptchaVerifier
      recaptchaVerifier.current = new auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      });
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
      console.log('verificationId', verificationId);
    } catch (error) {
      console.log('phoneLogin', error);
    }
  };

  const handleLogin = () => {
    console.log('handleLogin', countryCode + phoneNumber, auth);
    // if (phoneNumber.length !== 10) {
    //   Toast.show(tr('enterValid'), {
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.BOTTOM,
    //     shadow: true,
    //     animation: true,
    //     hideOnPress: true,
    //     delay: 0,
    //     backgroundColor: Colors.black,
    //     textColor: Colors.white,
    //   });
    //   return;
    // }
    //props.navigation.navigate('otpScreen');
    phoneLogin();

    // setVisible(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   props.navigation.navigate('registerScreen');
    // }, 1500);
  };
  const handlePhone = (number) => {
    console.log(number);
    setPhoneNumber(number.unmaskedPhoneNumber);
  };

  return (
    <View>
      <Text
        style={{
          ...Fonts.Grey16Medium,
          textAlign: 'center',
          marginBottom: Default.fixPadding,
        }}
      >
        {tr('pleaseEnter')}
      </Text>
      <IntlPhoneInput
        placeholder={tr('mobile')}
        defaultCountry='US'
        disableCountryChange={true}
        containerStyle={{
          ...Fonts.Black15Medium,
          alignItems: 'center',
          marginHorizontal: Default.fixPadding * 2,
          marginVertical: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
        phoneInputStyle={{
          textAlign: isRtl ? 'right' : 'left',
          paddingHorizontal: Default.fixPadding * 0.5,
          borderLeftWidth: 2,
          borderLeftColor: Colors.lightGrey,
        }}
        onChangeText={(text) => handlePhone(text)}
      />
      <Text
        style={{
          ...Fonts.Primary15Medium,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding,
        }}
      >
        {tr('verification')}
      </Text>
      <TouchableOpacity
        onPress={phoneLogin}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding,
          borderRadius: 10,
          backgroundColor: Colors.primary,
          ...Default.shadow,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('login')}</Text>
      </TouchableOpacity>
      <View id='recaptcha-container' ref={recaptchaVerifier} />
    </View>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({});
