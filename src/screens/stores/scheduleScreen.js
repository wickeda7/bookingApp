import { Text, View, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import MyStatusBar from '@components/myStatusBar';
import { useBookingContext } from '@contexts/BookingContext';
import { useStoreContext } from '@contexts/StoreContext';
import CalendarComponent from '@components/calendar/calendar';
import { use } from 'i18next';

const ScheduleScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { selectedSpecialist, selectedTime, setSelectedTime, specialistBookings, selectedDate } = useBookingContext();
  const { selectedStore } = useStoreContext();
  const [bookings, setBookings] = useState([]);
  const [timeOption, setTimeOption] = useState(selectedSpecialist?.userInfo?.hours);

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`scheduleScreen:${key}`);
  }

  useEffect(() => {
    const date = selectedDate?.dateString ? selectedDate.dateString : selectedDate;
    if (!date) return;
    setSelectedTime(null);
    const bookedTimeSlot = bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking.timeslot);
      }
      return acc;
    }, []);
    if (bookedTimeSlot.length === 0) {
      setTimeOption(selectedSpecialist?.userInfo?.hours);
    } else {
      createNewTimeOption(bookedTimeSlot);
    }
  }, [selectedDate]);

  const getBookings = () => {
    const specialistId = selectedSpecialist.id;
    const { appointmentsSpecialist } = specialistBookings.find((booking) => booking.id === specialistId);
    setBookings(appointmentsSpecialist);
  };

  const createNewTimeOption = (bookedTimeSlot) => {
    const newTimeOption = timeOption.map((time) => {
      if (bookedTimeSlot.includes(+time.id)) {
        return { ...time, booked: true };
      } else {
        return time;
      }
    });
    setTimeOption(newTimeOption);
  };
  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    getBookings();
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const statusTime = (id) => {
    setSelectedTime(id);
  };

  const renderItem = ({ item, index }) => {
    const isEnd = index === timeOption.length - 1 || index === timeOption.length - 2;
    const disabled = item.booked ? true : false;
    let bg = selectedTime === item.id ? Colors.primary : Colors.white;
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
          <Text style={selectedTime === item.id ? Fonts.White14Medium : Fonts.Grey14Medium}>{item.hours}</Text>
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
          if (selectedTime) {
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
