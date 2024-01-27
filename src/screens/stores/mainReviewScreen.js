import { Image, Text, View, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const MainReviewScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`mainReviewScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const dataList = [
    {
      id: '1',
      title: 'Cameron Williamson',
      image: require('@assets/images/review1.png'),
    },
    {
      id: '2',
      title: 'Brooklyn Simmons',
      image: require('@assets/images/review2.png'),
    },
    {
      id: '3',
      title: 'Arlene McCoy',
      image: require('@assets/images/review3.png'),
    },
    {
      id: '4',
      title: 'Guy Hawkins',
      image: require('@assets/images/review4.png'),
    },
    {
      id: '5',
      title: 'Jane Cooper',
      image: require('@assets/images/review5.png'),
    },
    {
      id: '6',
      title: 'Brooklyn Simmons',
      image: require('@assets/images/review6.png'),
    },
  ];

  const renderItem = ({ item, index }) => {
    const isEnd = index === dataList.length - 1;

    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
          marginTop: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            paddingHorizontal: Default.fixPadding,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: Colors.regularGrey,
          }}
        >
          <Image source={item.image} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: isRtl ? 'flex-end' : 'flex-start',
            }}
          >
            <Text style={Fonts.Black16Medium}>{item.title}</Text>
            <Image source={require('@assets/images/star5.png')} />
          </View>
        </View>

        <Text
          style={{
            ...Fonts.Grey14Medium,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          Triage. Bloops Joachim Norbert. Quartern AI. Rune Gunnar's begotten. Nanoteknik lean startup. Inge Windhoek
          nuget. Betas Louisa Lind. Dissuade Johann Sunstroke. Effective Magdalena
        </Text>
      </View>
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
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding }}
          onPress={() => props.navigation.navigate('specialistProfileScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('review')}</Text>
      </View>

      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MainReviewScreen;
