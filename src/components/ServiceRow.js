import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import { useTranslation } from 'react-i18next';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { DraxView, DraxViewDragStatus, DraxSnapbackTargetPreset } from 'react-native-drax';
import NumericInput from '@wwdrew/react-native-numeric-textinput';

const ServiceRow = ({ item, setService, setStaff, handleTextChange }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const specialist = item.specialist;
  const color = specialist ? specialist.userInfo.displayColor : '#000';
  const firstName = specialist ? specialist.userInfo.firstName : '';
  const lastName = specialist ? specialist.userInfo.lastName : '';
  const id = specialist ? specialist.id : '';
  const price = item.price;
  const additional = item.additional ? item.additional.toString() : '';
  const total = item.total ? item.total : price;
  const editable = item.status === 'pending' ? false : true;
  const notes = item.notes ? item.notes : `Status: ${tr(item.status)}`;
  return (
    <DraxView
      receiverPayload={item}
      onReceiveDragDrop={(event) => {
        const userId = event.dragged.payload.id;
        const receivedId = event.receiver.payload.specialist?.id ? event.receiver.payload.specialist.id : undefined;
        console.log('event', event);
        if (receivedId === undefined || userId === receivedId) {
          setService(event.receiver.payload, 'service', event.dragged.payload);
          setStaff(event.dragged.payload);
        }
        DraxViewDragStatus.Inactive;
        return DraxSnapbackTargetPreset.None;
      }}
    >
      <View style={[Style.mainContainer, { flexDirection: 'row', marginHorizontal: Default.fixPadding * 1.5 }]}>
        <View style={[{ flex: 2, paddingLeft: 10, flexDirection: 'row' }]}>
          <AntIcon size={15} name='menu-unfold' color={color} />
          <Text style={[{ marginHorizontal: Default.fixPadding, color: color, fontSize: 14 }]}>
            {firstName} {lastName} {id}
          </Text>
        </View>
        <View style={[{ flex: 4 }]}>
          <Text style={{ fontSize: 14 }}>{item.name}</Text>
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
          { flexDirection: 'row', marginHorizontal: Default.fixPadding * 1.5, marginTop: Default.fixPadding },
        ]}
      >
        <View style={[{ flex: 1, paddingLeft: 10 }]}>
          {specialist && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setService(item, 'remove');
                setStaff(item);
              }}
              style={[
                Style.buttonStyle,
                {
                  backgroundColor: Colors.red,
                  marginTop: 0,
                  flexDirection: 'row',
                  width: 100,
                },
              ]}
            >
              <AntIcon size={18} name='deleteuser' color={Colors.white} />
              <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>
                {tr('removestaff')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[{ flex: 2, flexDirection: 'row' }]}>
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
    </DraxView>
  );
};

export default ServiceRow;

const styles = StyleSheet.create({});
