import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Default, Colors } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import { useTranslation } from 'react-i18next';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import NewServiceDropdown from '../NewServiceDropdown';
const NewServiceRow = ({ item, handleTextChange }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const price = item.price;
  const additional = item.additional ? item.additional.toString() : '';
  const total = item.total ? item.total : price;
  const editable = false;
  const notes = `Status: PENDING`;
  return (
    <>
      <View
        style={[
          Style.mainContainer,
          {
            flexDirection: 'row',
            marginHorizontal: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
          },
        ]}
      >
        <View style={[{ flex: 4 }]}>
          <NewServiceDropdown />
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={{ fontSize: 14 }}>{formatPrice(price * 100)}</Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <NumericInput
            type='decimal'
            decimalPlaces={2}
            value={additional}
            onUpdate={(value) => handleTextChange(value, item, 'additional')}
            style={[Style.inputStyle, { width: '80%', height: 25, marginVertical: 0, padding: 4 }]}
            selectionColor={Colors.primary}
            editable={editable}
          />
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={{ fontSize: 14 }}>{formatPrice(total * 100)}</Text>
        </View>
      </View>
      <View
        style={[
          Style.mainContainer,
          {
            flexDirection: 'row',
            marginHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding,
            opacity: 1,
          },
        ]}
      >
        <View style={[{ flex: 3, paddingLeft: 10, flexDirection: 'row' }]}></View>
        <View style={[{ flex: 4, flexDirection: 'row' }]}>
          <Text style={{ fontSize: 14, marginTop: 5, marginRight: 5 }}>{tr('notes')}: </Text>
          <TextInput
            multiline={true}
            numberOfLines={5}
            selectionColor={Colors.primary}
            style={[Style.inputStyle, { width: '90%', height: 50 }]}
            placeholder={notes}
            onEndEditing={(text) => handleTextChange(text, item, 'notes')}
            editable={editable}
            //value={notes}
          />
        </View>
      </View>
      <View
        style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
      />
    </>
  );
};

export default NewServiceRow;

const styles = StyleSheet.create({});
