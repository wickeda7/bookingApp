import { View, Text, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPTextView from 'react-native-otp-textinput';
import Loader from '@components/loader';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const OtpScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`otpScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [visible, setVisible] = useState(false);

  const handleVerify = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate('bottomTab');
    }, 1500);
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <TouchableOpacity
        style={{
          alignItems: isRtl ? 'flex-end' : 'flex-start',
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding,
        }}
        onPress={() => props.navigation.navigate('registerScreen')}
      >
        <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('@assets/images/salonIcon.png')}
          style={{ justifyContent: 'center', alignSelf: 'center' }}
        />
        <Text
          style={{
            ...Fonts.Primary40Bold,
            textAlign: 'center',
            marginBottom: Default.fixPadding * 2,
          }}
        >
          Beauty
        </Text>
        <Text
          style={{
            ...Fonts.Black28Bold,
            textAlign: 'center',
            marginBottom: Default.fixPadding,
          }}
        >
          {tr('verification')}
        </Text>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            textAlign: 'center',
            alignSelf: 'center',
            maxWidth: '75%',
          }}
        >
          {tr('confirmation')} {'+958551512***'}
        </Text>

        <OTPTextView
          tintColor={Colors.primary}
          inputCount={4}
          keyboardType='numeric'
          containerStyle={{
            marginVertical: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 4,
          }}
          textInputStyle={{
            ...Fonts.Black18Bold,
            width: 60,
            height: 60,
            borderBottomWidth: null,
            marginHorizontal: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        />

        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            width: 70,
            padding: Default.fixPadding * 0.5,
            borderRadius: 5,
            backgroundColor: Colors.lightYellow,
          }}
        >
          <Text style={Fonts.Black14Medium}>00.48</Text>
        </View>

        <Loader visible={visible} />

        <TouchableOpacity
          onPress={handleVerify}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            paddingVertical: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.primary,
            ...Default.shadow,
          }}
        >
          <Text style={Fonts.White18Bold}>{tr('verifyNow')}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ ...Fonts.Primary16Medium, textAlign: 'center' }}>{tr('resend')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default OtpScreen;
