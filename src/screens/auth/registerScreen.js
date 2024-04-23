import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import Loader from '@components/loader';
import MyStatusBar from '@components/myStatusBar';

const RegisterScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`registerScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [textUser, onChangeTextUser] = useState();
  const [textEmail, onChangeTextEmail] = useState();
  const [textNo, onChangeTextNo] = useState();

  const [visible, setVisible] = useState(false);

  const handleRegister = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate('otpScreen');
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
        onPress={() => props.navigation.navigate('loginScreen')}
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
          {tr('register')}
        </Text>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            textAlign: 'center',
            marginBottom: Default.fixPadding,
          }}
        >
          {tr('welcomePlease')}
        </Text>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            padding: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Ionicons name='person-outline' color={Colors.grey} size={20} style={{ flex: 1 }} />
          <TextInput
            placeholder={tr('name')}
            placeholderTextColor={Fonts.Grey14Medium}
            onChangeText={onChangeTextUser}
            selectionColor={Colors.primary}
            value={textUser}
            style={{
              ...Fonts.Black15Medium,
              flex: 9,
              textAlign: isRtl ? 'right' : 'left',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            padding: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Feather name='smartphone' color={Colors.grey} size={20} style={{ flex: 1 }} />
          <TextInput
            value={textNo}
            maxLength={10}
            placeholder={tr('mobile')}
            placeholderTextColor={Fonts.Grey14Medium}
            onChangeText={onChangeTextNo}
            selectionColor={Colors.primary}
            keyboardType={'number-pad'}
            style={{
              ...Fonts.Black15Medium,
              flex: 9,
              textAlign: isRtl ? 'right' : 'left',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Ionicons name='mail-outline' color={Colors.grey} size={20} style={{ flex: 1 }} />
          <TextInput
            value={textEmail}
            placeholder={tr('email')}
            placeholderTextColor={Fonts.Grey14Medium}
            onChangeText={onChangeTextEmail}
            selectionColor={Colors.primary}
            keyboardType='email-address'
            style={{
              ...Fonts.Black15Medium,
              flex: 9,
              textAlign: isRtl ? 'right' : 'left',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
        </View>
        <Loader visible={visible} />
        <TouchableOpacity
          onPress={handleRegister}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 2,
            paddingVertical: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.primary,
            ...Default.shadow,
          }}
        >
          <Text style={Fonts.White18Bold}>{tr('register')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
