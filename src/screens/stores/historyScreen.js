import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-root-toast';
import { useTranslation } from 'react-i18next';
import { useBookingContext } from '@contexts/BookingContext';
import Loader from '@components/loader';
import BookingRow from '@components/user/bookingRow';

const HistoryScreen = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const { getUserBooking, deleteHistory } = useBookingContext();
  const { navigation, route } = props;
  function tr(key) {
    return t(`historyScreen:${key}`);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getData = async () => {
        setVisible(true);
        let res = await getUserBooking(true, 'user');
        res = res.map((item, index) => {
          return { ...item, key: `${index}` };
        });
        setData(res);
        setVisible(false);
      };
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap, rowKey, id) => {
    closeRow(rowMap, rowKey);
    const newData = [...data];
    const prevIndex = data.findIndex((item) => item.key === rowKey);
    const res = await deleteHistory(id);
    if (res) {
      newData.splice(prevIndex, 1);
      setData(newData);
    }
  };

  const renderItem = ({ item, index }) => {
    const isEnd = index === data.length - 1 || index === data.length - 2;

    return (
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 10,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          marginHorizontal: Default.fixPadding * 1.5,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            backgroundColor: Colors.white,
          }}
        >
          <BookingRow item={item} showStatus={false} done={true} props={props} />
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const title = data.item.store.name;
    var result = title + tr('remove');

    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          marginTop: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 2,
          width: '15%',
          height: 140,
          borderRadius: 10,
          ...styles.backRightBtnRight,
        }}
        onPress={() => {
          deleteRow(rowMap, data.item.key, data.item.id);
          Toast.show(result, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }}
      >
        <Ionicons name='trash' size={30} color={Colors.white} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader visible={visible} />
      {data.length === 0 ? (
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
        <SwipeListView
          data={data}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-80}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HistoryScreen;
const styles = StyleSheet.create({
  backRightBtnRight: {
    right: 0,
    backgroundColor: Colors.darkRed,
  },
});
