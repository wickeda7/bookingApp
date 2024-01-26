import { StyleSheet, Text, View } from 'react-native';
import { Default, Fonts, Colors } from '@constants/style';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import Toast from 'react-native-root-toast';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithPhoneNumber } from 'firebase/auth';
import appFirebase from '@utils/firebaseConfig';
import Phone from './phone';
import Verify from './verify';
//https://docs.expo.dev/versions/v46.0.0/sdk/firebase-recaptcha/

const PhoneAuth = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == 'rtl';
  function tr(key) {
    return t(`loginScreen:${key}`);
  }
  const { loading, setLoading, setUserData, auth } = useAuthContext();
  const [phoneNumber, setPhoneNumber] = useState('6266754894');
  const recaptchaVerifier = useRef(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const countryCode = '+1';

  const [message, showMessage] = useState();
  const attemptInvisibleVerification = false;
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    if (code.length !== 6) return;
    console.log('handleVerify', confirmationResult);
    if (confirmationResult) {
      try {
        const userCredential = await confirmationResult.confirm(code);
        console.log('handleVerify userCredential', userCredential);
        setLoading(true);
      } catch (error) {
        setVerificationWrong(true);
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
        backgroundColor: Colors.black,
        textColor: Colors.white,
      });
      return;
    }

    // props.navigation.navigate('otpScreen');
    try {
      console.log('phoneLogin', countryCode + phoneNumber);
      const result = await signInWithPhoneNumber(auth, countryCode + phoneNumber, recaptchaVerifier.current);
      setConfirmationResult(result);
      setIsVerifying(true);
      console.log('verificationId', result);
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

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={appFirebase.options}
        attemptInvisibleVerification={true}
      />
    </View>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({});
