import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Default, Fonts, Colors } from '@constants/style';
import Style from '@theme/style';
import React, { useEffect, useState } from 'react';
import { formatPrice } from '@utils/helper';
import { useTranslation } from 'react-i18next';
import AntIcon from 'react-native-vector-icons/AntDesign';
import NumericInput from '@wwdrew/react-native-numeric-textinput';

const ServiceRow = ({ item, handleTextChange }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const [open, setOpen] = useState(false);
  const additional = item.additional ? item.additional.toString() : '';
  const notes = item.notes ? item.notes : `notes`;
  const price = item.price;
  const total = item.total ? item.total : price;

  return (
    <>
      <View style={[Style.mainContainer, { flexDirection: 'row', marginHorizontal: Default.fixPadding }]}>
        <View style={[{ flex: 2 }]}>
          <Text style={Fonts.Grey14Medium}>{item.name}</Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={Fonts.Grey14Medium}>{formatPrice(price * 100)}</Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <NumericInput
            type='decimal'
            decimalPlaces={2}
            value={additional}
            onUpdate={(value) => handleTextChange(value, item.id, 'additional')}
            style={[Style.inputStyle, { width: '100%', height: 25, marginVertical: 0, padding: 4 }]}
            selectionColor={Colors.primary}
          />
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={[Fonts.Grey14Medium, { textAlign: 'right', marginRight: Default.fixPadding }]}>
            {formatPrice(total * 100)}
          </Text>
        </View>
      </View>
      <View
        style={[
          Style.mainContainer,
          { flexDirection: 'row', marginHorizontal: Default.fixPadding, marginTop: 5, marginBottom: 10 },
        ]}
      >
        <View style={[{ flex: 3, flexDirection: 'row' }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setOpen(!open);
            }}
            style={[{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }]}
          >
            <AntIcon size={18} name={open ? 'minuscircle' : 'pluscircle'} color={Colors.grey} />
            <Text style={[Fonts.Grey14Medium, { marginHorizontal: 10 }]}>{tr('notes')}:</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ flex: 7 }]}>
          {open ? (
            <TextInput
              multiline={true}
              numberOfLines={5}
              selectionColor={Colors.primary}
              style={[Style.inputStyle, { width: '95%', height: 30, marginLeft: 10, padding: 5 }]}
              placeholder={notes}
              //onEndEditing={(text) => handleTextChange(text, item, 'notes')}
              onChangeText={(value) => handleTextChange(value, item.id, 'notes')}
              //value={notes}
            />
          ) : (
            <Text style={[Fonts.Grey14Medium]}>{item.notes}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default ServiceRow;

const styles = StyleSheet.create({});
