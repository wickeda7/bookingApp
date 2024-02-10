import { Text, View, TouchableOpacity, Image, StatusBar, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useStoreContext } from '@contexts/StoreContext';
import { STRAPIURL } from '@env';
import { use } from 'i18next';
const DetailScreen = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { selectedStore, onFavorite, getStoreRelation } = useStoreContext();
  const [isVisible, setVisible] = useState(false);
  let topImage = null;
  if (selectedStore?.images) {
    topImage = `${STRAPIURL}${selectedStore.images[0].url}`;
  }
  let name = selectedStore?.name;
  let location = selectedStore?.location;
  function tr(key) {
    return t(`detailScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };

  useEffect(() => {
    if (!selectedStore) return;
    console.log('selectedStore', selectedStore);
    setVisible(selectedStore.selected); /// favorite
    getStoreRelation();
  }, [selectedStore]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const handleFavorite = () => {
    onFavorite(selectedStore);
    setVisible((preState) => !preState);
  };
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      {topImage ? (
        <Image source={{ uri: topImage }} style={{ width: '100%', height: 200 }} />
      ) : (
        <Image source={require('@assets/images/detail.png')} />
      )}

      <View
        style={{
          position: 'absolute',
          flexDirection: isRtl ? 'row-reverse' : 'row',
          paddingTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
          style={{
            alignItems: isRtl ? 'flex-end' : 'flex-start',
          }}
        >
          <Ionicons
            name={isRtl ? 'arrow-forward' : 'arrow-back'}
            size={30}
            style={{
              color: Colors.white,
              marginHorizontal: Default.fixPadding,
              marginVertical: Default.fixPadding,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleFavorite();
          }}
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-start' : 'flex-end',
          }}
        >
          <Ionicons
            name={isVisible ? 'heart' : 'heart-outline'}
            size={30}
            style={{
              color: Colors.primary,
              marginHorizontal: Default.fixPadding,
              marginVertical: Default.fixPadding,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignSelf: isRtl ? 'flex-start' : 'flex-end',
          marginTop: -19,
          paddingHorizontal: Default.fixPadding * 1.5,
          borderTopLeftRadius: isRtl ? 0 : 5,
          borderTopRightRadius: isRtl ? 5 : 0,
          backgroundColor: Colors.lightGreen,
        }}
      >
        <Text style={Fonts.Green14Bold}>{tr('open')}</Text>
      </View>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          padding: Default.fixPadding * 1.5,
        }}
      >
        <View style={{ flex: 7.5, alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
          <Text style={Fonts.Black18Bold}>{name}</Text>
          <Image source={require('@assets/images/star4.png')} style={{ marginVertical: 3 }} />
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <Octicons
              name='location'
              size={18}
              color={Colors.primary}
              style={{
                marginRight: Default.fixPadding * 0.5,
                marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
              }}
            />
            <Text style={Fonts.Primary14Medium}>{location}</Text>
          </View>
        </View>
        <View style={{ flex: 2.5, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <Image source={require('@assets/images/callIcon.png')} />
          <TouchableOpacity onPress={() => props.navigation.navigate('messageScreen')}>
            <Image source={require('@assets/images/chatIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;
