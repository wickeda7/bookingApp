import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useStoreContext } from '@contexts/StoreContext';
import * as Location from 'expo-location';

const UserHome = ({ props }) => {
  const { setCounty, setLatitude, setLongitude } = useStoreContext();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      if (coords) {
        const { latitude, longitude } = coords;
        setLongitude(longitude);
        setLatitude(latitude);
        Location.reverseGeocodeAsync({
          latitude,
          longitude,
        })
          .then((res) => {
            let county = res[0].subregion;
            setCounty(county);
          })
          .catch((e) => console.log(e));
      }
    })();
  }, []);
  const dataList = [
    {
      key: '1',
      image: require('@assets/images/saloon.png'),
      title: 'Hair salons',
    },
    {
      key: '2',
      image: require('@assets/images/nail.png'),
      title: 'Nail salons',
    },
    {
      key: '3',
      image: require('@assets/images/makeup.png'),
      title: 'Makeup',
    },
    {
      key: '4',
      image: require('@assets/images/massage.png'),
      title: 'Skin care',
    },
    {
      key: '5',
      image: require('@assets/images/treatment.png'),
      title: 'Spa',
    },
    {
      key: '6',
      image: require('@assets/images/facial.png'),
      title: 'Body beauty',
    },
  ];

  const renderItem = ({ item, index }) => {
    const isEnd = index === dataList.length - 1 || index === dataList.length - 2;
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('StoresStack', {
            screen: 'categoriesScreen',
            params: { title: item.title },
          })
        }
        style={{
          flex: 1,
          overflow: 'hidden',
          alignItems: 'center',
          marginLeft: Default.fixPadding * 1.5,
          marginRight: index % 2 === 0 ? 0 : Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          padding: Default.fixPadding,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.primary,
          backgroundColor: Colors.white,
          ...Default.shadowPrimary,
        }}
      >
        <Image source={item.image} style={{ marginVertical: Default.fixPadding, resizeMode: 'cover' }} />
        <Text
          style={{
            ...Fonts.Primary18Medium,
            marginVertical: Default.fixPadding,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          paddingVertical: 0,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('StoresStack', { screen: 'searchScreen' })}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            padding: Default.fixPadding * 1.3,
            marginVertical: 10,
            marginHorizontal: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Ionicons name='search-outline' size={20} color={Colors.grey} style={{ flex: 0.8, alignSelf: 'center' }} />
          <Text
            style={{
              ...Fonts.Grey16Medium,
              flex: 8.4,
              textAlign: isRtl ? 'right' : 'left',
              alignSelf: 'center',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          >
            {tr('search')}
          </Text>
          <Ionicons
            name='mic-outline'
            size={20}
            color={Colors.grey}
            style={{
              flex: 0.8,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          ...Fonts.Primary22Medium,
          textAlign: 'center',
          marginTop: Default.fixPadding,
        }}
      >
        {tr('welcome')}
      </Text>
      <Text
        style={{
          ...Fonts.Primary22Medium,
          textAlign: 'center',
          marginVertical: Default.fixPadding * 0.5,
        }}
      >
        {tr('lookingFor')}
      </Text>
      <FlatList
        numColumns={2}
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default UserHome;
