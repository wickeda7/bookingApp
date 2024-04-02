import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import CheckBox from '@react-native-community/checkbox';
const StoreServiceItem = ({ item, catId }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(item?.enable ? true : false);
  const handleCheckBox = () => {};
  return (
    <>
      <View style={[Style.mainContainer, { flexDirection: 'row', marginVertical: 5 }]}>
        <View style={{ flex: 3 }}>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'name')}
            selectionColor={Colors.primary}
            value={item.name}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'name')}
            selectionColor={Colors.primary}
            value={item.price.toString()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'name')}
            selectionColor={Colors.primary}
            value={item.priceOption}
          />
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
          <Text style={Fonts.Black14Medium}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={5}
            selectionColor={Colors.primary}
            style={[Style.inputStyle, { width: '90%', height: 50 }]}
            placeholder={'Description'}
            onEndEditing={(text) => handleTextChange(text, item, 'notes')}
            value={item.description}
          />
        </View>
      </View>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding }]} />
    </>
  );
};

export default StoreServiceItem;

const styles = StyleSheet.create({});
