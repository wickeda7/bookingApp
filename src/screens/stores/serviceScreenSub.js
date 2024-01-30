import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import Items from '@components/items';
const ServiceScreenSub = (props) => {
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
  console.log('service.sub', service.sub_services);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Items items={service.items} /> */}
        {/* <Text>sfsdfsdf</Text>
        {service.items && <Items items={service.items} />}
        {service.sub_services && <Text>sub_services</Text>} */}
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

export default ServiceScreenSub;
