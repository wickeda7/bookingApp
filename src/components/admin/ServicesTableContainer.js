import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';
import ServicesTable from './ServicesTable';
import { useTranslation } from 'react-i18next';
import { Colors } from '@constants/style';
import { resetMessage } from '@redux/slices/adminHomeSlice';
const ServicesTableContainer = ({ services, canceled }) => {
  const { message } = useSelector((state) => state.adminHome);
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const dispatch = useDispatch();
  const uniqueServices = {};
  services.reduce((acc, service) => {
    const specialist = service.specialistID ? service.specialistID : 0;
    let group = acc[specialist] || [];
    group.push(service);
    acc[specialist] = group;
    return acc;
  }, uniqueServices);
  if (message !== '') {
    Toast.show(tr('invoiceCompleted'), {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: Colors.success,
      onHidden: () => {
        dispatch(resetMessage());
      },
    });
  }
  return (
    <View>
      {Object.keys(uniqueServices).map((oneKey, i) => {
        return <ServicesTable key={i} services={uniqueServices[oneKey]} canceled={canceled} />;
      })}
    </View>
  );
};

export default ServicesTableContainer;

const styles = StyleSheet.create({});
