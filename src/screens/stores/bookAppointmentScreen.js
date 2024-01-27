import { Text, View, TouchableOpacity, Image, FlatList, BackHandler } from 'react-native';
import { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const BookAppointmentScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`bookAppointmentScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const options = [
    {
      key: '1',
      image: require('@assets/images/img1.png'),
      name: 'Brooklyn Simmons',
      other: 'hair stylist',
    },
    {
      key: '2',
      image: require('@assets/images/img2.png'),
      name: 'Darlene Robertson',
      other: 'haircutting specialist',
    },
    {
      key: '3',
      image: require('@assets/images/img3.png'),
      name: 'Esther Howard',
      other: 'Nail art',
    },
    {
      key: '4',
      image: require('@assets/images/img4.png'),
      name: 'Guy Hawkins',
      other: 'spa specialist',
    },
    {
      key: '5',
      image: require('@assets/images/img5.png'),
      name: 'Jacob Jones',
      other: 'hair stylist',
    },
    {
      key: '6',
      image: require('@assets/images/img6.png'),
      name: 'Theresa Webb',
      other: 'hair stylist',
    },
    {
      key: '7',
      image: require('@assets/images/img1.png'),
      name: 'Ronald Richards',
      other: 'haircutting specialist',
    },
  ];

  const [onSelect, setOnSelect] = useState('Darlene Robertson');

  const statusField = (name) => {
    setOnSelect(name);
  };

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;

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
          statusField(item.name);
        }}
      >
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
          }}
        >
          <Image source={item.image} />
          <View
            style={{
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text style={Fonts.Black16Medium}>{item.name}</Text>
            <Text style={Fonts.Grey14Medium}>{item.other}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              statusField(item.name);
            }}
          >
            <Ionicons
              name={onSelect === item.name ? 'radio-button-on-outline' : 'ellipse-outline'}
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
        <TouchableOpacity style={{ marginHorizontal: Default.fixPadding * 1.5 }} onPress={() => props.navigation.pop()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('selectSpecialists')}</Text>
      </View>

      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        onPress={() => props.navigation.navigate('scheduleScreen')}
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
