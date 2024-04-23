import { StyleSheet, Text, View } from 'react-native';
import { Default, Fonts, Colors } from '@constants/style';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import Toast from 'react-native-root-toast';
import appFirebase from '@utils/firebaseConfig';
import Phone from './phone';
import Verify from './verify';
import { useFirebaseLogin } from '@itzsunny/firebase-login';

const PhoneAuth = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == 'rtl';
  function tr(key) {
    return t(`loginScreen:${key}`);
  }
  const { setLoading, auth } = useAuthContext();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const { recaptcha, sendOtp, verifyOtp } = useFirebaseLogin({
    auth: auth,
    firebaseConfig: appFirebase.options,
  });
  const countryCode = '+1';

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const handleVerify = async () => {
    if (code.length !== 6) return;
    if (confirmationResult) {
      try {
        const userCredential = await verifyOtp(confirmationResult, code);
        setLoading(true);
      } catch (error) {
        Toast.show(tr('enterValid'), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: Colors.red,
          textColor: Colors.white,
        });
      }
    }
  };

  const phoneLogin = async (props) => {
    if (phoneNumber.length !== 10) {
      Toast.show(tr('enterValid'), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      });
      return;
    }

    // props.navigation.navigate('otpScreen');
    try {
      const result = await sendOtp(countryCode + phoneNumber);
      setConfirmationResult(result);
      setIsVerifying(true);
    } catch (error) {
      console.log('phoneLogin', error);
    }
  };

  const handlePhone = (number) => {
    setPhoneNumber(number.unmaskedPhoneNumber);
  };

  return (
    <View>
      {isVerifying ? (
        <Verify phoneLogin={phoneLogin} phoneNumber={phoneNumber} setCode={setCode} handleVerify={handleVerify} />
      ) : (
        <Phone phoneLogin={phoneLogin} handlePhone={handlePhone} />
      )}
      {recaptcha}
    </View>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({});
