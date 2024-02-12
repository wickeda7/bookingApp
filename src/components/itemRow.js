import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { formatPrice } from '@utils/helper';
import { useTranslation } from 'react-i18next';
import { Fonts, Default } from '@constants/style';
const ItemRow = ({ item }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`ongoingDetail:${key}`);
  }
  return (
    <View
      key={item.id}
      style={{
        flexDirection: isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Default.fixPadding * 1.5,
        marginVertical: Default.fixPadding,
      }}
    >
      <Text style={Fonts.Grey16Medium}>{item.name}</Text>
      <Text style={Fonts.Grey14Bold}>{formatPrice(item.price * 100)} </Text>
    </View>
  );
};

export default ItemRow;

const styles = StyleSheet.create({});
