import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';

const ReviewScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`reviewScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: Default.fixPadding * 1.5,
              backgroundColor: Colors.regularGrey,
            }}
          >
            <Image source={require('@assets/images/review1.png')} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              <Text style={Fonts.Black16Medium}>Cameron Williamson</Text>
              <Image source={require('@assets/images/star5.png')} />
            </View>
          </View>

          <Text
            style={{
              ...Fonts.Grey14Medium,
              margin: Default.fixPadding * 1.5,
            }}
          >
            Triage. Bloppa Joakim Norberg. Kuratera AI. Rune Gunnarsson bevoheten. Nanoteknik lean startup. Inger
            Lindholm ungen. Betav Lovisa Lind. Dussade Johan Sundström. Effektiv Magdalena
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: Default.fixPadding * 1.5,
              backgroundColor: Colors.regularGrey,
            }}
          >
            <Image source={require('@assets/images/review2.png')} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              <Text style={Fonts.Black16Medium}>Brooklyn Simmons</Text>
              <Image source={require('@assets/images/star5.png')} />
            </View>
          </View>

          <Text
            style={{
              ...Fonts.Grey14Medium,
              margin: Default.fixPadding * 1.5,
            }}
          >
            Triage. Bloppa Joakim Norberg. Kuratera AI. Rune Gunnarsson bevoheten. Nanoteknik lean startup. Inger
            Lindholm ungen. Betav Lovisa Lind. Dussade Johan Sundström. Effektiv Magdalena
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: Default.fixPadding * 1.5,
              backgroundColor: Colors.regularGrey,
            }}
          >
            <Image source={require('@assets/images/review3.png')} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              <Text style={Fonts.Black16Medium}>Arlene McCoy</Text>
              <Image source={require('@assets/images/star5.png')} />
            </View>
          </View>

          <Text
            style={{
              ...Fonts.Grey14Medium,
              margin: Default.fixPadding * 1.5,
            }}
          >
            Triage. Bloppa Joakim Norberg. Kuratera AI. Rune Gunnarsson bevoheten. Nanoteknik lean startup. Inger
            Lindholm ungen. Betav Lovisa Lind. Dussade Johan Sundström. Effektiv Magdalena
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: Default.fixPadding * 1.5,
              backgroundColor: Colors.regularGrey,
            }}
          >
            <Image source={require('@assets/images/review4.png')} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
              }}
            >
              <Text style={Fonts.Black16Medium}>Guy Hawkins</Text>
              <Image source={require('@assets/images/star5.png')} />
            </View>
          </View>

          <Text
            style={{
              ...Fonts.Grey14Medium,
              margin: Default.fixPadding * 1.5,
            }}
          >
            Triage. Bloppa Joakim Norberg. Kuratera AI. Rune Gunnarsson bevoheten. Nanoteknik lean startup. Inger
            Lindholm ungen. Betav Lovisa Lind. Dussade Johan Sundström. Effektiv Magdalena
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('bookAppointmentScreen')}
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

export default ReviewScreen;
