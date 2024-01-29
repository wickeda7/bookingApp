import { Text, View, TouchableOpacity, FlatList, Image, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useStoreContext } from '@contexts/StoreContext';
const CategoriesScreen = ({ navigation, route }) => {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  const title = route.params.title;
  const { setSelectedStore, stores, onFavorite, getStores } = useStoreContext();
  const backAction = () => {
    navigation.pop();
    return true;
  };

  useEffect(() => {
    if (!stores) getStores();
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const handleSelectedStore = (store) => {
    setSelectedStore(store);
    navigation.navigate('TopTabDetails');
  };
  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    if (!item.star) item.star = require('@assets/images/star5.png');
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleSelectedStore(item)}
          style={{
            flex: 1,
            flexDirection: isRtl ? 'row-reverse' : 'row',
            overflow: 'hidden',
            marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
            marginBottom: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          {item.image ? (
            <Image source={item.image} />
          ) : (
            <Image source={{ uri: item.logo }} style={{ width: 131, height: 123 }} />
          )}

          <View
            style={{
              flex: 8.5,
              justifyContent: 'center',
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <Text style={Fonts.Black16Medium}>{item.name}</Text>
            <Image source={item.star} style={{ marginVertical: 3 }} />
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
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

              <Text style={{ ...Fonts.Grey14Regular }}>{item.location}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onFavorite(item)}>
            <Ionicons
              color={Colors.primary}
              size={25}
              name={item.selected ? 'heart' : 'heart-outline'}
              style={{
                flex: 1.5,
                margin: Default.fixPadding * 0.5,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

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
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => navigation.navigate('homeScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{title} </Text>
      </View>
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default CategoriesScreen;
