import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-btr';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const { height, width } = Dimensions.get('window');

const FilterBottomSheet = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`filterBottomSheet:${key}`);
  }

  const optionsCategory = [
    {
      id: '1',
      text: 'Hair cut',
    },
    {
      id: '2',
      text: 'Makeup',
    },
    {
      id: '3',
      text: 'Spa',
    },
    {
      id: '4',
      text: 'Nail',
    },
    {
      id: '5',
      text: 'Body beauty',
    },
    {
      id: '6',
      text: 'Screen care',
    },
    {
      id: '7',
      text: 'Beard',
    },
    {
      id: '8',
      text: 'Hair wash',
    },
    {
      id: '9',
      text: 'Blow dry',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Spa');
  const category = (text) => {
    setSelectedCategory(text);
  };

  const renderItemCategory = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 0.5,
          marginVertical: Default.fixPadding * 0.5,
          borderRadius: 10,
          backgroundColor: selectedCategory === item.text ? Colors.primary : Colors.white,
          ...Default.shadow,
        }}
        onPress={() => {
          category(item.text);
        }}
      >
        <View style={{ marginHorizontal: Default.fixPadding }}>
          <Text style={selectedCategory === item.text ? Fonts.White16Bold : Fonts.Grey16Medium}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const optionsRating = [
    {
      id: '1',
      text: '5',
    },
    {
      id: '2',
      text: '4',
    },
    {
      id: '3',
      text: '3',
    },
    {
      id: '4',
      text: '2',
    },
    {
      id: '5',
      text: '1',
    },
  ];

  const [selectedRating, setSelectedRating] = useState('5');

  const rating = (text) => {
    setSelectedRating(text);
  };

  const renderItemRating = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          rating(item.text);
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 0.5,
          marginVertical: Default.fixPadding * 0.5,
          borderRadius: 10,
          backgroundColor: selectedRating === item.text ? Colors.primary : Colors.white,
          ...Default.shadow,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: Default.fixPadding,
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text style={selectedRating === item.text ? Fonts.White14Bold : Fonts.Grey14Medium}>{item.text}</Text>
          <AntDesign name='staro' size={18} color={selectedRating === item.text ? Colors.white : Colors.grey} />
        </View>
      </TouchableOpacity>
    );
  };

  const [selectedPrice, setSelectedPrice] = useState([0, 100]);

  const onValuesChangePrice = (values) => {
    setSelectedPrice(values);
  };

  const [selectedDistance, setSelectedDistance] = useState([0, 10]);

  const onValuesChangeDistance = (values) => {
    setSelectedDistance(values);
  };

  const CustomMarkerLeft = ({ currentValue }) => {
    return (
      <View>
        <Text
          style={{
            ...Fonts.Grey14Bold,
            position: 'absolute',
            top: Default.fixPadding * 2,
          }}
        >
          {`$${currentValue}`}
        </Text>

        <Image source={require('@assets/images/marker.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
      </View>
    );
  };

  const CustomMarkerRight = ({ currentValue }) => {
    return (
      <View>
        <Text
          style={{
            ...Fonts.Grey14Bold,
            position: 'absolute',
            top: Default.fixPadding * 2,
          }}
        >
          {`$${currentValue}`}
        </Text>

        <Image source={require('@assets/images/marker.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
      </View>
    );
  };

  return (
    <BottomSheet visible={props.visible} onBackButtonPress={props.toggleClose} onBackdropPress={props.toggleClose}>
      <View style={styles.bottomSheetMain}>
        <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <Text
            style={{
              ...Fonts.Black18Bold,
              flex: 9,
              textAlign: 'center',
              margin: Default.fixPadding * 0.5,
            }}
          >
            {tr('filter')}
          </Text>
          <TouchableOpacity
            onPress={props.close}
            style={{
              flex: 1,
              alignItems: 'flex-end',
              margin: Default.fixPadding * 0.5,
            }}
          >
            <Ionicons name='close' size={25} color={Colors.grey} />
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View>
              <View
                style={{
                  paddingHorizontal: Default.fixPadding,
                  paddingVertical: Default.fixPadding,
                  borderBottomWidth: 2,
                  borderBottomColor: Colors.regularGrey,
                }}
              >
                <Text
                  style={{
                    ...Fonts.Black16Bold,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {tr('category')}
                </Text>
                <FlatList
                  numColumns={3}
                  data={optionsCategory}
                  renderItem={renderItemCategory}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <View
                style={{
                  paddingHorizontal: Default.fixPadding,
                  paddingVertical: Default.fixPadding,
                  borderBottomWidth: 2,
                  borderBottomColor: Colors.regularGrey,
                }}
              >
                <Text
                  style={{
                    ...Fonts.Black16Bold,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {tr('ratting')}
                </Text>

                <FlatList
                  numColumns={5}
                  data={optionsRating}
                  renderItem={renderItemRating}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <Text
                style={{
                  ...Fonts.Black16Bold,
                  marginTop: Default.fixPadding,
                  marginHorizontal: Default.fixPadding * 1.5,
                }}
              >
                {tr('price')}
              </Text>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 20,
                }}
              >
                <MultiSlider
                  min={0}
                  max={100}
                  allowOverlap
                  values={selectedPrice}
                  sliderLength={width / 1.18}
                  onValuesChange={onValuesChangePrice}
                  isMarkersSeparated={true}
                  customMarkerLeft={(e) => {
                    return <CustomMarkerLeft currentValue={e.currentValue} />;
                  }}
                  customMarkerRight={(e) => {
                    return <CustomMarkerRight currentValue={e.currentValue} />;
                  }}
                  trackStyle={{
                    height: 8,
                    borderRadius: 8,
                  }}
                  markerOffsetY={3}
                  selectedStyle={{
                    backgroundColor: Colors.primary,
                  }}
                  unselectedStyle={{
                    backgroundColor: Colors.lightGrey,
                  }}
                />
              </View>

              <Text
                style={{
                  ...Fonts.Black16Bold,
                  marginHorizontal: Default.fixPadding * 1.5,
                  marginTop: Default.fixPadding * 3,
                }}
              >
                {tr('distance')}
              </Text>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  marginBottom: 15,
                }}
              >
                <MultiSlider
                  min={0}
                  max={10}
                  allowOverlap
                  values={selectedDistance}
                  sliderLength={width / 1.18}
                  onValuesChange={onValuesChangeDistance}
                  isMarkersSeparated={true}
                  customMarkerLeft={(e) => {
                    return <CustomMarkerLeft currentValue={e.currentValue} />;
                  }}
                  customMarkerRight={(e) => {
                    return <CustomMarkerRight currentValue={e.currentValue} />;
                  }}
                  trackStyle={{
                    height: 8,
                    borderRadius: 8,
                  }}
                  markerOffsetY={3}
                  selectedStyle={{
                    backgroundColor: Colors.primary,
                  }}
                  unselectedStyle={{
                    backgroundColor: Colors.lightGrey,
                  }}
                />
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={props.close}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding,
            paddingVertical: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.primary,
            ...Default.shadow,
          }}
        >
          <Text style={Fonts.White18Bold}>{tr('filter')}</Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: Default.fixPadding,
          }}
        >
          <Text style={Fonts.Primary14Medium}>{tr('reset')}</Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  bottomSheetMain: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: height / 1.2,
    backgroundColor: Colors.white,
  },
});
