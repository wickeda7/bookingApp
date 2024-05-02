import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Style from '@theme/style';
import { Default, Fonts, Colors } from '@constants/style';
import { formatPrice } from '@utils/helper';
import TotalView from '../TotalView';
const BatchesServiceTable = ({ services, subtotal, total, tips, additional }) => {
  return (
    <View style={[Style.contentContainer, { flexDirection: 'column' }]}>
      <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
        <Text style={[Style.tableHeaderText15Medium, { flex: 4, marginLeft: 0 }]}>Service Name</Text>
        <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>Price</Text>
        <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>Additional</Text>
        <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>Total</Text>
      </View>
      {services.map((service, index) => (
        <View style={[Style.tableRow, { flexDirection: 'row' }]} key={index}>
          <Text style={[{ flex: 4 }]}>{service.name}</Text>
          <Text style={[{ flex: 1, marginLeft: 0 }]}>{formatPrice(service.price * 100)}</Text>
          <Text style={[{ flex: 1, marginLeft: 0 }]}>{formatPrice(service.additional * 100)}</Text>
          <Text style={[{ flex: 1, marginLeft: 0 }]}>{formatPrice(service.total * 100)}</Text>
        </View>
      ))}
      <View
        style={[
          Style.divider,
          {
            marginHorizontal: Default.fixPadding,
            flexDirection: 'row',
            width: '100%',
            marginVertical: Default.fixPadding,
          },
        ]}
      />
      <View style={[{ flexDirection: 'row', flex: 1, width: '100%' }]}>
        <View style={[{ flex: 1 }]}></View>
        <View style={[{ flex: 1, flexDirection: 'column' }]}>
          <TotalView subtotal={subtotal} additional={additional} tips={tips} total={total} />
        </View>
      </View>
    </View>
  );
};

export default BatchesServiceTable;

const styles = StyleSheet.create({});
