import { Text, View, TouchableOpacity, FlatList, Image, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const CategoriesScreen = ({ navigation, route }) => {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  const title = route.params.title;

  const backAction = () => {
    navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const DATA = [
    {
      id: '1',
      image: require('@assets/images/hair1.png'),
      title: 'The Big Tease Salons',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star5.png'),
      selected: false,
    },
    {
      id: '2',
      image: require('@assets/images/hair2.png'),
      title: 'Straight Razors',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star3.png'),
      selected: false,
    },
    {
      id: '3',
      image: require('@assets/images/hair3.png'),
      title: 'Backyard Barbers',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star4.png'),
      selected: true,
    },
    {
      id: '4',
      image: require('@assets/images/hair4.png'),
      title: 'Salon Zeppelin',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star3.png'),
      selected: false,
    },
    {
      id: '5',
      image: require('@assets/images/hair5.png'),
      title: 'Brooklyn Barbers',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star5.png'),
      selected: false,
    },
    {
      id: '6',
      image: require('@assets/images/hair6.png'),
      title: 'Barber Republic',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star1.png'),
      selected: true,
    },
    {
      id: '7',
      image: require('@assets/images/hair7.png'),
      title: 'Hair salons',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star4.png'),
      selected: false,
    },
    {
      id: '8',
      image: require('@assets/images/hair8.png'),
      title: 'Nail salons',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      description: '3517 W. Gray St. Utica,Pennsylvania 57867',
      star: require('@assets/images/star1.png'),
      selected: false,
    },
    {
      id: '9',
      image: require('@assets/images/hair9.png'),
      title: 'Makeup',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star3.png'),
      selected: false,
    },
    {
      id: '10',
      image: require('@assets/images/hair10.png'),
      title: 'Skin care',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star4.png'),
      selected: false,
    },
  ];

  const [select, setSelect] = useState(DATA);

  const onSelect = (item) => {
    const newItem = select.map((val) => {
      if (val.id === item.id) {
        return { ...val, selected: !val.selected };
      } else {
        return val;
      }
    });
    setSelect(newItem);
  };

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('topTabDetails')}
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
          <Image source={item.image} />

          <View
            style={{
              flex: 8.5,
              justifyContent: 'center',
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <Text style={Fonts.Black16Medium}>{item.title}</Text>
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

              <Text style={{ ...Fonts.Grey14Regular }}>{item.description}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onSelect(item)}>
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
        <Text style={Fonts.White18Bold}>{title} categoriesScreen</Text>
      </View>
      <FlatList
        data={select}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default CategoriesScreen;
