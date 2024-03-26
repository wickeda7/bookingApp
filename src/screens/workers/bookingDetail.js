import { Text, View, TouchableOpacity, Image, BackHandler, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Fonts, Default, DefaultImage } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Avatar } from 'react-native-paper';
import { formatPhoneNumber, formatPrice } from '@utils/helper';
import moment from 'moment';
import DashedLine from 'react-native-dashed-line';
import ServiceRow from '@components/workers/ServiceRow';
import { useDispatch, useSelector } from 'react-redux';
import { notifyBooking, addInvoice } from '@redux/actions/bookingAction';
import debounce from 'lodash/debounce';
import Loader from '@components/loader';
const BookingDetail = (props) => {
  let bookingId = props.route.params.bookingId;
  const { userBookings, isLoading } = useSelector((state) => state.booking);

  let booking = userBookings.find((obj) => obj.id === bookingId);
  const { client, specialists, services, date, id, timeslot, canceled } = booking;

  const {
    email,
    userInfo: { firstName, lastName, phoneNumber, profileImg },
  } = client;
  const {
    userInfo: { firstName: SfirstName, lastName: SlastName, hours },
  } = specialists[0];
  const image = profileImg?.url ? profileImg.url : DefaultImage;
  const dispatch = useDispatch();

  const [pServices, setPServices] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [additional, setAdditional] = useState(0);
  const [total, setTotal] = useState(0);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const ref = useRef();
  let bookingHour = '';

  if (timeslot) {
    const time = hours.find((hour) => +hour.id === timeslot);
    bookingHour = time.hours;
  } else {
    bookingHour = moment().format('hh:mm A');
  }

  useEffect(() => {
    const tempServices = typeof services === 'object' ? services : JSON.parse(services);
    setPServices(tempServices);
  }, []);

  useEffect(() => {
    if (pServices.length > 0) {
      let sub = 0;
      let addition = 0;
      let tot = 0;
      for (var value of pServices) {
        if (value.price) sub += value.price;
        if (value.additional) addition += value.additional;
      }
      tot = sub + addition;
      setSubtotal(sub);
      setAdditional(addition);
      setTotal(tot);
      booking = { ...booking, services: pServices, subtotal: sub, additional: addition, total: tot };

      if (pServices[0].status === 'working' && !canceled) {
        setEnableSubmit(true);
      }
    }
  }, [pServices]);

  const onChange = () => {
    dispatch(notifyBooking(pServices));
  };
  useEffect(() => {
    ref.current = onChange;
  }, [onChange]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const handleTextChange = (value, id, field) => {
    debouncedCallback();
    let tempServices = [...pServices];
    let serviceIndex = tempServices.findIndex((obj) => obj.id === id);
    let service = { ...tempServices[serviceIndex] };
    let { price } = service;

    let total = 0;
    if (value !== '') {
      if (field === 'additional') {
        total = price * 100 + +value * 100;
        service = { ...service, additional: +value, total: total / 100 };
      } else {
        service = { ...service, notes: value };
      }
      tempServices[serviceIndex] = service;
    }
    setPServices(tempServices);
  };

  const handleSubmit = () => {
    const bookingId = booking.id;
    const Dbooking = userBookings.find((obj) => obj.id === bookingId);
    let services = typeof Dbooking.services === 'string' ? JSON.parse(Dbooking.services) : Dbooking.services;
    services = services.map((service) => {
      let { additional, price, bookingId, id, name, notes, total } = service;
      additional = additional ? additional : 0;
      notes = notes ? notes : '';
      total = total ? total : 0;
      return { additional, price, bookingId, id, name, notes, total };
    });
    const data = {
      client: Dbooking.client.id,
      specialist: specialists[0].id,
      type: Dbooking.timeslot === null ? 'walkin' : 'appointment',
      store: Dbooking.storeID,
      appointment: bookingId,
      services,
      subtotal: Dbooking.subtotal,
      additional: Dbooking.additional,
      total: Dbooking.total,
      createdby: `${SfirstName} ${SlastName}`,
    };
    props.navigation.pop();
    dispatch(addInvoice({ data }));
  };
  return (
    <View style={{ flex: 1 }}>
      <Loader visible={isLoading} />
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
        <View style={{ zIndex: 100 }}>
          <Text style={{ ...Fonts.White18Bold, marginVertical: Default.fixPadding }}>
            {firstName} {lastName}
          </Text>
        </View>
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
            uri: image,
          }}
          style={{
            marginTop: -40,
            alignSelf: 'center',
            zIndex: 10,
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
              <Text style={Fonts.Grey14Medium}>{moment(date).format('M-DD-YYYY')}</Text>
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
              {canceled ? (
                <View style={Style.canceledContainer}>
                  <Text style={[Style.canceledText]}>Canceled</Text>
                </View>
              ) : (
                <Text style={Fonts.Grey14Medium}>{bookingHour}</Text>
              )}
            </View>
          </View>
          <DashedLine
            dashLength={5}
            dashColor={Colors.extraLightGrey}
            style={{ marginTop: Default.fixPadding, marginHorizontal: Default.fixPadding }}
          />
          <View style={[Style.contentContainer, { flexDirection: 'column', marginHorizontal: Default.fixPadding }]}>
            <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
              <Text style={[Style.tableHeaderText14Medium, { flex: 2, marginLeft: 0 }]}>{tr('servicename')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('price')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('additional')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0, textAlign: 'right' }]}>
                {tr('total')}
              </Text>
            </View>
          </View>
          {pServices.map((item) => {
            return <ServiceRow item={item} key={item.id} handleTextChange={handleTextChange} />;
          })}
          <View
            style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 2 }]}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: Default.fixPadding * 2,
              paddingTop: Default.fixPadding * 2,
              paddingBottom: Default.fixPadding * 4,
            }}
          >
            <View style={[{ flex: 4 }]}></View>
            <View style={[{ flex: 5, flexDirection: 'column' }]}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
                  <Text style={[Fonts.Primary16Medium]}>Subtotal:</Text>
                </View>
                <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
                  <Text>{formatPrice(subtotal * 100)}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
                  <Text style={[Fonts.Primary16Medium]}>Additional:</Text>
                </View>
                <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
                  <Text>{formatPrice(additional * 100)}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
                  <Text style={[Fonts.Primary16Medium]}>Total:</Text>
                </View>
                <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
                  <Text>{formatPrice(total * 100)}</Text>
                </View>
              </View>
              <View
                style={[
                  Style.divider,
                  { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 },
                ]}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {enableSubmit && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handleSubmit();
                    }}
                    style={[
                      Style.buttonStyle,
                      {
                        backgroundColor: Colors.info,
                        marginTop: 0,
                        flexDirection: 'row',
                        width: 100,
                      },
                    ]}
                  >
                    <AntIcon size={18} name='upload' color={Colors.white} />
                    <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>
                      {tr('submit')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({});
