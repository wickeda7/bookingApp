import { StyleSheet, Text, View, TouchableOpacity, ScrollView, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons6 from 'react-native-vector-icons/FontAwesome6';
import NotificationsHelper from '@utils/notifications';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import { useAdminContext } from '@contexts/AdminContext';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/loader';
import moment from 'moment';
import { getBooking } from '@redux/actions/adminHomeAction';
import {
  updateNotification,
  updateNewInvoice,
  updateAppointment,
  setStaff,
  setAppointment,
  setWalkin,
} from '@redux/slices/adminHomeSlice';
import StaffRow from '@components/admin/StaffRow';
import Accordion from '@components/Accordion';
import { DraxProvider } from 'react-native-drax';
import socket from '@utils/socket';
import Dlist from '@components/admin/Dlist';
import TestW2 from '../../components/TestW2';

const AdminHome = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const [notification, setNotification] = useState(null);

  const [clockIn, setClockIn] = useState(false);
  const { userData } = useAuthContext();
  const { setSetTurn, setAmountPerTurn, notificationNumber, setNotificationNumber } = useAdminContext();
  const dispatch = useDispatch();
  const { isLoading, staffAvailable, staffUnAvailable, walkin, appointment } = useSelector((state) => state.adminHome);
  const employee = userData.storeAdmin.employee;
  const today = moment().format('YYYY-MM-DD');
  const storeId = userData.storeAdmin.id;
  const amountPerTurn = userData.storeAdmin.amountPerTurn;
  const setTurn = userData.storeAdmin.setTurns;

  useEffect(() => {
    setAmountPerTurn(amountPerTurn);
    setSetTurn(setTurn);
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
      let data = notification.request.content.data;
      console.log('notification home ADMIN notification.request.content.data', notification.request.content.data);
      if (data.type === 'cancel') {
        dispatch(updateAppointment(data));
        return;
      }
      if (data.type === 'newBooking') {
        if (data.specialistID) {
          const staffA = staffAvailable.find((obj) => obj.id === data.specialistID);
          const staffU = staffUnAvailable.find((obj) => obj.id === data.specialistID);
          const staff = staffA ? staffA : staffU;
          data.specialist = staff;
          if (data.services) {
            data.services = data.services.map((item) => {
              return { ...item, reqSpecialist: staff };
            });
          }
        }
        setNotificationNumber((prev) => prev + 1);
        if (!data.services) {
          const services = [
            {
              newService: true,
              name: '',
              price: 0,
              additional: 0,
              total: 0,
              status: 'pending',
              type: 'walkin',
              bookingId: data.id,
            },
          ];
          data.services = services;
        }
        if (data.timeslot) {
          dispatch(setAppointment(data));
        } else {
          dispatch(setWalkin(data));
        }
        return;
      }
      if (data.appointment) {
        // after invoice created
        dispatch(updateNewInvoice(data));
        return;
      }
    }
  }, [notification]);
  return (
    <>
      <DraxProvider>
        <NotificationsHelper setNotification={setNotification} />
        <Loader visible={isLoading} />
        <View
          style={{
            paddingVertical: Default.fixPadding,
            backgroundColor: Colors.primary,
          }}
        >
          <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', marginHorizontal: Default.fixPadding * 1.5 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={Fonts.White18Bold}>{userData.storeAdmin.name} v1.4.1</Text>
            </View>
            <View style={{ flex: 5, flexDirection: 'row-reverse' }}>
              <View style={{ width: 70, height: 50, position: 'relative' }}>
                <TouchableOpacity
                  onPress={() => setNotificationNumber(0)}
                  // onPress={() => console.log('staffUnAvailable', staffUnAvailable)}
                  style={{ position: 'absolute', top: 5, right: 10 }}
                >
                  <Ionicons name='notifications-outline' size={30} color={Colors.white} />
                  {notificationNumber > 0 && (
                    <View style={[Style.tick]}>
                      <Text style={Fonts.Black14}>{notificationNumber}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ width: 70, alignItems: 'flex-end', paddingTop: 8 }}>
                {setTurn && (
                  <TouchableOpacity onPress={() => setClockIn(!clockIn)}>
                    <Icons6 name={'user-gear'} size={25} color={clockIn ? Colors.disable : Colors.white} />
                  </TouchableOpacity>
                )}
              </View>
              {/* <View style={{ width: 70, alignItems: 'flex-end', paddingTop: 8 }}>
                <TouchableOpacity
                  onPress={() => {
                    // getPermission();
                    //setShowExtend(!showExtend);
                  }}
                >
                  <Icons6 name={'display'} size={25} color={showExtend ? Colors.disable : Colors.white} />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
        <View style={[Style.mainContainer, { flexDirection: 'row', padding: Default.fixPadding * 1.5, marginTop: 5 }]}>
          <View style={[{ flex: 2 }]}>
            <ScrollView
              contentInsetAdjustmentBehavior='automatic'
              style={[styles.container, { paddingLeft: Default.fixPadding * 3 }]}
            >
              {clockIn ? (
                <Dlist staffAvailable={staffAvailable} />
              ) : (
                <>
                  {staffAvailable.map((item, index) => {
                    return <StaffRow key={index} item={item} busy={false} />;
                  })}
                  {staffUnAvailable.map((item, index) => {
                    return <StaffRow key={index} item={item} busy={true} />;
                  })}
                </>
              )}
            </ScrollView>
          </View>
          <View style={[styles.borderLeft, { flex: 4 }]}>
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.container}>
              {/* <TestW2 /> */}
              <Accordion data={walkin} type={'admin'} />
              <Accordion data={appointment} type={'admin'} />
            </ScrollView>
          </View>
        </View>
      </DraxProvider>
    </>
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
