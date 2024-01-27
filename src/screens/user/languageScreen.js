import { Text, View, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '@components/loader';
import MyStatusBar from '@components/myStatusBar';

const LanguageScreen = (props) => {
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.resolvedLanguage);
  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`languageScreen:${key}`);
  }
  const [visible, setVisible] = useState(false);
  const handleLanguage = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate('profileScreen');
    }, 1500);
  };

  async function onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@APP:languageCode', lang);
    } catch (error) {
      alert('something went wrong');
    }
  }

  function languageOpt({ name, lang }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onChangeLang(lang);
          setSelectedLanguage(lang);
          handleLanguage();
        }}
        style={{
          flexDirection: 'row',
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <MaterialCommunityIcons
          name={selectedLanguage === lang ? 'circle-slice-8' : 'circle-outline'}
          size={24}
          color={selectedLanguage === lang ? Colors.primary : Colors.grey}
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
        />
        <Text style={{ ...Fonts.Black16Regular }}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.navigate('profileScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('languages')}</Text>
      </View>
      <Loader visible={visible} />
      <View
        style={{
          paddingHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.5,
        }}
      >
        {languageOpt({ name: 'English', lang: 'en' })}
        {languageOpt({ name: 'हिन्दी', lang: 'hi' })}
        {languageOpt({ name: 'bahasa Indonesia', lang: 'id' })}
        {languageOpt({ name: '中国人', lang: 'ch' })}
        {languageOpt({ name: 'عربي', lang: 'ar' })}
      </View>
    </View>
  );
};

export default LanguageScreen;
