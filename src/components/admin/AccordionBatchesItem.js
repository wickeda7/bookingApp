import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Style from '@theme/style';
import Icon from 'react-native-vector-icons/FontAwesome';

import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import Micons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import BatchesServiceTable from './BatchesServiceTable';
import moment from 'moment';
import { formatPrice } from '@utils/helper';

const AccordionBatchesItem = ({ children, item, expanded, onHeaderPress }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`batchesScreen:${key}`);
  }
  const {
    id,
    attributes: { type, createdAt, total, additional, subtotal, tips, services, specialist },
  } = item;
  const {
    attributes: { userInfo },
  } = specialist.data;
  const {
    attributes: { firstName, lastName, displayColor },
  } = userInfo.data;
  const time = moment(createdAt).format('YYYY-MM-DD h:mm A');
  const borderColor = type === 'walkin' ? Colors.info : Colors.success;
  return (
    <View style={[styles.accordContainer, { borderColor: borderColor }]}>
      <TouchableOpacity style={[styles.accordHeader]} onPress={onHeaderPress}>
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <Text style={[styles.accordTitle, { color: borderColor }]}>
            {time} {'   '}Ticket #: {id}
          </Text>
          <Text style={[styles.accordTitle, { color: displayColor }]}>
            {'   '}
            by {firstName} {lastName}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.accordTitle, { color: borderColor }]}>
            Total: {formatPrice(total * 100)} {'   '}
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={borderColor} />
        </View>
      </TouchableOpacity>
      {expanded && (
        <BatchesServiceTable
          services={services}
          additional={additional}
          subtotal={subtotal}
          tips={tips}
          total={total}
        />
      )}
    </View>
  );
};

export default AccordionBatchesItem;

const styles = StyleSheet.create({
  accordContainer: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
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
