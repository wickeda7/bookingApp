import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { formatPrice } from '@utils/helper';
import AccordionBody from './AccordionBody';
import PayrollAccordionBody from '../admin/PayrollAccordionBody';

const AccordionStaffItem = ({ children, item, expanded, onHeaderPress, navigation }) => {
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  return (
    <View style={[styles.section]}>
      <TouchableOpacity style={[styles.accordHeader]} onPress={onHeaderPress}>
        <View style={[{ flex: 4 }]}>
          <Text style={[Fonts.Primary14Medium]}>{moment(item.title).format('dddd MMM Do')}</Text>
        </View>
        <View style={[{ flex: 5 }]}>
          <Text style={{ color: Colors.primary, fontSize: 12 }}>
            Tips: {formatPrice(item.tips)}
            {'       '}Total: {formatPrice(item.total)}
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={Colors.primary} />
        </View>
      </TouchableOpacity>
      {expanded && (
        <>
          {navigation ? (
            <AccordionBody data={item.data} navigation={navigation} />
          ) : (
            <PayrollAccordionBody item={item} />
          )}
        </>
      )}
    </View>
  );
};

export default AccordionStaffItem;

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.lightPrimary,
  },

  accordHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  accordTitle: {
    fontSize: 12,
  },
});
