import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, Animated, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
//import { markers } from '@components/mapData';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { getStores, getStoreRelation } from '@redux/actions/storesAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '@contexts/AuthContext';
import Loader from '@components/loader';
const { width } = Dimensions.get('window');
const CARD_HEIGHT = 120;
const CARD_WIDTH = width * 0.8;

const NearByScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  const { county, isLoading, stores, latitude, longitude } = useSelector((state) => state.stores);
  console.log('stores', county, isLoading, stores, latitude, longitude);
  const { userData } = useAuthContext();
  const dispatch = useDispatch();

  function tr(key) {
    return t(`nearByScreen:${key}`);
  }

  const [search, setSearch] = useState();
  const [initialMapState, setInitialMapState] = useState(null);
  const [interpolations, setInterpolations] = useState(null);

  useEffect(() => {
    const type = 'nail';
    dispatch(getStores({ favorites: userData?.favorites, county, type }));
  }, []);

  useEffect(() => {
    if (!stores) return;
    const tempMapState = {
      stores,
      region: {
        latitude,
        longitude,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
    setInitialMapState(tempMapState);
  }, [stores]);

  useEffect(() => {
    if (!initialMapState) return;
    const temp = initialMapState.stores.map((marker, index) => {
      const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: 'clamp',
      });

      return { scale };
    });
    setInterpolations(temp);
  }, [initialMapState]);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= initialMapState.stores.length) {
        index = initialMapState.stores.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = initialMapState.stores[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: initialMapState.region.latitudeDelta,
              longitudeDelta: initialMapState.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };
  const handleSelectedStore = (store) => {
    dispatch(getStoreRelation({ storeId: store.id }));
    props.navigation.navigate('TopTabDetails', { screen: 'nearby' });
  };
  const _map = useRef(null);
  const _scrollView = useRef(null);
  if (!interpolations) return <Loader visible={true} />;
  if (isLoading) return <Loader visible={true} />;
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          height: 150,
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.White20Bold }}>{tr('nearByYou')}</Text>
          <Text style={{ ...Fonts.White16Medium }}>{tr('nearestSalon')}</Text>
        </View>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Ionicons name='search-outline' size={20} color={Colors.grey} style={{ flex: 0.8, alignSelf: 'center' }} />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder={tr('search')}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              ...Fonts.Black16Medium,
              flex: 8.4,
              textAlign: isRtl ? 'right' : 'left',
              alignSelf: 'center',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
          <Ionicons
            name='mic-outline'
            size={20}
            color={Colors.grey}
            style={{
              flex: 0.8,
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
      <MapView ref={_map} initialRegion={initialMapState.region} style={{ flex: 1 }} provider={PROVIDER_GOOGLE}>
        {initialMapState.stores.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
              <Animated.View>
                <Animated.Image
                  source={require('@assets/images/map.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode='cover'
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment='center'
        style={styles.scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginHorizontal: 10,
          }}
        >
          {initialMapState.stores.map((marker, index) => (
            <TouchableOpacity
              key={index}
              //  onPress={() => props.navigation.navigate('TopTabDetails', { screen: 'nearby' })}
              onPress={() => handleSelectedStore(marker)}
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                overflow: 'hidden',
                alignItems: 'center',
                height: CARD_HEIGHT,
                width: CARD_WIDTH,
                padding: Default.fixPadding * 1.5,
                marginHorizontal: Default.fixPadding,
                marginBottom: Default.fixPadding,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              {marker.image ? (
                <Image source={marker.image} />
              ) : (
                <Image source={{ uri: marker.logo }} style={{ width: 98, height: 94 }} />
              )}

              <View
                style={{
                  alignItems: isRtl ? 'flex-end' : 'flex-start',
                  marginHorizontal: Default.fixPadding * 1.5,
                }}
              >
                <Text style={{ ...Fonts.Primary16Bold }}>{marker.name}</Text>
                <Text style={{ ...Fonts.Grey14Medium }}>{marker.description}</Text>
                <Image source={require('@assets/images/star4.png')} />
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
                  <Text style={{ ...Fonts.Black14Regular, maxWidth: '80%' }}>{marker.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default NearByScreen;

const styles = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: Default.fixPadding,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
