import { Text, View, TouchableOpacity, Image, BackHandler, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import React, { useEffect, useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import DashedLine from 'react-native-dashed-line';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const ConfirmationScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`confirmationScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const [text, onChangeText] = useState();

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
        <Text style={Fonts.White18Bold}>{tr('confirmation')}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginVertical: Default.fixPadding * 1.5,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flex: 8.5,
              flexDirection: isRtl ? 'row-reverse' : 'row',
              marginHorizontal: Default.fixPadding * 1.5,
              marginVertical: Default.fixPadding,
            }}
          >
            <Image source={require('@assets/images/confirm.png')} />
            <View
              style={{
                justifyContent: 'center',
                alignItems: isRtl ? 'flex-end' : 'flex-start',
                margin: Default.fixPadding,
              }}
            >
              <Text style={{ ...Fonts.Black18Medium }}>The big tease salon</Text>
              <Image
                source={require('@assets/images/star4.png')}
                style={{ marginVertical: Default.fixPadding * 0.5 }}
              />
              <View
                style={{
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  alignItems: 'center',
                }}
              >
                <Octicons
                  name='location'
                  size={18}
                  color={Colors.extraLightGrey}
                  style={{
                    marginRight: Default.fixPadding * 0.5,
                    marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                  }}
                />
                <Text style={{ ...Fonts.ExtraLightGrey14Medium, maxWidth: '80%' }}>
                  4517 Washington Ave. Manchester, Kentucky 39495
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <Image source={require('@assets/images/callIcon.png')} />

            <TouchableOpacity onPress={() => props.navigation.navigate('messageScreen')}>
              <Image source={require('@assets/images/chatIcon.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginVertical: Default.fixPadding,
          }}
        >
          <View
            style={{
              flex: 2.5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Default.fixPadding,
              borderLeftWidth: isRtl ? 2 : 0,
              borderLeftColor: isRtl ? Colors.lightGrey : null,
            }}
          >
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <Ionicons name='calendar-outline' color={Colors.black} size={20} />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  marginHorizontal: Default.fixPadding * 0.5,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              >
                {tr('date')}
              </Text>
            </View>
            <Text style={Fonts.Grey14Medium}>19 sep 2022</Text>
          </View>

          <View
            style={{
              flex: 3.5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Default.fixPadding,
              borderLeftWidth: 2,
              borderLeftColor: Colors.lightGrey,
            }}
          >
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <Ionicons name='time-outline' color={Colors.black} size={20} />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  marginHorizontal: Default.fixPadding * 0.5,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              >
                {tr('time')}
              </Text>
            </View>
            <Text style={Fonts.Grey14Medium}>10 : 00 - 12: 00 AM</Text>
          </View>

          <View
            style={{
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Default.fixPadding,
              borderLeftWidth: isRtl ? 0 : 2,
              borderLeftColor: isRtl ? null : Colors.lightGrey,
            }}
          >
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <Ionicons name='call-outline' color={Colors.black} size={20} />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  marginHorizontal: Default.fixPadding * 0.5,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              >
                {tr('mobile')}
              </Text>
            </View>
            <Text style={Fonts.Grey14Medium}>+91(124567891)</Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding * 1.5,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <Text style={Fonts.Black16Medium}>{tr('specialist')}</Text>
        </View>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          Darlene Robertson
        </Text>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          (haircutting specialist)
        </Text>

        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <Text style={Fonts.Black16Medium}>{tr('notes')}</Text>
        </View>

        <TextInput
          value={text}
          textAlignVertical='top'
          multiline={true}
          numberOfLines={5}
          placeholder={tr('writeService')}
          placeholderTextColor={Colors.grey}
          onChangeText={onChangeText}
          showsVerticalScrollIndicator={false}
          selectionColor={Colors.primary}
          style={{
            ...Default.shadow,
            ...Fonts.Black16Regular,
            borderRadius: 10,
            backgroundColor: Colors.white,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
            padding: Default.fixPadding,
            textAlign: isRtl ? 'right' : 'left',
          }}
        />

        <DashedLine dashLength={5} dashColor={Colors.extraLightGrey} style={{ marginTop: Default.fixPadding }} />

        <TouchableOpacity
          onPress={() => props.navigation.navigate('couponScreen')}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginVertical: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.extraLightPink,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              padding: Default.fixPadding * 1.6,
              borderTopLeftRadius: isRtl ? 0 : Default.fixPadding,
              borderTopRightRadius: isRtl ? Default.fixPadding : 0,
              borderBottomLeftRadius: isRtl ? 0 : Default.fixPadding,
              borderBottomRightRadius: isRtl ? Default.fixPadding : 0,
              backgroundColor: Colors.primary,
            }}
          >
            <MaterialCommunityIcons name='ticket-confirmation-outline' size={25} color={Colors.white} />
          </View>
          <Text
            style={{
              ...Fonts.Primary16Medium,
              flex: 8,
              padding: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          >
            {tr('CouponCode')}
          </Text>
          <Ionicons
            name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
            size={25}
            color={Colors.primary}
            style={{ flex: 1, padding: Default.fixPadding * 1.5 }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text style={Fonts.Grey16Medium}>Medium hair cut</Text>
          <Text style={Fonts.Grey14Bold}>$40 </Text>
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text style={Fonts.Grey16Medium}>Partial highlight</Text>
          <Text style={Fonts.Grey14Bold}>$40 </Text>
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={Fonts.Grey16Medium}>Coupon</Text>
          <Text style={Fonts.Grey14Bold}>-$10 </Text>
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <Text style={Fonts.Black16Medium}>{tr('total')}</Text>
          <Text style={Fonts.Primary16Medium}>$70</Text>
        </View>
      </ScrollView>

      <View
        style={{
          ...Default.shadow,
          flexDirection: isRtl ? 'row-reverse' : 'row',
          backgroundColor: Colors.white,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.Black16Medium,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            {tr('totalPay')}
          </Text>
          <Text
            style={{
              ...Fonts.Primary22Bold,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginLeft: Default.fixPadding * 0.5,
            }}
          >
            $80
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('paymentMethodScreen')}
          style={{
            backgroundColor: Colors.primary,
            flex: 1,
            padding: Default.fixPadding * 1.5,
            alignItems: 'center',
          }}
        >
          <Text style={Fonts.White18Bold}>{tr('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmationScreen;
