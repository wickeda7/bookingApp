import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationsHelper from '@utils/notifications';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import { setStaff, setAppointment, setWalkin } from '@redux/slices/adminHomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/loader';
import moment from 'moment';
import { getBooking } from '@redux/actions/adminHomeAction';
import { updateNotification } from '@redux/slices/adminHomeSlice';
import StaffRow from '@components/admin/StaffRow';
import Accordion from '@components/admin/Accordion';
import { DraxProvider } from 'react-native-drax';
import socket from '@utils/socket';
const AdminHome = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const [notification, setNotification] = useState(null);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { isLoading, staffAvailable, staffUnAvailable, walkin, appointment } = useSelector((state) => state.adminHome);
  const employee = userData.storeAdmin.employee;
  const today = moment().format('YYYY-MM-DD');
  const storeId = userData.storeAdmin.id;

  useEffect(() => {
    const handlerNewOrder = (data) => {
      dispatch(updateNotification(data));
    };
    if (userData.role.id === 4) {
      socket.auth = { userId: userData.id, userInfoId: userData.userInfo.id };
    }
    socket.connect();
    socket.on('connect_error', (err) => {
      socket.off('connect_error');
    });

    socket.on('bookingChanged', handlerNewOrder);

    dispatch(getBooking({ storeId, today }));
    dispatch(setStaff(employee));
    return () => {
      socket.off('bookingChanged', handlerNewOrder);
    };
  }, []);
  useEffect(() => {
    if (notification) {
      //console.log('notification home', notification);

      console.log('notification home notification.request.content.data............', notification.request.content.data);
      const data = notification.request.content.data;
      if (data.specialistID) {
        const staffA = staffAvailable.find((obj) => obj.id === data.specialistID);
        const staffU = staffUnAvailable.find((obj) => obj.id === data.specialistID);
        if (staffA) {
          data.specialist = staffA;
        }
        if (staffU) {
          data.specialist = staffU;
        }
      }
      setNotificationNumber(notificationNumber + 1);
      if (data.timeslot) {
        dispatch(setAppointment(data));
      } else {
        dispatch(setWalkin(data));
      }
    }
  }, [notification]);

  return (
    <DraxProvider>
      <NotificationsHelper setNotification={setNotification} />
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
              onPress={() => setNotificationNumber(0)}
              style={{ position: 'absolute', top: 5, right: 10 }}
            >
              <Ionicons name='notifications-outline' size={45} color={Colors.white} />
              {notificationNumber > 0 && (
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
                  <Text style={Fonts.Black14}>{notificationNumber}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[Style.mainContainer, { flexDirection: 'row', padding: Default.fixPadding * 1.5 }]}>
        <View style={[{ flex: 2 }]}>
          {staffAvailable.map((item, index) => {
            return <StaffRow key={index} item={item} busy={false} />;
          })}
          {staffUnAvailable.map((item, index) => {
            return <StaffRow key={index} item={item} busy={true} />;
          })}
        </View>
        <View style={[styles.borderLeft, { flex: 4 }]}>
          <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.container}>
            <Accordion data={walkin} />
            <Accordion data={appointment} />
          </ScrollView>
        </View>
      </View>
    </DraxProvider>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  borderLeft: {
    borderLeftColor: Colors.bord,
    borderLeftWidth: 1,
    marginLeft: Default.fixPadding * 2,
    paddingLeft: Default.fixPadding * 1.5,
  },
  container: {
    flex: 1,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});
