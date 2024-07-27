import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Style from '@theme/style';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import { formatPrice } from '@utils/helper';

const AddStaffService = ({ addedItem, handlePriceChange }) => {
  return (
    <View
      style={[
        Style.mainContainer,
        {
          flexDirection: 'row',
          marginHorizontal: Default.fixPadding * 1.5,
          marginTop: Default.fixPadding,
          backgroundColor: '#ffffad',
          paddingVertical: 8,
        },
      ]}
    >
      <View style={[{ flex: 2, paddingLeft: 10, flexDirection: 'row' }]}></View>
      <View style={[{ flex: 4 }]}>
        <Text style={{ fontSize: 14 }}>{addedItem.name}</Text>
      </View>
      <View style={[{ flex: 1 }]}>
        <NumericInput
          type='decimal'
          decimalPlaces={2}
          value={addedItem.price}
          onUpdate={(value) => handlePriceChange(value)}
          style={[Style.inputStyle, { width: '80%', height: 25, marginVertical: 0, padding: 4 }]}
          selectionColor={Colors.primary}
        />
      </View>
      <View style={[{ flex: 1 }]}></View>
      <View style={[{ flex: 1 }]}>
        <Text style={{ fontSize: 14 }}>{formatPrice(addedItem.total * 100)}</Text>
      </View>
    </View>
  );
};

export default AddStaffService;

const styles = StyleSheet.create({});
