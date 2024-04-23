import { Text, View, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
import { useBookingContext } from '@contexts/BookingContext';
import { useSelector, useDispatch } from 'react-redux';
import { setBookingTime } from '@redux/slices/bookingSlice';
import { useStoreContext } from '@contexts/StoreContext';
import CalendarComponent from '@components/calendar/calendar';
import Loader from '@components/loader';

const ScheduleScreen = (props) => {
  const { navigation } = props;
  const { t, i18n } = useTranslation();
  const { selectedDate } = useBookingContext();

  const { bookingTime, specialist } = useSelector((state) => state.booking);
  const { selectedStore, storeBooking, isLoading } = useSelector((state) => state.stores);

  const dispatch = useDispatch();
  //const { selectedStore } = useStoreContext();
  const { userData } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [timeOption, setTimeOption] = useState();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`scheduleScreen:${key}`);
  }
  const storeTimeSlot = selectedStore?.timeslot ? selectedStore.timeslot : [];
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setBookings([]);
      setTimeOption();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!storeBooking) return;
    getBookings();
  }, [storeBooking]);

  useEffect(() => {
    const date = selectedDate?.dateString ? selectedDate.dateString : selectedDate;
    if (!storeBooking) return;
    if (!date) return;
    dispatch(setBookingTime(null));
    getBookingTime(date);
  }, [selectedDate]);

  const getBookingTime = async (date) => {
    const bookingHours = specialist ? specialist.userInfo.hours : storeTimeSlot;
    const bookingDates = bookings.length > 0 ? bookings : storeBooking;

    const bookedTimeSlot = bookingDates.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking.timeslot);
      }
      return acc;
    }, []);
    if (bookedTimeSlot.length === 0) {
      setTimeOption(bookingHours);
    } else {
      createNewTimeOption(bookedTimeSlot, bookingHours);
    }
  };
  const getBookings = async () => {
    if (specialist) {
      setBookings(specialist.appointmentsSpecialists);
    } else {
      setBookings(storeBooking);
    }
  };

  const createNewTimeOption = (bookedTimeSlot, timeOption) => {
    const newTimeOption = timeOption.map((time) => {
      if (bookedTimeSlot.includes(+time.id)) {
        return { ...time, booked: true };
      } else {
        return { ...time, booked: false };
      }
    });
    setTimeOption(newTimeOption);
  };
  const backAction = () => {
    props.navigation.pop();
    return true;
  };

  const statusTime = (id) => {
    dispatch(setBookingTime(id));
  };
  if (isLoading) return null;
  const renderItem = ({ item, index }) => {
    const isEnd = index === timeOption.length - 1 || index === timeOption.length - 2;
    const disabled = item.booked ? true : false;
    let bg = bookingTime === item.id ? Colors.primary : Colors.white;
    if (item.booked) {
      bg = Colors.lightGrey;
    }
    return (
      <TouchableOpacity
        style={{
          ...Default.shadow,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: Default.fixPadding * 1.5,
          marginLeft: Default.fixPadding * 1.5,
          marginRight: index % 2 === 0 ? 0 : Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          borderRadius: 10,
          backgroundColor: bg,
        }}
        disabled={disabled}
        onPress={() => {
          statusTime(item.id);
        }}
      >
        <View style={{ marginHorizontal: Default.fixPadding }}>
          <Text style={bookingTime === item.id ? Fonts.White14Medium : Fonts.Grey14Medium}>{item.hours}</Text>
        </View>
      </TouchableOpacity>
    );
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
        <TouchableOpacity style={{ marginHorizontal: Default.fixPadding * 1.5 }} onPress={() => props.navigation.pop()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}> {tr('schedule')}</Text>
      </View>
      <CalendarComponent />
      <FlatList
        numColumns={2}
        data={timeOption}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <Text
              style={{
                ...Fonts.Black16Bold,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            >
              {tr('slot')}
            </Text>
          </>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          if (bookingTime) {
            props.navigation.navigate('confirmationScreen');
          }
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.primary,
          ...Default.shadow,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('Continue')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleScreen;
