import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Default } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import { useTranslation } from 'react-i18next';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { DraxView, DraxViewDragStatus, DraxSnapbackTargetPreset } from 'react-native-drax';

const ServiceRow = ({ item, setService, specialist }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  console.log('ServiceRow -> specialist', specialist);
  const color = specialist ? specialist.userInfo.displayColor : '#000';
  console.log('ServiceRow -> color', color);
  return (
    <>
      {specialist ? (
        <>
          <View style={[Style.mainContainer, { flexDirection: 'row', marginHorizontal: Default.fixPadding * 1.5 }]}>
            <View style={[{ flex: 2, paddingLeft: 10, flexDirection: 'row' }]}>
              <AntIcon size={15} name='menu-unfold' color={specialist.userInfo.displayColor} />
              <Text
                style={[
                  { marginHorizontal: Default.fixPadding, color: specialist.userInfo.displayColor, fontSize: 14 },
                ]}
              >
                {specialist.userInfo.firstName} {specialist.userInfo.lastName}
              </Text>
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
            <View style={[{ flex: 1, paddingLeft: 10 }]}>
              <Text>button here</Text>
            </View>
            <View style={[{ flex: 2, flexDirection: 'row' }]}>
              <Text style={{ fontSize: 14, marginTop: 5, marginRight: 5 }}>{tr('notes')}: </Text>
              <TextInput multiline={true} numberOfLines={5} style={[Style.inputStyle, { width: '90%', height: 50 }]} />
            </View>
          </View>
          <View
            style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
          />
        </>
      ) : (
        <DraxView
          receiverPayload={item}
          onReceiveDragDrop={(event) => {
            // console.log('ServiceRow -> onReceiveDragDrop', event.dragged.payload, event);
            setService(event.dragged.payload);
            DraxViewDragStatus.Inactive;
            return DraxSnapbackTargetPreset.None;
          }}
        >
          <View style={[Style.mainContainer, { flexDirection: 'row', marginHorizontal: Default.fixPadding * 1.5 }]}>
            <View style={[{ flex: 2, paddingLeft: 10 }]}>
              <Text style={{ fontSize: 14 }}>
                {' '}
                <AntIcon size={15} name='menu-unfold' color={color} />
              </Text>
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
        </DraxView>
      )}
    </>
  );
};

export default ServiceRow;

const styles = StyleSheet.create({});
