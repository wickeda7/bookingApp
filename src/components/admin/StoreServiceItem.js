import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import { useTranslation } from 'react-i18next';
const StoreServiceItem = ({ item, catId }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }
  console.log('StoreServiceItem item', item);
  const [toggleCheckBox, setToggleCheckBox] = useState(item?.enable ? true : false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(item);
  }, [item]);

  const handleCheckBox = (value) => {
    setToggleCheckBox(value);
    setData({ ...data, enable: value });
  };
  const handleOnchange = (value, field) => {
    setData({ ...data, [field]: value });
  };

  const handleRemove = () => {
    console.log('remove', item);
  };
  return (
    <>
      <View style={[Style.mainContainer, { flexDirection: 'row', marginVertical: 5 }]}>
        <View style={{ flex: 4 }}>
          <TextInput
            style={[Style.inputStyle, { height: 25, padding: 4 }]}
            onChangeText={(text) => handleOnchange(text, 'name')}
            selectionColor={Colors.primary}
            value={data?.name}
          />
        </View>
        <View style={{ flex: 1 }}>
          <NumericInput
            type='decimal'
            decimalPlaces={2}
            value={data?.price}
            onUpdate={(value) => handleOnchange(value, 'price')}
            style={[Style.inputStyle, { height: 25, padding: 4 }]}
            selectionColor={Colors.primary}
          />
          {/* <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'name')}
            selectionColor={Colors.primary}
            value={data.price.toString()}
          /> */}
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            style={[
              Style.buttonStyle,
              Style.borderRed,
              {
                paddingVertical: 0,
                marginTop: 3,
                flexDirection: 'row',
                width: 22,
                height: 22,
                marginHorizontal: 5,
                borderRadius: 5,
              },
            ]}
            onPress={handleRemove}
          >
            <Icon name={'remove'} size={14} color={Colors.red} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.5 }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={handleCheckBox}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>
      </View>
      <View style={[Style.mainContainer, { flexDirection: 'row', marginVertical: 5 }]}>
        <View
          style={[
            {
              flex: 5,
              flexDirection: 'column',
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[{ marginLeft: 0, marginRight: 10 }]} onPress={() => setOpen(!open)}>
              <Ionicons
                name={open ? 'chevron-down-circle-outline' : 'chevron-up-circle-outline'}
                size={20}
                color={Colors.grey}
              />
            </TouchableOpacity>
            <Text style={Fonts.Black14Medium}>Description</Text>
          </View>
          {open && (
            <TextInput
              multiline={true}
              numberOfLines={5}
              selectionColor={Colors.primary}
              style={[Style.inputStyle, { width: '90%', height: 50 }]}
              placeholder={'Description'}
              onEndEditing={(text) => handleTextChange(text, 'description')}
              value={data?.description}
            />
          )}
        </View>
        <View
          style={[
            {
              flex: 2,
              flexDirection: 'column',
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={Fonts.Black14Medium}>{tr('option')}</Text>
          </View>
          {open && (
            <TextInput
              style={[Style.inputStyle, { height: 25, padding: 4 }]}
              onChangeText={(text) => handleOnchange(text, 'priceOption')}
              selectionColor={Colors.primary}
              value={data?.priceOption}
            />
          )}
        </View>
      </View>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding }]} />
    </>
  );
};

export default StoreServiceItem;

const styles = StyleSheet.create({});
