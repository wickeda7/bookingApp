import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Micons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Default } from '@constants/style';
import { useTranslation } from 'react-i18next';
import ServicesTable from './ServicesTable';
import moment from 'moment';
const AccordionItem = ({ children, item, expanded, onHeaderPress }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  let { timeslot, createdAt, callBack, client, specialist, services } = item;
  services = typeof services === 'string' ? JSON.parse(services) : services;
  const servArr = services.reduce((acc, ele) => {
    acc.push(ele.name);
    return acc;
  }, []);
  const borderColor = timeslot ? Colors.info : Colors.success;
  const type = timeslot ? 'appointment' : 'walkIn';
  const titleContent = (
    <>
      <Text style={[styles.accordTitle, { color: borderColor }]}>
        {tr(type)}
        {'  '} {moment(createdAt).format('h:mm A')} {'  '}
        {client?.userInfo?.firstName} {client?.userInfo?.lastName} {'  '}
        {specialist && `${tr('request')} ${specialist?.userInfo?.firstName} ${specialist?.userInfo?.firstName}`}
      </Text>
      <Text style={[styles.accordTitle, { color: borderColor, marginTop: Default.fixPadding * 0.5 }]}>
        {tr('services')}: {'  '}
        {servArr.join(', ').length < 90 ? `${servArr.join(', ')}` : `${servArr.join(', ').substring(0, 90)}...`}
      </Text>
    </>
  );

  return (
    <View style={[styles.accordContainer, { borderColor: borderColor }]}>
      <TouchableOpacity style={[styles.accordHeader]} onPress={onHeaderPress}>
        <View style={{ flex: 15 }}>{titleContent}</View>
        {callBack && (
          <View style={{ flex: 2 }}>
            <Micons name='textsms' size={30} color={borderColor} />
          </View>
        )}
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={borderColor} />
        </View>
      </TouchableOpacity>
      {expanded && <ServicesTable booking={item} />}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  accordContainer: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  accordBody: {
    padding: 10,
  },
  accordHeader: {
    padding: 10,

    flex: 1,
    flexDirection: 'row',
  },
  accordTitle: {
    fontSize: 14,
  },
});
