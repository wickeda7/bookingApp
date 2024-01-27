import { Text, View, ScrollView, TouchableOpacity, Image, Modal, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Default, Colors, Fonts } from '@constants/style';
import Octicons from 'react-native-vector-icons/Octicons';
import DashedLine from 'react-native-dashed-line';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const CouponScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`couponScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [visible, setVisible] = useState(false);
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
        <Text style={Fonts.White18Bold}>{tr('yourCoupons')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginVertical: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: Default.fixPadding,
            }}
          >
            <Image source={require('@assets/images/coupon1.png')} style={{ marginBottom: Default.fixPadding }} />
            <Text style={Fonts.Primary16Medium}>The Studio </Text>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
              }}
            >
              <Octicons
                name='location'
                size={18}
                color={Colors.grey}
                style={{ marginRight: Default.fixPadding * 0.5 }}
              />
              <Text style={Fonts.Grey12Medium}>6391 Elgon St. Celina, </Text>
            </View>
          </View>
          <DashedLine axis='vertical' dashLength={5} dashColor={Colors.lightGrey} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Default.fixPadding,
            }}
          >
            <Text style={Fonts.Primary20Bold}>30% OFF</Text>
            <Text style={Fonts.Primary15Bold}> {tr('onAllHair')}</Text>
            <Text style={Fonts.Grey14Regular}>{tr('couponValid')}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: Default.fixPadding,
            }}
          >
            <Image source={require('@assets/images/coupon2.png')} style={{ marginBottom: Default.fixPadding }} />
            <Text style={Fonts.Primary16Medium}>The bride salon</Text>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
              }}
            >
              <Octicons
                name='location'
                size={18}
                color={Colors.grey}
                style={{ marginRight: Default.fixPadding * 0.5 }}
              />
              <Text style={Fonts.Grey12Medium}>6391 Elgon St. Celina, </Text>
            </View>
          </View>

          <DashedLine axis='vertical' dashLength={5} dashColor={Colors.lightGrey} />

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: Default.fixPadding,
            }}
          >
            <Text style={Fonts.Primary20Bold}>20% OFF</Text>
            <Text style={Fonts.Primary15Bold}> {tr('onHairTreatment')}</Text>
            <Text style={Fonts.Grey14Regular}>{tr('couponValid')}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

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
              width: 300,
              height: 250,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: isRtl ? 'flex-start' : 'flex-end',
                alignItems: isRtl ? 'flex-start' : 'flex-end',
                margin: Default.fixPadding,
              }}
              onPress={() => setVisible(false)}
            >
              <Ionicons name='close' size={25} color={Colors.grey} />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: Default.fixPadding * 1.5,
              }}
            >
              <Text
                style={{
                  ...Fonts.Primary18Bold,
                  marginVertical: Default.fixPadding,
                }}
              >
                {tr('getDiscount')}
              </Text>
              <Text
                style={{
                  ...Fonts.ExtraLightGrey16Medium,
                  textAlign: 'center',
                }}
              >
                {tr('congratulation')}
              </Text>
              <Text
                style={{
                  ...Fonts.ExtraLightGrey16Medium,
                  textAlign: 'center',
                }}
              >
                {tr('valid')}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.pop();
                  setVisible(false);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: Default.fixPadding * 8,
                  paddingVertical: Default.fixPadding,
                  marginVertical: Default.fixPadding * 3,
                  borderRadius: 10,
                  backgroundColor: Colors.primary,
                  ...Default.shadow,
                }}
              >
                <Text style={Fonts.White18SemiBold}>{tr('apply')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CouponScreen;
