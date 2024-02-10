import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import Items from '@components/items';
import SubService from '@components/subService';
import { use } from 'i18next';
const ServiceScreen = (props) => {
  const { t, i18n } = useTranslation();

  const service = props.route.params.service;
  let screen = props.route.params?.screen ? props.route.params?.screen : '';
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`serviceScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const handleAppointment = () => {
    if (screen !== '') {
      props.navigation.navigate('StoresStack', {
        screen: 'bookAppointmentScreen',
      });
    } else {
      props.navigation.navigate('bookAppointmentScreen');
    }
  };
  return (
    <View style={{ flex: 1, height: 500 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Items items={service.items} />
        <SubService subservices={service.sub_services} />
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleAppointment()}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: Default.fixPadding * 1.5,
          backgroundColor: Colors.primary,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('bookAppointment')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceScreen;
