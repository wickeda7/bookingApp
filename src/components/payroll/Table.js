import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts, graphColors } from '@constants/style';
import Style from '@theme/style';
import moment from 'moment';
import { formatPrice } from '@utils/helper';

const Table = ({ data, detail }) => {
  return (
    <View style={{ flexDirection: 'column', width: '100%' }}>
      <View style={[styles.header, { flexDirection: 'row', marginBottom: 10 }]}>
        <Text style={[Fonts.White14Bold, { flex: 2, marginLeft: 10 }]}>Date</Text>
        <Text style={[Fonts.White14Bold, { flex: 1 }]}>Tips</Text>
        <Text style={[Fonts.White14Bold, { flex: 1 }]}>Total</Text>
      </View>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            if (detail) detail(item);
          }}
        >
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={[{ flex: 2, marginLeft: 5 }]}>{moment(item.date).format('ddd M-DD-YYYY')}</Text>
            <Text style={[{ flex: 1 }]}>{formatPrice(item.tips)}</Text>
            <Text style={[{ flex: 1 }]}>{formatPrice(item.subtotal)}</Text>
          </View>
          <View style={[Style.divider, { marginVertical: Default.fixPadding }]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Default.fixPadding * 0.5,
    backgroundColor: '#6464ff',
  },
});
