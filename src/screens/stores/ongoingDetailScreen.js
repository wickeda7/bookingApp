import { Text, View, TouchableOpacity, Image, BackHandler, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import DashedLine from 'react-native-dashed-line';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { STRAPIURL } from '@env';
import moment from 'moment';
import { formatPhoneNumber, formatPrice } from '@utils/helper';
import ItemRow from '@components/itemRow';
import ConfirmModal from '@components/confirmModal';
const OngoingDetailScreen = (props) => {
  const booking = props.route.params;
  const {
    confirmed,
    date,
    timeslot,
    specialist: {
      firstName,
      lastName,
      userInfo: { hours, specialty },
    },
    store: {
      name,
      address,
      city,
      state,
      zip,
      phone,
      logo: { url },
    },
    services,
  } = booking;
  const time = hours.find((hour) => +hour.id === timeslot);
  const status = confirmed ? 'Confirmed' : 'Pending';
  const pServices = JSON.parse(services);
  const [visible, setVisible] = useState(false);
  let leftTitle = confirmed ? 'Get Direction' : 'Rebooking';
  const { t, i18n } = useTranslation();
  let total = 0;
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
  const onConfirm = () => {
    if (confirmed) {
      props.navigation.navigate('StoresStack', {
        screen: 'searchLocationScreen',
        params: {
          item: booking,
        },
      });
    } else {
      // props.navigation.navigate('rebookingScreen', { booking });
    }
  };
  const onCancel = () => {
    setVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <ConfirmModal visible={visible} setVisible={setVisible} />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity style={{ marginHorizontal: Default.fixPadding * 1.5 }} onPress={() => props.navigation.pop()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={{ ...Fonts.White18Bold, marginVertical: Default.fixPadding }}>{name}</Text>
      </View>
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
              flex: 8.5,
              flexDirection: isRtl ? 'row-reverse' : 'row',
              marginHorizontal: Default.fixPadding * 1.5,
              marginVertical: Default.fixPadding,
            }}
          >
            <Image source={{ uri: `${STRAPIURL}${url}` }} style={{ width: 113, height: 110 }} />

            <View
              style={{
                justifyContent: 'center',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
                margin: Default.fixPadding,
              }}
            >
              <Text style={{ ...Fonts.Black18Medium }}>${name}</Text>
              <Image
                source={require('@assets/images/star4.png')}
                style={{ marginVertical: Default.fixPadding * 0.5 }}
              />
              <View
                style={{
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  alignItems: 'center',
                }}
              >
                <Octicons
                  name='location'
                  size={18}
                  color={Colors.extraLightGrey}
                  style={{
                    marginRight: Default.fixPadding * 0.5,
                    marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                  }}
                />
                <Text style={{ ...Fonts.ExtraLightGrey14Medium, maxWidth: '80%' }}>
                  {address}, {city}, {state}, {zip}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <Image source={require('@assets/images/callIcon.png')} />
            <TouchableOpacity onPress={() => props.navigation.navigate('messageScreen')}>
              <Image source={require('@assets/images/chatIcon.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginVertical: Default.fixPadding,
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
              <Text
                style={[
                  styles.status,
                  {
                    borderColor: confirmed ? Colors.success : Colors.pending,
                    backgroundColor: confirmed ? Colors.successBg : Colors.pendingBg,
                    color: confirmed ? Colors.success : Colors.pending,
                  },
                ]}
              >
                {status}
              </Text>
            </View>
            <Text style={Fonts.Grey14Medium}>{time.hours}</Text>
          </View>

          <View
            style={{
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Default.fixPadding,
              borderLeftWidth: 2,
              borderLeftColor: Colors.lightGrey,
            }}
          >
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <Ionicons name='call-outline' color={Colors.black} size={20} />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  marginHorizontal: Default.fixPadding * 0.5,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              >
                {tr('mobile')}
              </Text>
            </View>
            <Text style={Fonts.Grey14Medium}>{formatPhoneNumber(phone)}</Text>
          </View>
        </View>

        <View
          style={{
            padding: Default.fixPadding * 1.5,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <Text style={Fonts.Black16Medium}>{tr('specialist')}</Text>
        </View>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            textAlign: isRtl ? 'right' : 'left',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          {firstName} {lastName}
        </Text>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            textAlign: isRtl ? 'right' : 'left',
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          ({specialty})
        </Text>

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
      </ScrollView>
      <View
        style={{
          ...Default.shadow,
          flexDirection: isRtl ? 'row-reverse' : 'row',
        }}
      >
        <TouchableOpacity
          // onPress={() => props.navigation.navigate('paymentMethodScreen')}
          onPress={() => onConfirm()}
          style={{
            backgroundColor: Colors.primary,
            flex: 1,
            padding: Default.fixPadding * 1.5,
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            borderRadius: 10,
            ...Default.shadow,
          }}
        >
          <Text style={Fonts.White18Bold}>{leftTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => props.navigation.navigate('paymentMethodScreen')}
          onPress={() => onCancel()}
          style={{
            backgroundColor: Colors.white,
            flex: 1,
            padding: Default.fixPadding * 1.5,
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            borderRadius: 10,
            ...Default.shadow,
          }}
        >
          <Text style={Fonts.Black18Bold}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('confirmationScreen')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding,
          borderRadius: 10,
          backgroundColor: Colors.primary,
          ...Default.shadow,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('rebooking')}</Text>
      </TouchableOpacity> */}
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
export default OngoingDetailScreen;
