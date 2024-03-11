import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Default } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import { useTranslation } from 'react-i18next';
const ServiceRow = ({ item }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  //console.log('ServiceRow -> item', item);
  return (
    <>
      <View style={[Style.mainContainer, { flexDirection: 'row', marginHorizontal: Default.fixPadding * 1.5 }]}>
        <View style={[{ flex: 2, paddingLeft: 10 }]}>
          <Text style={{ fontSize: 14 }}></Text>
        </View>
        <View style={[{ flex: 4 }]}>
          <Text style={{ fontSize: 14 }}>{item.name}</Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={{ fontSize: 14 }}>{formatPrice(item.price * 100)}</Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <TextInput style={[Style.inputStyle, { width: '80%', height: 20, marginVertical: 0 }]} />
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={{ fontSize: 14 }}>$20.00</Text>
        </View>
      </View>
      <View
        style={[
          Style.mainContainer,
          { flexDirection: 'row', marginHorizontal: Default.fixPadding * 1.5, marginTop: Default.fixPadding },
        ]}
      >
        <View style={[{ flex: 1, paddingLeft: 10 }]}></View>
        <View style={[{ flex: 2, flexDirection: 'row' }]}>
          <Text style={{ fontSize: 14, marginTop: 5, marginRight: 5 }}>{tr('notes')}: </Text>
          <TextInput multiline={true} numberOfLines={5} style={[Style.inputStyle, { width: '90%', height: 50 }]} />
        </View>
      </View>
      <View
        style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
      />
    </>
  );
};

export default ServiceRow;

const styles = StyleSheet.create({});
