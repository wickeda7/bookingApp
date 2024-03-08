import { Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import Items from '@components/items';
import SubService from '@components/subService';
import { useSelector, useDispatch } from 'react-redux';
import { setBookingType } from '@redux/slices/bookingSlice';

const ServiceScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { services } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
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
  const handleAppointment = (type) => {
    if (services.length === 0) return;

    dispatch(setBookingType(type));
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
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => handleAppointment('walkIn')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: Default.fixPadding * 1.5,
              backgroundColor: Colors.lightPrimary,
            }}
          >
            <Text style={Fonts.Black18Bold}>{tr('walkIn')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => handleAppointment('appointment')}
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
      </View>
    </View>
  );
};

export default ServiceScreen;
