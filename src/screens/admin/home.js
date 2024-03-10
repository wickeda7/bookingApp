import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationsHelper from '@utils/notifications';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import { setStaff, setWalkin, setAppointment } from '@redux/slices/adminHomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/loader';
import moment from 'moment';
import { getWalkIn } from '@redux/actions/adminHomeAction';
const AdminHome = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.adminHome);
  const staff = userData.storeAdmin.employee;
  const today = moment().format('YYYY-MM-DD');
  const storeId = userData.storeAdmin.id;

  useEffect(() => {
    dispatch(setStaff(staff));
    setStaffAppointment();
    dispatch(getWalkIn({ storeId, today }));
  }, []);
  const setStaffAppointment = () => {
    const appointmentWithStaff = staff.reduce((acc, ele) => {
      const hours = ele.userInfo.hours;
      const appointment = ele.appointmentsSpecialist.filter((app) => app.date === today);
      if (appointment.length > 0) {
        const apps = appointment.map((app) => {
          const time = hours.find((hour) => +hour.id === app.timeslot);
          if (time) {
            let temp = { ...app };
            temp.timeslot = time.hours;
            return temp;
          } else {
            return app;
          }
        });
        acc = [...acc, ...apps];
      }
      return acc;
    }, []);
    dispatch(setAppointment(appointmentWithStaff));
  };

  return (
    <>
      <NotificationsHelper />
      <Loader visible={isLoading} />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <View style={{ flex: 9, justifyContent: 'center' }}>
            <Text style={Fonts.White20Bold}>{userData.storeAdmin.name}</Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 50,
              position: 'relative',
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate('UserStack', { screen: 'notificationScreen' })}
              style={{ position: 'absolute', top: 5, right: 10 }}
            >
              <Ionicons name='notifications-outline' size={45} color={Colors.white} />
              <View
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 20,
                  height: 20,
                  top: 6,
                  right: 20,
                  borderRadius: 8,
                  backgroundColor: Colors.white,
                }}
              >
                <Text style={Fonts.Black14}>10</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text>Home</Text>
      </View>
    </>
  );
};

export default AdminHome;

const styles = StyleSheet.create({});
