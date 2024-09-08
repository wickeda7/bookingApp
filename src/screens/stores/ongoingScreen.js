import { Text, View, TouchableOpacity, FlatList, Image, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useBookingContext } from '@contexts/BookingContext';
import { useAuthContext } from '@contexts/AuthContext';
import Loader from '@components/loader';
//import ConfirmModal from '@components/user/confirmModal';
import Feather from 'react-native-vector-icons/Feather';
import BookingRow from '@components/user/bookingRow';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBooking } from '@redux/actions/bookingAction';
import { usePushNotifications } from '@utils/usePushNotifications';
import { updateUserBooking } from '@redux/slices/bookingSlice';

const OngoingScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { navigation, route } = props;
  const isRtl = i18n.dir() === 'rtl';
  const { cancelId } = useBookingContext();
  const { userData } = useAuthContext();
  const { notification } = usePushNotifications();
  const dispatch = useDispatch();
  const { isLoading, userBookings } = useSelector((state) => state.booking);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getUserBooking({ id: userData.id, done: false, type: 'user' }));
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (notification) {
      const data = notification.request.content.data;
      dispatch(updateUserBooking({ data }));
    }
  }, [notification]);

  useEffect(() => {
    if (cancelId) {
      const newData = data.filter((item) => item.id !== cancelId);
      setData(newData);
    }
  }, [cancelId]);
  function tr(key) {
    return t(`ongoingScreen:${key}`);
  }
  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
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
  };
  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <View
        style={{
          overflow: 'hidden',
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.push('StoresStack', { screen: 'ongoingDetailScreen', params: item })}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            backgroundColor: Colors.white,
          }}
        >
          <BookingRow item={item} showStatus={true} done={false} props={props} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader visible={isLoading} />
      <FlatList
        numColumns={1}
        data={userBookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListMessage}
      />

      {/* <ConfirmModal visible={visible} setVisible={setVisible} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  status: {
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    padding: 5,
    fontSize: 10,
  },
});
export default OngoingScreen;
