import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Style from '@theme/style';
import { Colors, Default, Fonts } from '@constants/style';
import { booking } from '@api/booking';
import { updateAppointment } from '@redux/slices/adminHomeSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ModalContent = ({ message, setVisible, messageType, item }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const sendClientMessage = async () => {
    setDisabled(true);
    const {
      client: { userInfo },
    } = item;
    const data = {
      subject: 'Your Service',
      message: `Hello ${userInfo.firstName} your service will be ready in 10 minutes. Thank you for your patience.`,
      pushToken: userInfo.pushToken,
      phone: userInfo.phoneNumber,
      sendText: false,
    };
    const response = await booking.message(data);
    if (response) {
      setDisabled(false);
      setVisible(false);
    }
  };
  const sendConfirmation = async () => {
    setDisabled(true);
    const {
      client: { userInfo: clientInfo },
      specialist: { userInfo: specialistInfo },
      date,
      timeslot,
      id,
      storeID,
    } = item;
    const data = {
      subject: 'Appointment Confirmation',
      client: clientInfo,
      specialist: specialistInfo,
      date: moment(date).format('M-DD-YYYY'),
      timeslot,
      bookingId: id,
      storeID,
      sendText: false, /// change to true when ready to send text
    };

    const response = await booking.message(data);
    if (response) {
      setDisabled(false);
      dispatch(updateAppointment({ id, confirmed: true }));
      setVisible(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparentBlack,
      }}
    >
      <View
        style={{
          width: 400,
          paddingHorizontal: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Text style={{ ...Fonts.Black16Medium, textAlign: 'left' }}>{message}</Text>
        <View
          style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text
              style={{
                ...Fonts.ExtraLightGrey18Medium,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              {tr('cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (messageType === 'client') sendClientMessage();
              else sendConfirmation();
            }}
            disabled={disabled}
            style={{
              opacity: disabled ? 0.2 : 1,
            }}
          >
            <Text
              style={{
                ...Fonts.Primary18Medium,
                marginRight: Default.fixPadding,
              }}
            >
              {tr('send')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalContent;

const styles = StyleSheet.create({});
