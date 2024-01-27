import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const ServiceScreen = (props) => {
  const { t, i18n } = useTranslation();
  let screen = props.route.params?.screen ? props.route.params?.screen : '';

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`serviceScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const hairCutOptions = [
    {
      key: '1',
      text: 'Long hair cut',
      other: '$50',
    },
    {
      key: '2',
      text: 'Medium hair cut',
      other: '$40',
    },
    {
      key: '3',
      text: 'Short hair cut',
      other: '$25',
    },
    {
      key: '4',
      text: 'Kids hair cut',
      other: '$25',
    },
  ];

  const treatmentOptions = [
    {
      key: '1',
      text: 'Easilenghts extensions',
      other: '$50',
    },
    {
      key: '2',
      text: 'Scalp treatment',
      other: '$40',
    },
    {
      key: '3',
      text: 'Oil scalp treatment',
      other: '$25',
    },
  ];

  const hairColorOptions = [
    {
      key: '1',
      text: 'Full highlights',
      other: '$50',
    },
    {
      key: '2',
      text: 'Partial highlights',
      other: '$40',
    },
    {
      key: '3',
      text: 'Organic color',
      other: '$25',
    },
  ];

  const otherOptions = [
    {
      key: '1',
      text: 'Nail art',
      other: '$50',
    },
    {
      key: '2',
      text: 'Facial',
      other: '$40',
    },
    {
      key: '3',
      text: 'Wax',
      other: '$25',
    },
  ];

  const [selectedOption, setSelectedOption] = useState('Medium hair cut');

  const statusOption = (text) => {
    setSelectedOption(text);
  };

  const [selectedTreatment, setSelectedTreatment] = useState('Oil scalp treatment');

  const statusTreatment = (text) => {
    setSelectedTreatment(text);
  };

  const [selectedHairColor, setSelectedHairColor] = useState('Full highlights');

  const statusHairColor = (text) => {
    setSelectedHairColor(text);
  };

  const [selectedOther, setSelectedOther] = useState('Facial');

  const statusOther = (text) => {
    setSelectedOther(text);
  };
  const handleAppointment = () => {
    if (screen !== '') {
      props.navigation.navigate('StoresStack', {
        screen: 'bookAppointmentScreen',
      });
    } else {
      props.navigation.navigate('bookAppointmentScreen');
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Default.fixPadding,
            padding: Default.fixPadding,
            backgroundColor: Colors.lightPrimary,
          }}
        >
          <Text style={Fonts.Primary16Bold}>Hair cut</Text>
        </View>

        {hairCutOptions.map((item) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                paddingHorizontal: Default.fixPadding * 1.5,
              }}
              onPress={() => {
                statusOption(item.text);
              }}
              key={item.key}
            >
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.text}
              </Text>
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.other}
              </Text>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    statusOption(item.text);
                  }}
                >
                  <Ionicons
                    name={selectedOption === item.text ? 'radio-button-on-outline' : 'ellipse-outline'}
                    size={30}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: Default.fixPadding,
            backgroundColor: Colors.lightPrimary,
          }}
        >
          <Text style={Fonts.Primary16Bold}>Treatment</Text>
        </View>

        {treatmentOptions.map((item) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                paddingHorizontal: Default.fixPadding * 1.5,
              }}
              onPress={() => {
                statusTreatment(item.text);
              }}
              key={item.key}
            >
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.text}
              </Text>
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.other}
              </Text>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    statusTreatment(item.text);
                  }}
                >
                  <Ionicons
                    name={selectedTreatment === item.text ? 'radio-button-on-outline' : 'ellipse-outline'}
                    size={30}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: Default.fixPadding,
            backgroundColor: Colors.lightPrimary,
          }}
        >
          <Text style={Fonts.Primary16Bold}>Hair Color</Text>
        </View>

        {hairColorOptions.map((item) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                paddingHorizontal: Default.fixPadding * 1.5,
              }}
              onPress={() => {
                statusHairColor(item.text);
              }}
              key={item.key}
            >
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.text}
              </Text>
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.other}
              </Text>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    statusHairColor(item.text);
                  }}
                >
                  <Ionicons
                    name={selectedHairColor === item.text ? 'radio-button-on-outline' : 'ellipse-outline'}
                    size={30}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: Default.fixPadding,
            backgroundColor: Colors.lightPrimary,
          }}
        >
          <Text style={Fonts.Primary16Bold}>{tr('other')}</Text>
        </View>

        {otherOptions.map((item) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                paddingHorizontal: Default.fixPadding * 1.5,
              }}
              onPress={() => {
                statusOther(item.text);
              }}
              key={item.key}
            >
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.text}
              </Text>
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 4,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {item.other}
              </Text>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    statusOther(item.text);
                  }}
                >
                  <Ionicons
                    name={selectedOther === item.text ? 'radio-button-on-outline' : 'ellipse-outline'}
                    size={30}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleAppointment()}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: Default.fixPadding * 1.5,
          backgroundColor: Colors.primary,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('bookAppointment')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceScreen;
