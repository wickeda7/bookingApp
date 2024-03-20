import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@components/user/confirmModal';
const BookingRow = ({ item, showStatus, done, props }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`ongoingScreen:${key}`);
  }
  const [visible, setVisible] = useState(false);
  let temp = null;
  let aTime = '';
  if (item.specialist) {
    temp = item.specialist.userInfo.hours.find((hour) => +hour.id === item.timeslot);
  } else {
    const storeHours = item.store.timeslot;
    temp = storeHours.find((hour) => +hour.id === item.timeslot);
  }
  if (item.timeslot) {
    const time = temp.hours.split('-');
    aTime = `( ${time[0]})`;
  } else {
    aTime = `( ${tr('walkIn')})`;
  }

  const date = moment(item.date).format('MMM Do YYYY');
  const status = item.confirmed ? 'Confirmed' : 'Pending';

  return (
    <>
      <ConfirmModal visible={visible} setVisible={setVisible} item={item} />
      <Image source={{ uri: `${item.store.logo.url}` }} style={{ width: 131, height: 143 }} />
      <View
        style={{
          alignItems: isRtl ? 'flex-end' : 'flex-start',
          justifyContent: 'center',
          margin: Default.fixPadding,
        }}
      >
        <Text style={Fonts.Primary16Medium}>
          {item.store.name} {item.id}
        </Text>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginVertical: Default.fixPadding * 0.5,
          }}
        >
          <Octicons
            name='location'
            size={18}
            color={Colors.grey}
            style={{
              marginRight: Default.fixPadding * 0.5,
              marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
            }}
          />

          <Text style={{ ...Fonts.Grey14Regular }}>{item.store.address}</Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 20, marginTop: -5 }}>
          <Text style={{ ...Fonts.Grey14Regular }}>
            {item.store.city}, {item.store.state} {item.store.zip}{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginVertical: Default.fixPadding * 0.5,
          }}
        >
          <Text
            style={{
              ...Fonts.Black14Medium,
              marginBottom: Default.fixPadding * 0.5,
            }}
          >
            {date} {aTime}
          </Text>
          {showStatus && (
            <Text
              style={[
                styles.status,
                {
                  borderColor: item.confirmed ? Colors.success : Colors.pending,
                  backgroundColor: item.confirmed ? Colors.successBg : Colors.pendingBg,
                  color: item.confirmed ? Colors.success : Colors.pending,
                },
              ]}
            >
              {status}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {done ? (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                width: 100,
                marginTop: Default.fixPadding,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
              onPress={() =>
                props.navigation.navigate('StoresStack', {
                  screen: 'searchLocationScreen',
                  params: {
                    item: item,
                  },
                })
              }
            >
              <Text numberOfLines={1} style={Fonts.Primary14Medium}>
                Get Direction
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: Default.fixPadding * 0.5,
                  padding: Default.fixPadding,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
                onPress={() =>
                  props.navigation.navigate('StoresStack', {
                    screen: 'searchLocationScreen',
                    params: {
                      item: item,
                    },
                  })
                }
              >
                <Text numberOfLines={1} style={{ ...Fonts.Primary14Medium }}>
                  Get Direction
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setVisible(true);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: Default.fixPadding,
                  marginHorizontal: Default.fixPadding * 0.5,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.Grey14Medium,
                    paddingHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  {tr('cancel')}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default BookingRow;

const styles = StyleSheet.create({
  status: {
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    padding: 5,
    fontSize: 10,
  },
});
