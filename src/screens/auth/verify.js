import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumber } from '@utils/helper';
import OTPTextView from 'react-native-otp-textinput';

const Verify = ({ phoneLogin, phoneNumber, setCode, handleVerify }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == 'rtl';
  function tr(key) {
    return t(`otpScreen:${key}`);
  }

  return (
    <View>
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
        {tr('confirmation')} {formatPhoneNumber(phoneNumber)}
      </Text>
      <OTPTextView
        tintColor={Colors.primary}
        inputCount={6}
        keyboardType='numeric'
        containerStyle={{
          marginVertical: Default.fixPadding * 2,
          //   marginHorizontal: Default.fixPadding * 4,
        }}
        textInputStyle={{
          ...Fonts.Black18Bold,
          width: 50,
          height: 50,
          borderBottomWidth: null,
          marginHorizontal: Default.fixPadding,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
        handleTextChange={(text) => setCode(text)}
      />
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
      <TouchableOpacity onPress={phoneLogin}>
        <Text style={{ ...Fonts.Primary16Medium, textAlign: 'center' }}>{tr('resend')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
