import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  TextInput,
  Animated,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import React, { useEffect, useState, useRef } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import DashedLine from 'react-native-dashed-line';
import Stars from 'react-native-stars';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const ModalReview = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View style={[styles.modalReview, { transform: [{ scale: scaleValue }] }]}>{children}</Animated.View>
      </View>
    </Modal>
  );
};

const HistoryDetailScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`historyDetailScreen:${key}`);
  }

  const [visible, setVisible] = useState(false);
  const [text, onChangeText] = useState();

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
        <Text style={{ ...Fonts.White18Bold, marginVertical: 10 }}>The big tease salon</Text>
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
                  style={{ marginRight: Default.fixPadding * 0.5 }}
                />
                <Text style={{ ...Fonts.ExtraLightGrey14Medium, maxWidth: '80%' }}>
                  2413 Ash Dr. San Jose, South Dakota 83475
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
              borderLeftWidth: 2,
              borderLeftColor: Colors.lightGrey,
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
            textAlign: isRtl ? 'right' : 'left',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          Darlene Robertson
        </Text>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            textAlign: isRtl ? 'right' : 'left',
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          (haircutting specialist)
        </Text>

        <DashedLine dashLength={5} dashColor={Colors.extraLightGrey} style={{ marginTop: Default.fixPadding }} />

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
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
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
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
          <Text style={Fonts.Black16Medium}>{tr('totalPay')}</Text>
          <Text style={Fonts.Primary16Medium}>$70</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding,
          borderRadius: 10,
          backgroundColor: Colors.primary,
          ...Default.shadow,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('giveRate')}</Text>
      </TouchableOpacity>

      <ModalReview visible={visible}>
        <TouchableOpacity
          style={{
            alignItems: isRtl ? 'flex-start' : 'flex-end',
            justifyContent: 'flex-end',
            marginHorizontal: Default.fixPadding,
          }}
          onPress={() => setVisible(false)}
        >
          <Ionicons name='close' size={25} color={Colors.grey} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={Fonts.Black16Bold}>{tr('yourReview')}</Text>
          <Text style={Fonts.Grey14Medium}>{tr('aboutSalon')}</Text>

          <Stars
            default={5}
            count={5}
            starSize={50}
            fullStar={<Ionicons name={'star'} size={40} color={Colors.primary} />}
            emptyStar={<Ionicons name={'star'} size={40} color={Colors.grey} />}
          />

          <TextInput
            textAlignVertical='top'
            multiline={true}
            numberOfLines={5}
            placeholder={tr('saySomething')}
            placeholderTextColor={Fonts.Black16Medium}
            onChangeText={onChangeText}
            value={text}
            showsVerticalScrollIndicator={false}
            selectionColor={Colors.primary}
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              marginHorizontal: Default.fixPadding,
              marginVertical: Default.fixPadding,
              width: '90%',
              padding: Default.fixPadding,
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
          <TouchableOpacity style={{ marginVertical: Default.fixPadding * 0.5 }} onPress={() => setVisible(false)}>
            <Text style={Fonts.Primary18Bold}>{tr('submit')}</Text>
          </TouchableOpacity>
        </View>
      </ModalReview>
    </View>
  );
};

export default HistoryDetailScreen;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalReview: {
    width: '85%',
    backgroundColor: Colors.white,
    padding: Default.fixPadding,
    borderRadius: 20,
    elevation: 20,
  },
});
