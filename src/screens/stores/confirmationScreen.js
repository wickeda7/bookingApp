import { Text, View, TouchableOpacity, Image, BackHandler, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import DashedLine from 'react-native-dashed-line';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

import { useBookingContext } from '@contexts/BookingContext';
import { useAuthContext } from '@contexts/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { addBooking } from '@redux/actions/bookingAction';

import { useStoreContext } from '@contexts/StoreContext';
import { formatPhoneNumber, formatPrice } from '@utils/helper';
import ItemRow from '@components/itemRow';
import Loader from '@components/loader';
import moment from 'moment';

const ConfirmationScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { selectedDate } = useBookingContext();
  const { bookingTime, error, specialist, services, isLoading, bookingType } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const { selectedStore } = useStoreContext();
  const { userData } = useAuthContext();
  const [callBack, setCallBack] = useState(false);
  let time = null;
  const today = moment().format('YYYY-MM-DD');

  if (Object.keys(specialist).length > 0) {
    const {
      userInfo: { firstName, lastName, hours, specialty },
    } = specialist;
    time = hours.find((item) => item.id === bookingTime);
  } else {
    const storeTimeSlot = selectedStore?.timeslot ? selectedStore.timeslot : [];
    time = storeTimeSlot.find((item) => item.id === bookingTime);
  }
  let total = 0;

  const isRtl = i18n.dir() === 'rtl';
  const [confirmed, setConfirmed] = useState(false);
  function tr(key) {
    return t(`confirmationScreen:${key}`);
  }
  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const [text, onChangeText] = useState();

  const onConfirm = async () => {
    const data = {
      data: {
        timeslot: bookingTime,
        services: JSON.stringify(services),
        date: selectedDate.dateString ? selectedDate.dateString : selectedDate.toString(),
        store: selectedStore.id,
        client: userData.id,
        specialist: specialist.id,
        userID: userData.id,
        specialistID: specialist.id,
        storeID: selectedStore.id,
      },
    };
    try {
      dispatch(addBooking(data));
      if (error) return;
      setConfirmed(true);
      setTimeout(() => {
        props.navigation.navigate('bookingScreen');
      }, 200);
    } catch (error) {
      console.log('error confirmBooking', error);
    }
  };
  const navigate = () => {
    if (confirmed) {
      props.navigation.navigate('bookingScreen');
    } else {
      props.navigation.pop();
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <Loader visible={isLoading} />
        <TouchableOpacity style={{ marginHorizontal: Default.fixPadding * 1.5 }} onPress={() => navigate()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        {!confirmed && <Text style={Fonts.White18Bold}>{tr('confirmation')}</Text>}
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
            <Image source={{ uri: selectedStore.logo }} style={{ width: 113, height: 110 }} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
                margin: Default.fixPadding,
              }}
            >
              <Text style={{ ...Fonts.Black18Medium }}>{selectedStore.name}</Text>
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
                <Text style={{ ...Fonts.ExtraLightGrey14Medium, maxWidth: '80%' }}>{selectedStore.location}</Text>
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
            {bookingType === 'appointment' ? (
              <>
                {selectedDate.month ? (
                  <Text
                    style={Fonts.Grey14Medium}
                  >{`${selectedDate.month}-${selectedDate.day}-${selectedDate.year}`}</Text>
                ) : (
                  <Text style={Fonts.Grey14Medium}>{selectedDate}</Text>
                )}
              </>
            ) : (
              <Text style={Fonts.Black16Medium}>{tr('walkIn')}</Text>
            )}
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
            {bookingType === 'appointment' && <Text style={Fonts.Grey14Medium}>{time.hours}</Text>}
          </View>

          <View
            style={{
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Default.fixPadding,
              borderLeftWidth: isRtl ? 0 : 2,
              borderLeftColor: isRtl ? null : Colors.lightGrey,
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
            <Text style={Fonts.Grey14Medium}>{formatPhoneNumber(selectedStore.phone)}</Text>
          </View>
        </View>
        {bookingType === 'walkIn' && (
          <View
            style={[
              Style.contentContainer,
              {
                flexDirection: 'row',

                width: '100%',
              },
            ]}
          >
            <View style={[Style.infoAlert, { position: 'relative', paddingLeft: 30 }]}>
              <View style={{ position: 'absolute', top: 4, left: 5 }}>
                <FontIcon name={'question-circle-o'} size={20} color={Colors.info} />
              </View>
              <Text style={Style.infoText}>
                <Text style={{ marginLeft: 15, paddingLeft: 25 }}>
                  Would you like us to text you at {formatPhoneNumber(selectedStore.phone)} when we are ready?
                </Text>
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    setCallBack((prev) => !prev);
                  }}
                  style={{
                    alignContent: 'center',
                    justifyContent: 'flex-end',
                    padding: 0,
                    flexDirection: 'row',
                  }}
                >
                  <Ionicons
                    name={callBack ? 'radio-button-on-outline' : 'ellipse-outline'}
                    //name={'radio-button-on-outline'}
                    size={22}
                    color={Colors.info}
                    style={{ paddingHorizontal: 0 }}
                  />
                  <Text style={{ color: Colors.info, marginLeft: 5, marginTop: 3, fontWeight: '700' }}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding * 1.5,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <Text style={Fonts.Black16Medium}>{tr('specialist')}</Text>
        </View>
        {Object.keys(specialist).length > 0 ? (
          <>
            <Text
              style={{
                ...Fonts.Grey16Medium,
                marginHorizontal: Default.fixPadding * 1.5,
                marginVertical: Default.fixPadding,
              }}
            >
              {specialist.userInfo.firstName} {specialist.userInfo.lastName}
            </Text>
            <Text
              style={{
                ...Fonts.Grey16Medium,
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding,
              }}
            >
              ({specialist.userInfo.specialty})
            </Text>
          </>
        ) : (
          <Text
            style={{
              ...Fonts.Grey16Medium,
              marginHorizontal: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding,
            }}
          >
            NONE
          </Text>
        )}

        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <Text style={Fonts.Black16Medium}>{tr('notes')}</Text>
        </View>

        <TextInput
          value={text}
          textAlignVertical='top'
          multiline={true}
          numberOfLines={5}
          placeholder={tr('writeService')}
          placeholderTextColor={Colors.grey}
          onChangeText={onChangeText}
          showsVerticalScrollIndicator={false}
          selectionColor={Colors.primary}
          style={{
            ...Default.shadow,
            ...Fonts.Black16Regular,
            borderRadius: 10,
            backgroundColor: Colors.white,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
            padding: Default.fixPadding,
            textAlign: isRtl ? 'right' : 'left',
          }}
        />

        <DashedLine dashLength={5} dashColor={Colors.extraLightGrey} style={{ marginTop: Default.fixPadding }} />

        <TouchableOpacity
          onPress={() => props.navigation.navigate('couponScreen')}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginVertical: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.extraLightPink,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              padding: Default.fixPadding * 1.6,
              borderTopLeftRadius: isRtl ? 0 : Default.fixPadding,
              borderTopRightRadius: isRtl ? Default.fixPadding : 0,
              borderBottomLeftRadius: isRtl ? 0 : Default.fixPadding,
              borderBottomRightRadius: isRtl ? Default.fixPadding : 0,
              backgroundColor: Colors.primary,
            }}
          >
            <MaterialCommunityIcons name='ticket-confirmation-outline' size={25} color={Colors.white} />
          </View>
          <Text
            style={{
              ...Fonts.Primary16Medium,
              flex: 8,
              padding: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          >
            {tr('CouponCode')}
          </Text>
          <Ionicons
            name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
            size={25}
            color={Colors.primary}
            style={{ flex: 1, padding: Default.fixPadding * 1.5 }}
          />
        </TouchableOpacity>
        {services.map((item, index) => {
          total += item.price * 100;
          return <ItemRow item={item} key={item.id} />;
        })}

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <Text style={Fonts.Black16Medium}>{tr('total')}</Text>
          <Text style={Fonts.Primary16Medium}>{formatPrice(total)}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          ...Default.shadow,
          flexDirection: isRtl ? 'row-reverse' : 'row',
          backgroundColor: Colors.white,
        }}
      >
        {confirmed ? (
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('paymentMethodScreen')}
            onPress={() => navigate()}
            style={{
              backgroundColor: Colors.primary,
              flex: 1,
              padding: Default.fixPadding * 1.5,
              alignItems: 'center',
            }}
          >
            <Text style={Fonts.White18Bold}>Thank you for booking with us</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
            >
              <Text
                style={{
                  ...Fonts.Primary22Bold,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginLeft: Default.fixPadding * 0.5,
                }}
              >
                {formatPrice(total)}
              </Text>
            </View>

            <TouchableOpacity
              // onPress={() => props.navigation.navigate('paymentMethodScreen')}
              onPress={() => onConfirm()}
              style={{
                backgroundColor: Colors.primary,
                flex: 1,
                padding: Default.fixPadding * 1.5,
                alignItems: 'center',
              }}
            >
              <Text style={Fonts.White18Bold}>{tr('confirm')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ConfirmationScreen;
