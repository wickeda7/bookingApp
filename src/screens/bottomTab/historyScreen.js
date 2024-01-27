import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-root-toast';
import { useTranslation } from 'react-i18next';

const HistoryScreen = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`historyScreen:${key}`);
  }

  const dataList = [
    {
      key: '1',
      image: require('@assets/images/image.png'),
      title: 'The Big Tease Salons',
      description: '6391 Elgin St. Celina, Delaware ',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '2',
      image: require('@assets/images/image2.png'),
      title: 'Ahead of Time',
      description: '3517 W. Gray St. Utica, ',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '3',
      image: require('@assets/images/image3.png'),
      title: 'Salon Iridescent ',
      description: '1901 Thornridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '4',
      image: require('@assets/images/image7.png'),
      title: 'Catchy Hair Salon',
      description: '1901 Thornridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '5',
      image: require('@assets/images/image6.png'),
      title: 'Ahead of Time',
      description: '3517 W. Gray St. Utica, ',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '6',
      image: require('@assets/images/image5.png'),
      title: 'Salon Iridescent ',
      description: '1901 Thornridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
  ];

  const [listData, setListData] = useState(
    dataList.map((historyItem, index) => ({
      key: `${index}`,
      title: historyItem.title,
      image: historyItem.image,
      description: historyItem.description,
      time: historyItem.time,
    }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = (data) => {
    const isEnd = data.item.key == 5;

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
          <Image source={data.item.image} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              marginHorizontal: Default.fixPadding * 1.5,
              backgroundColor: Colors.white,
            }}
          >
            <Text style={Fonts.Primary16Medium}>{data.item.title}</Text>

            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                marginVertical: 3,
              }}
            >
              <Octicons
                name='location'
                size={18}
                color={Colors.grey}
                style={{
                  marginRight: Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              />

              <Text style={{ ...Fonts.Grey14Regular }}>{data.item.description}</Text>
            </View>
            <Text style={Fonts.Black14Medium}>{data.item.time}</Text>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                width: 100,
                marginTop: Default.fixPadding,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
              onPress={() => props.navigation.navigate('StoresStack', { screen: 'historyDetailScreen' })}
            >
              <Text numberOfLines={1} style={Fonts.Primary14Medium}>
                {tr('getDetail')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const title = data.item.title;
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
          deleteRow(rowMap, data.item.key);
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
      {listData.length === 0 ? (
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
          data={listData}
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
