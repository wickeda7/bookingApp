import { Text, View, TouchableOpacity, Image, FlatList, BackHandler } from 'react-native';
import { useEffect, useState } from 'react';
import { Colors, Default, Fonts, DefaultImage } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useStoreContext } from '@contexts/StoreContext';
import { useBookingContext } from '@contexts/BookingContext';
import { Avatar } from 'react-native-paper';
import { STRAPIURL } from '@env';
import { options1 } from '@api/tempData';
import Loader from '@components/loader';

const BookAppointmentScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  const {
    selectedStore: { employee },
  } = useStoreContext();

  const { selectedSpecialist, setSelectedSpecialist, getSpecialistBooking } = useBookingContext();

  const options = [...employee, ...options1];
  const [visible, setVisible] = useState(false);

  function tr(key) {
    return t(`bookAppointmentScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  const getBookAppointment = async () => {
    setVisible(true);
    const res = await getSpecialistBooking(employee);
    if (res) setVisible(false);
  };
  useEffect(() => {
    getBookAppointment();
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    const image = item.userInfo?.profileImg?.url ? item.userInfo.profileImg.url : DefaultImage;
    return (
      <TouchableOpacity
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 1.5,
        }}
        onPress={() => {
          setSelectedSpecialist(item);
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
          }}
        >
          {item.image ? (
            <Image source={item.image} />
          ) : (
            <Avatar.Image
              size={54}
              source={{
                uri: `${image}`,
              }}
            />
          )}

          <View
            style={{
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text style={Fonts.Black16Medium}>
              {' '}
              {item.userInfo.firstName} {item.userInfo.lastName}
            </Text>
            {item.other ? (
              <Text style={Fonts.Grey14Medium}>{item.other}</Text>
            ) : (
              <Text style={Fonts.Grey14Medium}>{item?.userInfo?.specialty}</Text>
            )}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedSpecialist(item);
            }}
          >
            <Ionicons
              name={selectedSpecialist?.id === item.id ? 'radio-button-on-outline' : 'ellipse-outline'}
              size={30}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
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
        <Loader visible={visible} />
        <TouchableOpacity style={{ marginHorizontal: Default.fixPadding * 1.5 }} onPress={() => props.navigation.pop()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('selectSpecialists')} BAS</Text>
      </View>

      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        onPress={() => {
          if (selectedSpecialist) {
            props.navigation.navigate('scheduleScreen');
          }
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.primary,
          ...Default.shadow,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('Continue')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookAppointmentScreen;
