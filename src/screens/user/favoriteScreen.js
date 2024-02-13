import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import Octicons from 'react-native-vector-icons/Octicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import Toast from 'react-native-root-toast';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
import { useStoreContext } from '@contexts/StoreContext';
import { STRAPIURL } from '@env';
const FavoriteScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`favoriteScreen:${key}`);
  }
  const { userData } = useAuthContext();
  const { onFavorite } = useStoreContext();
  const favorites = userData?.favorites;
  const [data, setData] = useState([]);
  useEffect(() => {
    const res = favorites.map((item, index) => {
      return { ...item, key: `${index}` };
    });
    setData(res);
  }, [favorites]);
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap, row) => {
    closeRow(rowMap, row.key);
    const newData = [...data];
    const prevIndex = data.findIndex((item) => item.key === row.key);
    const res = onFavorite(row);
    if (res) {
      newData.splice(prevIndex, 1);
      setData(newData);
    }
  };

  const renderItem = ({ item, index }) => {
    if (!item.star) item.star = require('@assets/images/star5.png');
    const isEnd = index === data.length - 1 || index === data.length - 2;
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
          <Image source={{ uri: `${STRAPIURL}${item.logo.url}` }} style={{ width: 131, height: 123 }} />

          <View
            style={{
              justifyContent: 'center',
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          >
            <Text style={{ ...Fonts.Black16Medium }}>{item.name}</Text>
            <Image source={item.star} style={{ marginVertical: 5 }} />
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
              }}
            >
              <Octicons
                name='location'
                size={18}
                color={Colors.grey}
                style={{ marginRight: Default.fixPadding * 0.5 }}
              />

              <Text style={{ ...Fonts.Grey14Regular, maxWidth: '75%' }}>
                {item.address} {item.city} {item.state} {item.zip}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const title = data.item.name;
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
          deleteRow(rowMap, data.item);
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
      {data.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name='heart-dislike' color={Colors.primary} size={50} />
          <Text style={Fonts.Primary16Medium}>{tr('empty')}</Text>
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

export default FavoriteScreen;

const styles = StyleSheet.create({
  backRightBtnRight: {
    right: 0,
    backgroundColor: Colors.darkRed,
  },
});
