import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useTranslation } from 'react-i18next';

const Phone = ({ phoneLogin, handlePhone }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == 'rtl';
  function tr(key) {
    return t(`loginScreen:${key}`);
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
        {tr('login')}
      </Text>
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
    </View>
  );
};

export default Phone;

const styles = StyleSheet.create({});
