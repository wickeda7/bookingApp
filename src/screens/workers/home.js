import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TimeLine from '@components/calendar/TimeLine';

import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import { useBookingContext } from '@contexts/BookingContext';
import Feather from 'react-native-vector-icons/Feather';

const WorkerHome = ({ props }) => {
  const { userData } = useAuthContext();
  const { t, i18n } = useTranslation();
  const { getUserBooking } = useBookingContext();
  const [data, setData] = useState([]);
  const isRtl = i18n.dir() === 'rtl';
  const roleId = userData?.role.id || null; // 3 === worker, 1 === user, 4 === admin
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  useEffect(() => {
    const getData = async () => {
      // get booking within the week of the calendar
      let res = await getUserBooking(false, 'specialist');
      setData(res);
    };
    getData();
  }, []);

  if (data.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Feather name='calendar' color={Colors.primary} size={50} />
        <Text
          style={{
            ...Fonts.Primary16Bold,
            marginVertical: Default.fixPadding,
          }}
        >
          {tr('noBooking')}
        </Text>
      </View>
    );
  return (
    <>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <Text>TODO: set up reminder for appointments</Text>
      </View>
      <TimeLine data={data} />
    </>
  );
};

export default WorkerHome;
