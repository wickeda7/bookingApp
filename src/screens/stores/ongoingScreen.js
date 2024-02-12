import { Text, View, TouchableOpacity, FlatList, Image, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useBookingContext } from '@contexts/BookingContext';
import Loader from '@components/loader';
import ConfirmModal from '@components/confirmModal';
import Feather from 'react-native-vector-icons/Feather';
import BookingRow from '@components/bookingRow';
const OngoingScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { navigation, route } = props;
  const isRtl = i18n.dir() === 'rtl';
  const { getUserBooking, cancelId } = useBookingContext();
  const [lVisible, setLVisible] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getData = async () => {
        setLVisible(true);
        const res = await getUserBooking();
        setData(res);
        setLVisible(false);
      };
      getData();
    });

    return unsubscribe;
  }, [navigation]);

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
          <BookingRow item={item} showStatus={true} done={false} props={props} setVisible={setVisible} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader visible={lVisible} />
      <FlatList
        numColumns={1}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListMessage}
      />

      <ConfirmModal visible={visible} setVisible={setVisible} />
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
