import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useBookingContext } from '@contexts/BookingContext';
const ConfirmModal = ({ visible, setVisible }) => {
  const { t, i18n } = useTranslation();
  const { cancelBooking, deleteHistory, setCancelId } = useBookingContext();

  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`ongoingScreen:${key}`);
  }
  const onCancel = async () => {
    const res = await deleteHistory(cancelBooking.id);
    console.log('CANCELED NEED TO NOTIFY STORE!!!!!!', res);
    if (res) {
      setCancelId(cancelBooking.id);
      setVisible(false);
    }
  };
  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
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
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 150,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              paddingHorizontal: Default.fixPadding * 1.5,
              paddingVertical: Default.fixPadding,
            }}
          >
            <Text
              style={{
                ...Fonts.Black16Medium,
                textAlign: 'center',
                marginVertical: Default.fixPadding,
              }}
            >
              {tr('areYouSure')}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                justifyContent: 'space-around',
                marginVertical: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() => onCancel()}
                style={{
                  alignItems: 'center',
                  paddingVertical: Default.fixPadding,
                  width: '40%',
                  borderRadius: 10,
                  backgroundColor: Colors.primary,
                  ...Default.shadow,
                }}
              >
                <Text style={Fonts.White14Bold}>{tr('yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  alignItems: 'center',
                  paddingVertical: Default.fixPadding,
                  width: '40%',
                  borderRadius: 10,
                  backgroundColor: Colors.regularGrey,
                  ...Default.shadow,
                }}
              >
                <Text style={Fonts.Primary16Bold}>{tr('no')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({});
