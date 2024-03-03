import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import Style from '@theme/style';
import { formatPhoneNumber } from '@utils/helper';
import moment from 'moment';
import { users } from '@api/users';
import Toast from 'react-native-root-toast';

const UnverifiedRow = (props) => {
  const { item, lastRow, index, handlePress, handleLongPress } = props;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const [disable, setDisable] = useState(false);
  const handlePressSend = async (item) => {
    let message = '';
    let bgColor = Colors.success;
    setDisable(true);
    try {
      await users.sendCode(item);
      message = `Sent text message to ${formatPhoneNumber(item.phoneNumber)} ${item.firstName} ${
        item.lastName
      } with code ${item.code}`;
    } catch (error) {
      message = error.response.data.error.message;
      bgColor = Colors.red;
    }

    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: bgColor,
      onHidden: () => {
        setDisable(false);
      },
    });
  };
  return (
    <View>
      <TouchableOpacity
        style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
        onPress={() => handlePress(item)}
        onLongPress={() => handleLongPress(item)}
      >
        <View style={[Style.tableRow, item.selected && Style.tableRowSelected]}>
          <View
            style={{
              flex: 1.5,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: Default.fixPadding * 1.5,
            }}
          >
            <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>{formatPhoneNumber(item.phoneNumber)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>{item.code}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>
              {moment(item.createdAt).format('MM-DD-YYYY h:mm A')}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>
              {moment(item.updatedAt).format('MM-DD-YYYY h:mm A')}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[Style.buttonStyle, { backgroundColor: disable ? Colors.successBg : Colors.success, width: 80 }]}
              onPress={() => handlePressSend(item)}
              disabled={disable}
            >
              <Text style={disable ? Fonts.Green14Bold : Fonts.White14Bold}>{tr('resend')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {lastRow !== index && <View style={[Style.divider, { marginHorizontal: Default.fixPadding * 1.5 }]} />}
    </View>
  );
};

export default UnverifiedRow;

const styles = StyleSheet.create({});
