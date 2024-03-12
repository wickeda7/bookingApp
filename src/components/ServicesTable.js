import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Style from '@theme/style';
import { Default } from '@constants/style';
import ServiceRow from './ServiceRow';
import { useTranslation } from 'react-i18next';
import { setStaffService } from '@redux/slices/adminHomeSlice';
import { useDispatch } from 'react-redux';
const ServicesTable = ({ booking }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { services, specialist } = booking;
  //const services = booking.services;
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const dispatch = useDispatch();
  const setService = (staff) => {
    // console.log('ServiceRow -> setService staff', staff);
    dispatch(setStaffService({ staff, booking }));
  };
  return (
    <>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding }]} />
      <View style={[Style.contentContainer, { flexDirection: 'column' }]}>
        <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
          <Text style={[Style.tableHeaderText15Medium, { flex: 2, marginLeft: 0 }]}>{tr('staff')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 4, marginLeft: 0 }]}>{tr('servicename')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>{tr('price')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}> {tr('additional')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>{tr('total')}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {services.map((service, index) => (
          <ServiceRow key={index} item={service} setService={setService} specialist={specialist} />
        ))}
      </ScrollView>
    </>
  );
};

export default ServicesTable;

const styles = StyleSheet.create({});
