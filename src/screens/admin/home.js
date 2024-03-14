import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationsHelper from '@utils/notifications';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import { setStaff, setAppointment } from '@redux/slices/adminHomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/loader';
import moment from 'moment';
import { getBooking } from '@redux/actions/adminHomeAction';
import StaffRow from '@components/admin/StaffRow';
import CustomerRow from '@components/admin/CustomerRow';
import Accordion from '@components/Accordion';
import { DraxProvider, DraxView, DraxViewDragStatus, DraxSnapbackTargetPreset } from 'react-native-drax';
const AdminHome = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { isLoading, staffAvailable, staffUnAvailable, walkin, appointment } = useSelector((state) => state.adminHome);
  const employee = userData.storeAdmin.employee;
  const today = moment().format('YYYY-MM-DD');
  const storeId = userData.storeAdmin.id;
  useEffect(() => {
    dispatch(getBooking({ storeId, today }));
    dispatch(setStaff(employee));
  }, []);
  //https://www.geeksforgeeks.org/create-an-expandable-listview-in-react-native/
  return (
    <DraxProvider>
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
      {/* <TouchableOpacity onPress={() => console.log(walkin)} style={{ position: 'absolute', top: 5, right: 10 }}>
        <Ionicons name='notifications-outline' size={45} color={Colors.white} />
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            top: 6,
            right: 20,
            borderRadius: 8,
            backgroundColor: 'orange',
          }}
        >
          <Text style={Fonts.Black14}>10</Text>
        </View>
      </TouchableOpacity> */}
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
