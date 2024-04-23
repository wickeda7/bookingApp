import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, BackHandler, Dimensions, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useStoreContext } from '@contexts/StoreContext';
import { STRAPIURL, GOOGLE_MAPS_APIKEY } from '@env';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SearchLocationScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const {
    store: {
      name,
      address,
      city,
      state,
      zip,
      coordinate,
      logo: { url },
    },
  } = item;
  const image = route.params.image;
  const title = route.params.title;
  const { latitude, longitude } = useStoreContext();
  const _map = useRef(null);
  const { i18n } = useTranslation();
  const [time, setTime] = useState(0);
  const isRtl = i18n.dir() === 'rtl';

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const [coordinates, setCoordinates] = useState([
    {
      latitude,
      longitude,
    },
    coordinate,
  ]);
  const onMapPress = (e) => {
    setCoordinates((prev) => [...prev, e.nativeEvent.coordinate]);
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* <MyStatusBar /> */}

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
        onPress={this.onMapPress}
        ref={_map}
      >
        {coordinates.map((coordinate, index) => {
          <Marker key={`coordinate_${index}`} coordinate={coordinate} />;
        })}
        {coordinates.length >= 2 && (
          <MapViewDirections
            origin={coordinates[0]}
            waypoints={coordinates.length > 2 ? coordinates.slice(1, -1) : undefined}
            destination={coordinates[coordinates.length - 1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor='hotpink'
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={(result) => {
              //console.log(`Distance: ${result.distance} km`);
              //console.log(`Duration: ${Math.round(result.duration)} min.`);
              setTime(Math.round(result.duration));
              _map.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR');
            }}
          />
        )}
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
          source={{ uri: `${url}` }}
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
            {name}
          </Text>
          {/* <Text numberOfLines={1} style={{ ...Fonts.Grey14Medium }}>
            Haircut
          </Text> */}
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
            <Text style={{ ...Fonts.Black14Regular }}>
              {address}, {city}, {state}, {zip}
            </Text>
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
          <Text style={{ ...Fonts.Grey14Medium }}>{time} min </Text>
        </View>
      </View>
    </View>
  );
};
export default SearchLocationScreen;
