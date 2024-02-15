import { Text, View, TouchableOpacity, Image, BackHandler, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Fonts, Default } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { STRAPIURL } from '@env';
import { formatPhoneNumber, formatPrice } from '@utils/helper';
import moment from 'moment';
import DashedLine from 'react-native-dashed-line';
import ItemRow from '@components/itemRow';
const BookingDetail = (props) => {
  const booking = props.route.params;
  const { client, specialist, services, date, status, id, timeslot } = booking;
  console.log('BookingDetail', booking);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    userInfo: {
      profileImg: { url },
    },
  } = client;
  const {
    userInfo: { hours },
  } = specialist;
  const time = hours.find((hour) => +hour.id === timeslot);
  const pServices = JSON.parse(services);
  console.log('BookingDetail', pServices);
  let total = 0;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`ongoingDetail:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
          borderColor: 'black',
        }}
      >
        <TouchableOpacity style={{ marginHorizontal: Default.fixPadding * 1.5 }} onPress={() => props.navigation.pop()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={{ ...Fonts.White18Bold, marginVertical: Default.fixPadding }}>
          {firstName} {lastName}
        </Text>
      </View>
      <View
        style={{
          flex: 8.2,
          backgroundColor: Colors.white,
        }}
      >
        <Avatar.Image
          size={128}
          source={{
            uri: `${STRAPIURL}${url}`,
          }}
          style={{
            marginTop: -40,
            alignSelf: 'center',
          }}
        />
        <Text style={{ ...Fonts.Black16Bold, textAlign: 'center' }}>
          {firstName} {lastName}
        </Text>
        <Text style={{ ...Fonts.Grey14Medium, textAlign: 'center' }}>{email}</Text>
        <Text style={{ ...Fonts.Grey14Medium, textAlign: 'center' }}>{formatPhoneNumber(phoneNumber)}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              marginVertical: Default.fixPadding * 1.5,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <View
              style={{
                flex: 2.5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: Default.fixPadding,
                borderLeftWidth: isRtl ? 2 : 0,
                borderLeftColor: isRtl ? Colors.lightGrey : null,
              }}
            >
              <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Ionicons name='calendar-outline' color={Colors.black} size={20} />
                <Text
                  style={{
                    ...Fonts.Black16Medium,
                    marginHorizontal: Default.fixPadding * 0.5,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  {tr('date')}
                </Text>
              </View>
              <Text style={Fonts.Grey14Medium}>{moment(date).format('MMM Do YYYY')}</Text>
            </View>
            <View
              style={{
                flex: 3.5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: Default.fixPadding,
                borderLeftWidth: 2,
                borderLeftColor: Colors.lightGrey,
              }}
            >
              <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Ionicons name='time-outline' color={Colors.black} size={20} />
                <Text
                  style={{
                    ...Fonts.Black16Medium,
                    marginHorizontal: Default.fixPadding * 0.5,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  {tr('time')}
                </Text>
              </View>
              <Text style={Fonts.Grey14Medium}>{time.hours}</Text>
            </View>
          </View>
          <DashedLine dashLength={5} dashColor={Colors.extraLightGrey} style={{ marginTop: Default.fixPadding }} />
          <View style={{ marginTop: 10 }}>
            {pServices.map((item) => {
              total += item.price * 100;
              return <ItemRow item={item} key={item.id} />;
            })}
          </View>
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Text style={Fonts.Black16Medium}>{tr('totalPay')}</Text>
            <Text style={Fonts.Primary16Medium}>{formatPrice(total)}</Text>
          </View>
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Text>TODO: need to add tips and tax</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({});
