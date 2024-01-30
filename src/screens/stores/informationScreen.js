import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, { useEffect } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';

const InformationScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  let screen = props.route.params?.screen ? props.route.params?.screen : '';
  console.log('InformationScreen screen', screen);
  function tr(key) {
    return t(`informationScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const ourSpecialistsData = [
    {
      key: '1',
      image: require('@assets/images/pic1.png'),
      name: 'Kari',
      status: 'hair stylist',
    },
    {
      key: '2',
      image: require('@assets/images/pic2.png'),
      name: 'Shawn',
      status: 'nail artiest',
    },
    {
      key: '3',
      image: require('@assets/images/pic3.png'),
      name: 'Mitchell',
      status: 'manger',
    },
    {
      key: '4',
      image: require('@assets/images/pic4.png'),
      name: 'Kari',
      status: 'hair stylistt',
    },
    {
      key: '5',
      image: require('@assets/images/pic5.png'),
      name: 'Shawn',
      status: 'nail artiest',
    },
    {
      key: '6',
      image: require('@assets/images/pic6.png'),
      name: 'Mitchell',
      status: 'manger',
    },
    {
      key: '7',
      image: require('@assets/images/pic4.png'),
      name: 'Kari',
      status: 'hair stylistt',
    },
  ];

  const renderItemOurSpecialists = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => {
          if (screen !== '') {
            props.navigation.navigate('StoresStack', {
              screen: 'specialistProfileScreen',
            });
          } else {
            props.navigation.navigate('specialistProfileScreen');
          }
        }}
        style={{
          paddingBottom: Default.fixPadding * 1.5,
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
        }}
      >
        <Image source={item.image} />

        <Text style={{ ...Fonts.Black14Regular, textAlign: 'center' }}>{item.name}</Text>
        <Text style={{ ...Fonts.Black14Regular, textAlign: 'center' }}>{item.status}</Text>
      </TouchableOpacity>
    );
  };

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
    const isFirst = index === PhotoData.length - 7;
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: Default.fixPadding * 1.5,
            borderBottomWidth: 2,
            borderBottomColor: Colors.lightGrey,
          }}
        >
          <Text style={Fonts.Black16Bold}>{tr('about')}</Text>
          <Text style={Fonts.Grey14Regular}>
            {tr('description')}
            <Text style={Fonts.Primary14Regular}>{tr('readMore')}</Text>
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.lightGrey,
          }}
        >
          <Text
            style={{
              ...Fonts.Black16Bold,
              paddingHorizontal: Default.fixPadding * 1.5,
              paddingVertical: Default.fixPadding,
            }}
          >
            {tr('specialist')}
          </Text>
          <FlatList
            horizontal={true}
            data={ourSpecialistsData}
            renderItem={renderItemOurSpecialists}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.lightGrey,
          }}
        >
          <Text
            style={{
              ...Fonts.Black16Bold,
              paddingHorizontal: Default.fixPadding * 1.5,
              paddingVertical: Default.fixPadding,
            }}
          >
            {tr('photo')}
          </Text>
          <FlatList
            horizontal={true}
            data={PhotoData}
            renderItem={renderItemPhoto}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            padding: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 2,
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
            padding: Default.fixPadding * 1.5,
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 2,
          }}
        >
          <Text style={Fonts.Black16Bold}>{tr('contact')}</Text>
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name='call-outline'
              color={Colors.black}
              size={16}
              style={{ marginRight: Default.fixPadding * 0.5 }}
            />
            <Text
              style={{
                ...Fonts.Black14Medium,
              }}
            >
              (808) 555-0111
            </Text>
          </View>
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name='globe-outline'
              color={Colors.black}
              size={16}
              style={{ marginRight: Default.fixPadding * 0.5 }}
            />
            <Text style={Fonts.Black14Medium}>www.thebigteasesalon.com</Text>
          </View>
        </View>

        <View
          style={{
            padding: Default.fixPadding * 1.5,
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
            <Text style={{ ...Fonts.Primary14Regular, maxWidth: '45%' }}>
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
        onPress={() => {
          if (screen !== '') {
            props.navigation.navigate('StoresStack', {
              screen: 'bookAppointmentScreen',
            });
          } else {
            props.navigation.navigate('bookAppointmentScreen');
          }
        }}
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

export default InformationScreen;
