import { Text, View, Animated, Dimensions, TouchableOpacity, Image, BackHandler } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import React, { useState, useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const NotificationScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`notificationScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const notificationList = [
    {
      key: '1',
      title: tr('appointment'),
      description: tr('description1'),
      status: tr('today'),
    },
    {
      key: '2',
      title: tr('remind'),
      description: tr('description2'),
      status: tr('yesterday'),
    },
    {
      key: '3',
      title: tr('booking'),
      description: tr('description2'),
      status: tr('yesterday'),
    },
    {
      key: '4',
      title: tr('appointment'),
      description: tr('description1'),
      status: tr('today'),
    },
    {
      key: '5',
      title: tr('booking'),
      description: tr('description3'),
      status: 'Yesterday',
    },
    {
      key: '6',
      title: tr('appointment'),
      description: tr('description1'),
      status: tr('2minAgo'),
    },
    {
      key: '7',
      title: tr('remind'),
      description: tr('description2'),
      status: tr('yesterday'),
    },
  ];
  const rowTranslateAnimatedValues = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const [listData, setListData] = useState(
    notificationList.map((NotificationItem, i) => ({
      key: `${i}`,
      title: NotificationItem.title,
      description: NotificationItem.description,
      status: NotificationItem.status,
    }))
  );

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get('window').width) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
      });
    }
  };

  const renderItem = (data) => (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: Colors.extraLightGrey,
        padding: Default.fixPadding,
        backgroundColor: Colors.white,
      }}
    >
      <Text style={Fonts.Primary16Medium}>{data.item.title}</Text>
      <Text style={Fonts.Black16Regular}>{data.item.description}</Text>
      <Text style={Fonts.ExtraLightGrey14SemiBold}>{data.item.status}</Text>
    </View>
  );

  const renderHiddenItem = () => <View style={{ backgroundColor: Colors.darkGrey, flex: 1 }}></View>;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding }}
          onPress={() => props.navigation.navigate('homeScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('notification')}</Text>
      </View>
      {listData.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('@assets/images/notification.png')} />
          <Text style={Fonts.Primary16Medium}>No notification yet</Text>
        </View>
      ) : (
        <SwipeListView
          disableRightSwipe
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get('window').width}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
