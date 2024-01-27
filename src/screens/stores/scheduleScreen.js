import { Text, View, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import MyStatusBar from '@components/myStatusBar';

const ScheduleScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`scheduleScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const timeOption = [
    {
      key: '1',
      text: '7 : 30 -8 : 30 AM',
    },
    {
      key: '2',
      text: '9 :00 - 10 : 00 AM',
    },
    {
      key: '3',
      text: '10 :30 - 12 : 00 AM',
    },
    {
      key: '4',
      text: '1 :30 - 2 : 30 PM',
    },
    {
      key: '5',
      text: '3 :00 - 4 : 30 PM',
    },
    {
      key: '6',
      text: '5 : 00 - 6 : 30 PM',
    },
    {
      key: '7',
      text: '7 : 00 - 8 : 00 PM',
    },
    {
      key: '8',
      text: '8 : 00 - 9 : 00 PM',
    },
  ];

  const [selectedTime, setSelectedTime] = useState('10 :30 - 12 : 00 AM');
  const today = moment().format('YYYY-MM-DD');

  const statusTime = (text) => {
    setSelectedTime(text);
  };

  const renderItem = ({ item, index }) => {
    const isEnd = index === timeOption.length - 1 || index === timeOption.length - 2;
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
          backgroundColor: selectedTime === item.text ? Colors.primary : Colors.white,
        }}
        onPress={() => {
          statusTime(item.text);
        }}
      >
        <View style={{ marginHorizontal: Default.fixPadding }}>
          <Text style={selectedTime === item.text ? Fonts.White14Medium : Fonts.Grey14Medium}>{item.text}</Text>
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

      <FlatList
        numColumns={2}
        data={timeOption}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <Text
              style={{
                ...Fonts.Black16Bold,
                marginHorizontal: Default.fixPadding * 1.5,
                marginVertical: Default.fixPadding,
              }}
            >
              {tr('date')}
            </Text>
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                borderRadius: 20,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <CalendarPicker
                onDateChange={() => {}}
                selectedDayColor={Colors.primary}
                selectedDayTextColor={Colors.white}
                nextComponent={<Ionicons name='chevron-forward' size={30} color={Colors.grey} />}
                previousComponent={<Ionicons name='chevron-back' size={30} color={Colors.grey} />}
                minDate={today}
              />
            </View>
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
        onPress={() => props.navigation.navigate('confirmationScreen')}
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
