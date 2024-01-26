import { Text, View, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';

const OngoingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`ongoingScreen:${key}`);
  }

  const [visible, setVisible] = useState(false);

  const dataList = [
    {
      key: '1',
      image: require('@assets/images/image.png'),
      title: 'Salon Iridescent ',
      description: '1901 Trowbridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '2',
      image: require('@assets/images/image1.png'),
      title: 'Salon Iridescent ',
      description: '1901 Trowbridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '3',
      image: require('@assets/images/image2.png'),
      title: 'Salon Iridescent ',
      description: '1901 Trowbridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '4',
      image: require('@assets/images/image3.png'),
      title: 'Salon Iridescent ',
      description: '1901 Trowbridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
    {
      key: '5',
      image: require('@assets/images/image3.png'),
      title: 'Salon Iridescent ',
      description: '1901 Trowbridge Cir. Shiloh,',
      time: '26 June 2022 (9:00AM)',
    },
  ];

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View
        style={{
          overflow: 'hidden',
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate('ongoingDetailScreen')}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            backgroundColor: Colors.white,
          }}
        >
          <Image source={item.image} />
          <View
            style={{
              alignItems: isRtl ? 'flex-end' : 'flex-start',
              justifyContent: 'center',
              margin: Default.fixPadding,
            }}
          >
            <Text style={Fonts.Primary16Medium}>{item.title}</Text>
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
                color={Colors.grey}
                style={{
                  marginRight: Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              />

              <Text style={{ ...Fonts.Grey14Regular }}>{item.description}</Text>
            </View>
            <Text
              style={{
                ...Fonts.Black14Medium,
                marginBottom: Default.fixPadding * 0.5,
              }}
            >
              {item.time}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: Default.fixPadding * 0.5,
                  padding: Default.fixPadding,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
                onPress={() =>
                  props.navigation.navigate('searchLocationScreen', {
                    image: item.image,
                    title: item.title,
                  })
                }
              >
                <Text numberOfLines={1} style={{ ...Fonts.Primary14Medium }}>
                  {tr('getDirection')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setVisible(true)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: Default.fixPadding,
                  marginHorizontal: Default.fixPadding * 0.5,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.Grey14Medium,
                    paddingHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  {tr('cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={1}
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />

      <Modal animationType='fade' transparent={true} visible={visible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 300,
              height: 150,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <View
              style={{
                paddingHorizontal: Default.fixPadding * 1.5,
                paddingVertical: Default.fixPadding,
              }}
            >
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  textAlign: 'center',
                  marginVertical: Default.fixPadding,
                }}
              >
                {tr('areYouSure')}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  justifyContent: 'space-around',
                  marginVertical: Default.fixPadding,
                }}
              >
                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={{
                    alignItems: 'center',
                    paddingVertical: Default.fixPadding,
                    width: '40%',
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                    ...Default.shadow,
                  }}
                >
                  <Text style={Fonts.White14Bold}>{tr('yes')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={{
                    alignItems: 'center',
                    paddingVertical: Default.fixPadding,
                    width: '40%',
                    borderRadius: 10,
                    backgroundColor: Colors.regularGrey,
                    ...Default.shadow,
                  }}
                >
                  <Text style={Fonts.Primary16Bold}>{tr('no')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OngoingScreen;
