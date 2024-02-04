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
import { ourSpecialistsData, PhotoData } from '@api/tempData';
import { STRAPIURL } from '@env';
import moment from 'moment';
import { formatPhoneNumber } from '@utils/helper';
const InformationScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  let screen = props.route.params?.screen ? props.route.params?.screen : '';
  const selectedStore = props.route.params?.selectedStore ? props.route.params?.selectedStore : '';
  const { about, employee, images, hours, phone, location, latitude, longtitude } = selectedStore;
  let newEmployee = [...employee, ...ourSpecialistsData];
  // var mydate = new Date();
  // var weekDayName = moment(mydate).format('dddd');
  // console.log('images', weekDayName);

  ///ourSpecialistsData
  //const employee = props.route.params?.employee ? props.route.params?.employee : ''; 34.10711972462575, -118.0611798585755
  console.log('InformationScreen ourSpecialistsData', newEmployee);
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

  const renderItemOurSpecialists = ({ item, index }) => {
    const isFirst = index === 0;
    const name = item.name ? item.name : item.firstName;
    const specialty = item.status ? item.status : item.userInfo.specialty;
    //console.log('specialty', `${STRAPIURL}${item.userInfo.profileImg.url}`);
    return (
      <TouchableOpacity
        onPress={() => {
          if (screen !== '') {
            props.navigation.navigate('StoresStack', {
              screen: 'specialistProfileScreen',
              params: {
                employee: item,
              },
            });
          } else {
            props.navigation.navigate('specialistProfileScreen', { employee: item });
          }
        }}
        style={{
          paddingBottom: Default.fixPadding * 1.5,
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
        }}
      >
        {item.image ? (
          <Image source={item.image} />
        ) : (
          <Image source={{ uri: `${STRAPIURL}${item.userInfo.profileImg.url}` }} style={{ width: 72, height: 72 }} />
        )}

        <Text style={{ ...Fonts.Black14Regular, textAlign: 'center' }}>{name}</Text>
        <Text style={{ ...Fonts.Black14Regular, textAlign: 'center' }}>{specialty}</Text>
      </TouchableOpacity>
    );
  };
  const renderItemHours = ({ item, index }) => {
    const totalDays = hours.length;
    const isFirst = index === hours.length - totalDays;
    return (
      <View
        style={{
          paddingBottom: Default.fixPadding * 1.5,
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
        }}
      >
        <View>
          <Text style={{ fontWeight: '600' }}>{item.day}</Text>
        </View>
        <View>
          <Text>{item.hours}</Text>
        </View>
      </View>
    );
  };

  const renderItemPhoto = ({ item, index }) => {
    const totalImg = images.length;
    const isFirst = index === images.length - totalImg;
    return (
      <View
        style={{
          paddingBottom: Default.fixPadding * 1.5,
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
        }}
      >
        <Image source={{ uri: `${STRAPIURL}${item.url}` }} style={{ width: 110, height: 101 }} />
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
            {about.substring(0, 200)}...
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
            data={newEmployee}
            renderItem={renderItemOurSpecialists}
            keyExtractor={(item) => item.id}
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
            data={images}
            renderItem={renderItemPhoto}
            keyExtractor={(item) => item.id}
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
          <FlatList
            horizontal={true}
            data={hours}
            renderItem={renderItemHours}
            keyExtractor={(item) => item.day}
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
              {formatPhoneNumber(phone)}
            </Text>
          </View>
          {/* <View
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
          </View> */}
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
            <Text style={{ ...Fonts.Primary14Regular, maxWidth: '45%' }}>{location}</Text>
          </View>

          <MapView
            style={{ height: 150 }}
            initialRegion={{
              latitude: latitude,
              longitude: longtitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={{ latitude, longitude: longtitude }} />
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
