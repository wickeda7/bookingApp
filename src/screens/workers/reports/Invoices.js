import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors, Fonts, Default, DefaultImage } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeLine from '@components/calendar/TimeLine';
import { useBookingContext } from '@contexts/BookingContext';
import RBSheet from 'react-native-raw-bottom-sheet';
import RangeCalendar from '@components/calendar/rangeCalendar';
import moment from 'moment';
const Invoices = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`reports:${key}`);
  }
  const [calendarView, setCalendarView] = useState(false);
  const [visible, setVisible] = useState(false);
  const refRBSheet = useRef();
  const [data, setData] = useState([]);

  const [selectedDate, setSelectedDate] = useState();
  const from = selectedDate?.from ? `From ${moment(selectedDate.from).format('M/D/YY')}` : '';
  const to = selectedDate?.to ? ` to ${moment(selectedDate.to).format('M/D/YY')}` : '';
  useEffect(() => {
    console.log('selectedDate', selectedDate);
    // const getData = async () => {
    //   // get invoices within the week of the calendar
    //   let res = await getUserBooking(false, 'specialist');
    //   setData(res);
    // };
    // getData();
  }, []);
  useEffect(() => {
    if (!refRBSheet.current) return;
    if (visible) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [visible]);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          backgroundColor: Colors.primary,
          height: 40,
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.navigate('reports')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('invoice')}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: Default.fixPadding * 1.5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}></View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: calendarView ? Colors.primary : Colors.white,
                marginRight: Default.fixPadding,
                borderRadius: 8,
                padding: 2,
              }}
            >
              <TouchableOpacity onPress={() => setCalendarView((prev) => !prev)}>
                <Ionicons
                  name={'calendar-number-outline'}
                  size={22}
                  color={calendarView ? Colors.white : Colors.primary}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: calendarView ? Colors.white : Colors.primary,
                marginRight: Default.fixPadding,
                borderRadius: 8,
                padding: 2,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setCalendarView(true);
                  setVisible((prev) => !prev);
                }}
              >
                <Ionicons name={'calendar-outline'} size={22} color={calendarView ? Colors.primary : Colors.white} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: Default.fixPadding,
                borderRadius: 8,
                padding: 2,
                height: 33,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  console.log('add invoice', refRBSheet, calendarView);
                  refRBSheet.current.open();
                }}
                style={{
                  flex: 1,
                }}
              >
                <MaterialCommunityIcons name='note-plus' size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {calendarView ? (
        <>
          <Text style={[{ fontSize: 14, color: Colors.black, fontWeight: '700' }]}>
            {from}
            {to}
          </Text>
          <RBSheet
            ref={refRBSheet}
            height={400}
            openDuration={100}
            onClose={() => setVisible(false)}
            customStyles={{
              container: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: Colors.white,
              },
            }}
          >
            <RangeCalendar setSelectedDate={setSelectedDate} r />
          </RBSheet>
        </>
      ) : (
        <>
          {data.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name='note' size={50} color={Colors.primary} />
              <Text
                style={{
                  ...Fonts.Primary16Bold,
                  marginVertical: Default.fixPadding,
                }}
              >
                {tr('noInvoice')}
              </Text>
            </View>
          ) : (
            <TimeLine data={data} />
          )}
        </>
      )}
    </View>
  );
};

export default Invoices;

const styles = StyleSheet.create({});
