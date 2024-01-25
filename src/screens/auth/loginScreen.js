import { View, Text, ScrollView, Image, TouchableOpacity, BackHandler, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useTranslation } from 'react-i18next';
import Loader from '@components/loader';
import MyStatusBar from '@components/myStatusBar';
import Toast from 'react-native-root-toast';
import { useAuthContext } from '@contexts/AuthContext';
import { use } from 'i18next';
import PhoneAuth from './phoneAuth';
const LoginScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == 'rtl';

  const { loading, facebookLogin, promptAsync, logout, userData, loggedIn } = useAuthContext();

  function tr(key) {
    return t(`loginScreen:${key}`);
  }
  const toastHandler = () => {
    Toast.show(tr('tapBack'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: Colors.black,
      textColor: Colors.white,
    });
  };
  useEffect(() => {
    //console.log('loading', loading);
  }, []);

  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);
      toastHandler();
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => BackHandler.removeEventListener('hardwareBackPress', backHandler.remove());
  });

  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('@assets/images/salonIcon.png')}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: Default.fixPadding,
          }}
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
          {tr('login')}
        </Text>
        <PhoneAuth />

        <Loader visible={visible} />

        <Text
          style={{
            ...Fonts.Grey16Medium,
            textAlign: 'center',
            marginVertical: Default.fixPadding,
          }}
        >
          {tr('or')}
        </Text>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              margin: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.blue,
              ...Default.shadow,
            }}
            onPress={() => facebookLogin()}
          >
            <FontAwesome
              name='facebook-f'
              size={20}
              color={Colors.white}
              style={{ marginHorizontal: Default.fixPadding }}
            />
            <Text style={Fonts.White18Bold}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              margin: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.red,
              ...Default.shadow,
            }}
            onPress={() => promptAsync()}
          >
            <Ionicons
              name='logo-google'
              size={20}
              color={Colors.white}
              style={{ marginHorizontal: Default.fixPadding }}
            />
            <Text style={Fonts.White18Bold}>Google</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              margin: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.red,
              ...Default.shadow,
            }}
            onPress={() => {
              console.log('userData', userData);
              console.log('loggedIn', loggedIn);
            }}
          >
            <Text style={Fonts.White18Bold}>GET DATA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              margin: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.red,
              ...Default.shadow,
            }}
            onPress={() => logout()}
          >
            <Text style={Fonts.White18Bold}>LOUGOUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
