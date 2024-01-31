import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, BackHandler, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Default, Fonts } from '@constants/style';
import Octicons from 'react-native-vector-icons/Octicons';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const SpecialistProfileScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`specialistProfileScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [isVisible, setVisible] = useState(false);
  const PhotoData = [
    {
      key: '1',
      image: require('@assets/images/photo1.png'),
    },
    {
      key: '2',
      image: require('@assets/images/photo2.png'),
    },
    {
      key: '3',
      image: require('@assets/images/photo3.png'),
    },
    {
      key: '4',
      image: require('@assets/images/photo4.png'),
    },
    {
      key: '5',
      image: require('@assets/images/photo5.png'),
    },
    {
      key: '6',
      image: require('@assets/images/photo6.png'),
    },
    {
      key: '7',
      image: require('@assets/images/photo7.png'),
    },
  ];

  const renderItemPhoto = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View
        style={{
          paddingBottom: Default.fixPadding * 1.5,
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
        }}
      >
        <Image source={item.image} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <MyStatusBar /> */}
      <Image source={require('@assets/images/sProfile.png')} />

      <View
        style={{
          position: 'absolute',
          flexDirection: isRtl ? 'row-reverse' : 'row',
          paddingHorizontal: Default.fixPadding * 1.5,
          paddingTop: 35,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('TopTabDetails', { screen: 'informationScreen' });
            //props.navigation.goBack()
          }}
          style={{ flex: 1, alignItems: isRtl ? 'flex-end' : 'flex-start' }}
        >
          <Ionicons
            name={isRtl ? 'arrow-forward' : 'arrow-back-outline'}
            size={30}
            style={{
              color: Colors.white,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible((preState) => !preState)}
          style={{
            flex: 1,
            alignItems: isRtl ? 'flex-start' : 'flex-end',
          }}
        >
          <Ionicons
            name={isVisible ? 'heart-outline' : 'heart'}
            size={30}
            style={{
              color: Colors.primary,
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding,
          }}
        >
          <View style={{ flex: 7.5 }}>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
              }}
            >
              <Text style={Fonts.Black18Bold}>Kari Alexande</Text>
              <Text style={Fonts.Grey15Bold}>(hair style specialist)</Text>
            </View>
            <Text
              style={{
                ...Fonts.Grey14Medium,
                marginVertical: 2,
                textAlign: isRtl ? 'right' : 'left',
              }}
            >
              6 year experience
            </Text>
            <Image
              source={require('@assets/images/star4.png')}
              style={{
                alignSelf: isRtl ? 'flex-end' : 'flex-start',
                marginVertical: 2,
              }}
            />
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                marginVertical: Default.fixPadding * 0.5,
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
              <Text style={Fonts.Primary14Medium}>4140 Parker Rd. Allentown</Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              flex: 2.5,
            }}
            onPress={() => props.navigation.navigate('mainReviewScreen')}
          >
            <Ionicons
              name='chatbubble-ellipses-outline'
              size={25}
              color={Colors.grey}
              style={{ marginHorizontal: Default.fixPadding * 0.5 }}
            />

            <Text style={{ ...Fonts.Grey14Medium, marginVertical: 2 }}>{tr('review')}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingBottom: Default.fixPadding,
          }}
        >
          <Text style={Fonts.Black16Bold}>{tr('about')}</Text>
          <Text style={Fonts.Grey14Regular}>
            {tr('description')}
            <Text style={Fonts.Primary14Regular}>{tr('readMore')}</Text>
          </Text>
        </View>

        <Text
          style={{
            ...Fonts.Black16Bold,
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingBottom: Default.fixPadding,
          }}
        >
          {tr('photo')}
        </Text>
        <FlatList
          horizontal
          data={PhotoData}
          renderItem={renderItemPhoto}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <View
          style={{
            paddingBottom: Default.fixPadding,
            paddingHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text style={Fonts.Black16Bold}>{tr('workingHour')}</Text>
          <Text
            style={{
              ...Fonts.Grey14Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            9:00 AM - 9:00 PM
          </Text>
        </View>

        <View
          style={{
            paddingBottom: Default.fixPadding,
            paddingHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              justifyContent: 'space-between',
              marginBottom: Default.fixPadding * 0.5,
            }}
          >
            <Text style={Fonts.Black16Bold}>{tr('address')}</Text>
            <Text
              style={{
                ...Fonts.Primary14Regular,
                maxWidth: '45%',
              }}
            >
              4140 Parker Rd. Allentown, New Mexico 31134
            </Text>
          </View>

          <MapView
            style={{ height: 150 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
          </MapView>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('scheduleScreen')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: Default.fixPadding * 1.5,
          backgroundColor: Colors.primary,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('bookAppointment')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SpecialistProfileScreen;
