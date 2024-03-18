import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TimeLine from '@components/calendar/TimeLine';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import Device from 'react-native-device-info';
import ComingSoon from '@components/ComingSoon';
import NotificationsHelper from '@utils/notifications';
import Loader from '@components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBooking } from '@redux/actions/bookingAction';
import { updateUserBooking } from '@redux/slices/bookingSlice';
const WorkerHome = ({ props }) => {
  const { userData } = useAuthContext();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const roleId = userData?.role.id || null; // 3 === worker, 1 === user, 4 === admin
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const isTablet = Device.isTablet();
  const name = userData?.userInfo?.firstName ? userData.userInfo.firstName + ' ' + userData.userInfo.lastName : '';
  const dispatch = useDispatch();
  const { isLoading, userBookings } = useSelector((state) => state.booking);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    dispatch(getUserBooking({ id: userData.id, done: false, type: 'specialist' }));
  }, []);
  useEffect(() => {
    if (notification) {
      console.log('notification home notification.request.content.data............', userBookings);
      dispatch(updateUserBooking({ data: notification.request.content.data, userId: userData.id }));
    }
  }, [notification]);
  return (
    <>
      <NotificationsHelper setNotification={setNotification} />
      <Loader visible={isLoading} />
      <View style={{ paddingVertical: Default.fixPadding, backgroundColor: Colors.primary }}>
        <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', marginHorizontal: Default.fixPadding * 1.5 }}>
          <View style={{ flex: 9 }}>
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <Text style={Fonts.White20Bold}>{tr('hii')}, </Text>
              <Text style={Fonts.Yellow20Bold}>{name}</Text>

              <Text style={Fonts.Yellow20Bold}></Text>
            </View>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                marginTop: Default.fixPadding * 0.5,
              }}
            ></View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('UserStack', { screen: 'notificationScreen' })}
            style={{ flex: 1, marginVertical: Default.fixPadding }}
          >
            <Ionicons name='notifications-outline' size={30} color={Colors.white} />
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                width: 8,
                height: 8,
                top: '15%',
                left: '45%',
                borderRadius: 4,
                backgroundColor: Colors.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isTablet ? (
        <ComingSoon />
      ) : (
        <>
          {userBookings.length === 0 ? (
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
          ) : (
            <TimeLine data={userBookings} />
          )}
        </>
      )}
    </>
  );
};

export default WorkerHome;
