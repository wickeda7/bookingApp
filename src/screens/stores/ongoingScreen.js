import { Text, View, TouchableOpacity, FlatList, Image, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useBookingContext } from '@contexts/BookingContext';
import Loader from '@components/loader';
import { STRAPIURL } from '@env';
import moment from 'moment';

const OngoingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  const { getUserBooking } = useBookingContext();
  const [lVisible, setLVisible] = useState(false);
  const [data, setData] = useState([]);
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

  const [visible, setVisible] = useState(false);

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
          onPress={() => props.navigation.push('StoresStack', { screen: 'ongoingDetailScreen' })}
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
              <Text style={[styles.status, item.confirmed ? styles.confirmed : styles.pending]}>{status}</Text>
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
                      image: item.image,
                      title: item.title,
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
                  onPress={() => setVisible(false)}
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
  pending: {
    borderColor: 'rgb(234 179 8)',
    color: 'rgb(234 179 8)',
    backgroundColor: 'rgb(254 252 232)',
  },
  confirmed: {
    borderColor: 'rgb(22 163 74)',
    color: 'rgb(22 163 74)',
    backgroundColor: 'rgb(240 253 244)',
  },
});
export default OngoingScreen;
