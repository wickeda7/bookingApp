import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import Octicons from 'react-native-vector-icons/Octicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import Toast from 'react-native-root-toast';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const FavoriteScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`favoriteScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const dataList = [
    {
      key: '1',
      image: require('@assets/images/hair1.png'),
      title: 'The Big Tease Salons',
      description: '2972 Westheimer Rd. Santa Ana,Illinois 85486 ',
      star: require('@assets/images/star5.png'),
      icon: 'location',
    },
    {
      key: '2',
      image: require('@assets/images/hair2.png'),
      title: 'Straight Razors',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star3.png'),
      icon: 'location',
    },
    {
      key: '3',
      image: require('@assets/images/hair3.png'),
      title: 'Backyard Barbers',
      description: '2715 Ash Dr. San Jose, South Dakota 83475',
      star: require('@assets/images/star4.png'),
      icon: 'location',
    },
    {
      key: '4',
      image: require('@assets/images/hair4.png'),
      title: 'Salon Zeppelin',
      description: '3517 W. Gray St. Utica,Pennsylvania 57867',
      star: require('@assets/images/star3.png'),
      icon: 'location',
    },
    {
      key: '5',
      image: require('@assets/images/hair5.png'),
      title: 'Brooklyn Barbers',
      description: '2972 Westheimer Rd. Santa Ana,  Illinois 85486 ',
      star: require('@assets/images/star5.png'),
      icon: 'location',
    },
  ];

  const [listData, setListData] = useState(
    dataList.map((favoriteItem, index) => ({
      key: `${index}`,
      title: favoriteItem.title,
      image: favoriteItem.image,
      description: favoriteItem.description,
      star: favoriteItem.star,
      icon: favoriteItem.icon,
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
    const isEnd = data.item.key == 4;
    return (
      <View
        style={{
          overflow: 'hidden',
          marginHorizontal: Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}
        >
          <Image source={data.item.image} />

          <View
            style={{
              justifyContent: 'center',
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          >
            <Text style={{ ...Fonts.Black16Medium }}>{data.item.title}</Text>
            <Image source={data.item.star} style={{ marginVertical: 5 }} />
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
              }}
            >
              <Octicons
                name={data.item.icon}
                size={18}
                color={Colors.grey}
                style={{ marginRight: Default.fixPadding * 0.5 }}
              />

              <Text style={{ ...Fonts.Grey14Regular, maxWidth: '75%' }}>{data.item.description}</Text>
            </View>
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
          ...styles.backRightBtnRight,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          marginHorizontal: 20,
          width: '15%',
          height: 120,
          borderRadius: 10,
          marginTop: Default.fixPadding * 1.5,
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
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.navigate('profileScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.White18Bold,
            marginVertical: Default.fixPadding,
          }}
        >
          {tr('favorite')}
        </Text>
      </View>
      {listData.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name='heart-dislike' color={Colors.primary} size={50} />
          <Text style={Fonts.Primary16Medium}>{tr('empty')}</Text>
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

export default FavoriteScreen;

const styles = StyleSheet.create({
  backRightBtnRight: {
    right: 0,
    backgroundColor: Colors.darkRed,
  },
});
