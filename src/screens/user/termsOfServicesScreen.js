import { Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const TermsOfServicesScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`termsOfServicesScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

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
          style={{ marginHorizontal: Default.fixPadding }}
          onPress={() => props.navigation.navigate('profileScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('termsOfService')}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: Default.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.Black16Bold, marginBottom: 5 }}>{tr('terms')}</Text>
          <Text style={Fonts.Grey14Regular}>{tr('mainDescription')}</Text>
          <Text style={{ ...Fonts.Grey14Regular, marginTop: 5 }}>{tr('subDecription')}</Text>
        </View>

        <View style={{ paddingHorizontal: Default.fixPadding * 1.5 }}>
          <Text
            style={{
              ...Fonts.Black16Bold,
              marginBottom: Default.fixPadding * 0.5,
            }}
          >
            {tr('privacy')}
          </Text>
          <Text style={Fonts.Grey14Regular}>{tr('subDecription')}</Text>
          <Text
            style={{
              ...Fonts.Grey14Regular,
              marginVertical: Default.fixPadding * 0.5,
            }}
          >
            {tr('mainDescription')}
          </Text>

          <Text style={{ ...Fonts.Grey14Regular, marginBottom: Default.fixPadding }}>{tr('subDecription')}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsOfServicesScreen;
