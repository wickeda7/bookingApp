import { Text, View, TouchableOpacity, FlatList, Image, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useBookingContext } from '@contexts/BookingContext';
import Loader from '@components/loader';
import { STRAPIURL } from '@env';
import moment from 'moment';
import ConfirmModal from '@components/confirmModal';

const OngoingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  const { getUserBooking } = useBookingContext();
  const [lVisible, setLVisible] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLVisible(true);
      const res = await getUserBooking();
      setData(res);
      setLVisible(false);
    };
    getData();
  }, []);

  function tr(key) {
    return t(`ongoingScreen:${key}`);
  }

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    const temp = item.specialist.userInfo.hours.find((hour) => +hour.id === item.timeslot);
    const time = temp.hours.split('-');
    const time1 = time[1].split(' ');
    const aTime = `( ${time[0]} ${time1[2]} )`;
    const date = moment(item.date).format('MMM Do YYYY');
    const status = item.confirmed ? 'Confirmed' : 'Pending';
    return (
      <View
        style={{
          overflow: 'hidden',
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.push('StoresStack', { screen: 'ongoingDetailScreen', params: item })}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            backgroundColor: Colors.white,
          }}
        >
          <Image source={{ uri: `${STRAPIURL}${item.store.logo.url}` }} style={{ width: 131, height: 143 }} />
          <View
            style={{
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              justifyContent: 'center',
              margin: Default.fixPadding,
            }}
          >
            <Text style={Fonts.Primary16Medium}>{item.store.name}</Text>
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
            </View>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
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
                  {tr('getDirection')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setVisible(true)}
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
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader visible={lVisible} />
      <FlatList
        numColumns={1}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <ConfirmModal visible={visible} setVisible={setVisible} />
    </View>
  );
};
const styles = StyleSheet.create({
  status: {
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    padding: 5,
    fontSize: 10,
  },
});
export default OngoingScreen;
