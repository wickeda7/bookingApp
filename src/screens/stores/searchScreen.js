import { Text, View, TextInput, TouchableOpacity, FlatList, Image, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useTranslation } from 'react-i18next';
import FilterBottomSheet from '@components/filterBottomSheet';
import MyStatusBar from '@components/myStatusBar';

const SearchScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`searchScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [visible, setVisible] = useState(false);

  const toggleClose = () => {
    setVisible(!visible);
  };

  const dataList = [
    {
      id: '1',
      image: require('@assets/images/hair1.png'),
      title: 'The Big Tease Salons',
      description: '2972 Westheimer Rd. Santa Ana,Illinois 85486 ',
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
      description: '2972 Westheimer Rd. Santa Ana,  Illinois 85486 ',
      star: require('@assets/images/star4.png'),
      selected: true,
    },
    {
      id: '4',
      image: require('@assets/images/hair4.png'),
      title: 'Salon Zeppelin',
      description: '2972 Westheimer Rd. Santa Ana,  Illinois 85486 ',
      star: require('@assets/images/star3.png'),
      selected: false,
    },
    {
      id: '5',
      image: require('@assets/images/hair5.png'),
      title: 'Brooklyn Barbers',
      description: '2972 Westheimer Rd. Santa Ana,  Illinois 85486 ',
      star: require('@assets/images/star5.png'),
      selected: false,
    },
    {
      id: '6',
      image: require('@assets/images/hair6.png'),
      title: 'Barber Republic',
      description: '1901 Thornridge Cir. Shiloh,Hawaii 81063 ',
      star: require('@assets/images/star1.png'),
      selected: false,
    },
    {
      id: '7',
      image: require('@assets/images/hair7.png'),
      title: 'Hair salons',
      description: '2972 Westheimer Rd. Santa Ana,  Illinois 85486 ',
      star: require('@assets/images/star4.png'),
      selected: false,
    },
    {
      id: '8',
      image: require('@assets/images/hair8.png'),
      title: 'Nail salons',
      description: '2972 Westheimer Rd. Santa Ana,  Illinois 85486 ',
      star: require('@assets/images/star1.png'),
      selected: false,
    },
    {
      id: '9',
      image: require('@assets/images/hair9.png'),
      title: 'Makeup',
      description: '2972 Westheimer Rd. Santa Ana,  Illinois 85486 ',
      star: require('@assets/images/star3.png'),
      selected: true,
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

  const [search, setSearch] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState(dataList);

  const onSelect = (item) => {
    const newItem = filteredDataSource.map((val) => {
      if (val.id === item.id) {
        return { ...val, selected: !val.selected };
      } else {
        return val;
      }
    });
    setFilteredDataSource(newItem);
  };

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TopTabDetails')}
          style={{
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
            <Image source={item.star} style={{ marginVertical: Default.fixPadding * 0.5 }} />
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
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

              <Text
                style={{
                  ...Fonts.Grey14Regular,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.description}
              </Text>
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

  const searchFilter = (text) => {
    if (text) {
      const newData = dataList.filter(function (item) {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(dataList);
      setSearch(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={() => props.navigation.navigate('homeScreen')}>
            <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
          </TouchableOpacity>
          <Text style={{ ...Fonts.White18Bold, flex: 8 }}>{tr('search')}</Text>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                width: 30,
                borderRadius: 15,
                backgroundColor: Colors.white,
              }}
            >
              <Ionicons name='filter' size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Ionicons name='search-outline' size={20} color={Colors.grey} style={{ flex: 0.8, alignSelf: 'center' }} />
          <TextInput
            value={search}
            onChangeText={(text) => searchFilter(text)}
            placeholder={tr('searchYour')}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              ...Fonts.Black16Medium,
              flex: 8.4,
              textAlign: isRtl ? 'right' : 'left',
              alignSelf: 'center',
              marginHorizontal: 5,
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

      <FlatList
        numColumns={1}
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <FilterBottomSheet
        visible={visible}
        toggleClose={toggleClose}
        close={() => {
          setVisible(false);
        }}
      />
    </View>
  );
};

export default SearchScreen;
