import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, BackHandler, StatusBar } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const SearchLocationScreen = ({ navigation, route }) => {
  const image = route.params.image;
  const title = route.params.title;

  const { i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [coordinates] = useState([
    {
      latitude: 37.363631,
      longitude: -122.182545,
    },
    {
      latitude: 37.4636,
      longitude: -122.4286,
    },
  ]);
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* <MyStatusBar /> */}

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.363631,
          longitude: -122.182545,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        <Marker coordinate={coordinates[0]} pinColor={Colors.primary} />
        <Marker coordinate={coordinates[1]} pinColor={Colors.primary} />
        <Polyline coordinates={coordinates} strokeColor={Colors.primary} strokeWidth={10} />
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: isRtl ? 'flex-end' : 'flex-start',
          top: 35,
          left: 10,
          zIndex: 1,
        }}
        onPress={() => navigation.pop()}
      >
        <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.black} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 0,
          width: 370,
          borderRadius: 10,
          marginBottom: Default.fixPadding * 2,
          padding: Default.fixPadding,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Image
          source={image}
          style={{
            height: 100,
            width: 100,
            borderRadius: 10,
          }}
        />

        <View
          style={{
            flex: 7,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Primary16Bold }}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.Grey14Medium }}>
            Haircut
          </Text>
          <Image source={require('@assets/images/star4.png')} style={{ marginVertical: Default.fixPadding * 0.5 }} />
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <Octicons
              name='location'
              size={18}
              color={Colors.black}
              style={{
                marginRight: Default.fixPadding * 0.5,
                marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
              }}
            />
            <Text style={{ ...Fonts.Black14Regular }}>8502 Preston Rd. Inglewood</Text>
          </View>
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignSelf: 'flex-start',
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Ionicons name='time-outline' size={20} color={Colors.grey} />
          <Text style={{ ...Fonts.Grey14Medium }}>15 min </Text>
        </View>
      </View>
    </View>
  );
};
export default SearchLocationScreen;
