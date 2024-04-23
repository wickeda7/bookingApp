import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  BackHandler,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import React, { useState, useEffect } from 'react';
import DashedLine from 'react-native-dashed-line';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const PaymentMethodScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`paymentMethodScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [textCvv, onChangeTextCvv] = useState();
  const [textValid, onChangeTextValid] = useState();
  const [textEmail, onChangeTextEmail] = useState();

  const [textPin, onChangeTextPin] = useState();

  const listTab = [
    {
      id: '1',
      status: 'Mastercard',
      img: require('@assets/images/Mastercard.png'),
    },
    {
      id: '2',
      status: 'Google pay',
      img: require('@assets/images/GooglePay.png'),
    },
    {
      id: '3',
      status: 'Paypal',
      img: require('@assets/images/PayPal.png'),
    },
    {
      id: '4',
      status: 'Visacard',
      img: require('@assets/images/Visa.png'),
    },
  ];

  const [status, setStatus] = useState('Mastercard');
  const [visible, setVisible] = useState(false);

  const statusField = (status) => {
    setStatus(status);
  };

  const renderItem = ({ item, index }) => {
    const isEnd = index === listTab.length - 1;

    return (
      <TouchableOpacity
        style={[
          Default.shadow,
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: 95,
            width: 110,
            marginLeft: Default.fixPadding * 1.5,
            marginRight: isEnd ? Default.fixPadding * 1.5 : 0,
            borderRadius: 10,
            marginVertical: Default.fixPadding * 1.5,

            backgroundColor: Colors.white,
          },
          status === item.status && styles.btnActive,
        ]}
        onPress={() => statusField(item.status)}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            width: 45,
            borderRadius: 45 / 2,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Image source={item.img} />
        </View>
        <Text
          style={{
            ...Fonts.Black16Medium,
            marginVertical: Default.fixPadding * 0.5,
          }}
        >
          {item.status}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
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
          onPress={() => props.navigation.navigate('confirmationScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('paymentMethod')}</Text>
      </View>
      <FlatList
        horizontal
        data={listTab}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <DashedLine axis='horizontal' dashLength={5} dashColor={Colors.lightGrey} />
      {status === 'Mastercard' ? (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                margin: Default.fixPadding * 1.5,
              }}
            >
              <Text
                style={{
                  ...Fonts.ExtraLightGrey14Medium,
                  marginTop: Default.fixPadding * 2,
                }}
              >
                {tr('name')}
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.grey}
                placeholder={tr('enterName')}
                style={{
                  ...Fonts.Black16Medium,
                  textAlign: isRtl ? 'right' : 'left',
                  marginBottom: Default.fixPadding * 2,
                  paddingVertical: Default.fixPadding * 0.5,
                  borderBottomColor: Colors.borderColor,
                  borderBottomWidth: 2,
                }}
              />

              <Text
                style={{
                  ...Fonts.ExtraLightGrey14Medium,
                }}
              >
                {tr('cardNo')}
              </Text>

              <TextInput
                value={number}
                selectionColor={Colors.primary}
                onChangeText={setNumber}
                placeholderTextColor={Colors.grey}
                placeholder={tr('enterCard')}
                keyboardType={'number-pad'}
                style={{
                  ...Fonts.Black16Medium,
                  textAlign: isRtl ? 'right' : 'left',
                  marginBottom: Default.fixPadding * 2,
                  paddingVertical: Default.fixPadding * 0.5,
                  borderBottomColor: Colors.borderColor,
                  borderBottomWidth: 2,
                }}
              />

              <View
                style={{
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  justifyContent: 'space-around',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...Fonts.ExtraLightGrey14Medium,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    MM/YY
                  </Text>

                  <TextInput
                    maxLength={5}
                    value={textValid}
                    onChangeText={(text) => onChangeTextValid(text)}
                    placeholder={tr('expiryDate')}
                    selectionColor={Colors.primary}
                    style={{
                      ...Fonts.Black16Medium,
                      textAlign: isRtl ? 'right' : 'left',
                      marginBottom: Default.fixPadding,
                      marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                      marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                      paddingVertical: Default.fixPadding * 0.5,
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.borderColor,
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...Fonts.ExtraLightGrey14Medium,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    CVV Code
                  </Text>

                  <TextInput
                    maxLength={3}
                    value={textCvv}
                    onChangeText={onChangeTextCvv}
                    placeholder={tr('enterCvv')}
                    keyboardType='number-pad'
                    selectionColor={Colors.primary}
                    style={{
                      ...Fonts.Black16Medium,
                      textAlign: isRtl ? 'right' : 'left',
                      marginBottom: Default.fixPadding,
                      paddingVertical: 5,
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.borderColor,
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: Default.fixPadding + 5,
              marginVertical: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.primary,
              ...Default.shadow,
            }}
          >
            <Text style={Fonts.White18Bold}>{tr('payment')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {status === 'Google pay' ? (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginVertical: Default.fixPadding * 2,
              }}
            >
              <Image
                source={require('@assets/images/GooglePayMain.png')}
                style={{
                  alignSelf: 'center',
                  marginTop: Default.fixPadding * 1.5,
                }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  textAlign: 'center',
                  marginBottom: Default.fixPadding * 2,
                }}
              >
                {tr('payWith')}
              </Text>

              <View
                style={{
                  padding: Default.fixPadding,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <TextInput
                  value={textPin}
                  placeholder={tr('upi')}
                  placeholderTextColor={Fonts.Grey14Medium}
                  onChangeText={onChangeTextPin}
                  selectionColor={Colors.primary}
                  style={{
                    ...Fonts.Black15Medium,
                    textAlign: isRtl ? 'right' : 'left',
                  }}
                />
              </View>
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
            <Text style={Fonts.White18Bold}>{tr('payment')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {status === 'Paypal' ? (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginVertical: Default.fixPadding * 2,
              }}
            >
              <Image
                source={require('@assets/images/PayPal1.png')}
                style={{
                  alignSelf: 'center',
                  marginVertical: Default.fixPadding * 2,
                }}
              />

              <View
                style={{
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  padding: Default.fixPadding,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <Ionicons name='mail-outline' color={Colors.grey} size={20} style={{ flex: 1 }} />
                <TextInput
                  placeholder={tr('email')}
                  placeholderTextColor={Fonts.Grey14Medium}
                  onChangeText={onChangeTextEmail}
                  value={textEmail}
                  selectionColor={Colors.primary}
                  keyboardType='email-address'
                  style={{
                    ...Fonts.Black15Medium,
                    flex: 9,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                />
              </View>
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
            <Text style={Fonts.White18Bold}>{tr('payment')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {status === 'Visacard' ? (
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                margin: Default.fixPadding * 1.5,
              }}
            >
              <Text
                style={{
                  ...Fonts.ExtraLightGrey14Medium,
                  marginTop: Default.fixPadding * 2,
                }}
              >
                {tr('name')}
              </Text>
              <TextInput
                onChangeText={setName}
                selectionColor={Colors.primary}
                value={name}
                placeholderTextColor={Colors.grey}
                placeholder={tr('enterName')}
                style={{
                  ...Fonts.Black16Medium,
                  textAlign: isRtl ? 'right' : 'left',
                  marginBottom: Default.fixPadding * 2,
                  paddingVertical: Default.fixPadding * 0.5,
                  borderBottomColor: Colors.borderColor,
                  borderBottomWidth: 2,
                }}
              />

              <Text
                style={{
                  ...Fonts.ExtraLightGrey14Medium,
                }}
              >
                {tr('cardNo')}
              </Text>

              <TextInput
                selectionColor={Colors.primary}
                onChangeText={setNumber}
                value={number}
                placeholderTextColor={Colors.grey}
                placeholder={tr('enterCard')}
                keyboardType={'number-pad'}
                style={{
                  ...Fonts.Black16Medium,
                  textAlign: isRtl ? 'right' : 'left',
                  marginBottom: Default.fixPadding * 2,
                  paddingVertical: Default.fixPadding * 0.5,
                  borderBottomColor: Colors.borderColor,
                  borderBottomWidth: 2,
                }}
              />

              <View
                style={{
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  justifyContent: 'space-around',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...Fonts.ExtraLightGrey14Medium,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    MM/YY
                  </Text>

                  <TextInput
                    maxLength={5}
                    value={textValid}
                    onChangeText={(text) => onChangeTextValid(text)}
                    placeholder={tr('expiryDate')}
                    style={{
                      ...Fonts.Black16Medium,
                      textAlign: isRtl ? 'right' : 'left',
                      marginBottom: Default.fixPadding,
                      marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                      marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                      paddingVertical: Default.fixPadding * 0.5,
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.borderColor,
                    }}
                    selectionColor={Colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...Fonts.ExtraLightGrey14Medium,
                      textAlign: isRtl ? 'right' : 'left',
                    }}
                  >
                    CVV Code
                  </Text>

                  <TextInput
                    onChangeText={onChangeTextCvv}
                    value={textCvv}
                    placeholder={tr('enterCvv')}
                    maxLength={3}
                    keyboardType='number-pad'
                    selectionColor={Colors.primary}
                    style={{
                      ...Fonts.Black16Medium,
                      textAlign: isRtl ? 'right' : 'left',
                      marginBottom: Default.fixPadding,
                      borderBottomColor: Colors.borderColor,
                      borderBottomWidth: 2,
                      paddingVertical: Default.fixPadding * 0.5,
                    }}
                  />
                </View>
              </View>
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
            <Text style={Fonts.White18Bold}>{tr('payment')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

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
              alignItems: 'center',
              width: 350,
              height: 260,
              padding: Default.fixPadding,
              marginHorizontal: Default.fixPadding,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                alignSelf: isRtl ? 'flex-start' : 'flex-end',
              }}
            >
              <Ionicons name='close' size={25} color={Colors.grey} />
            </TouchableOpacity>
            <Image source={require('@assets/images/check.png')} />

            <Text
              style={{
                ...Fonts.Black22Bold,
                marginVertical: Default.fixPadding,
              }}
            >
              {tr('thankYou')}
            </Text>
            <Text
              style={{
                ...Fonts.Grey14Medium,
                textAlign: 'center',
              }}
            >
              {tr('description')}
            </Text>
            <TouchableOpacity
              style={{ marginVertical: Default.fixPadding }}
              onPress={() => {
                setVisible(false);
                props.navigation.navigate('homeScreen');
              }}
            >
              <Text style={Fonts.Primary16Medium}>{tr('backHome')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  btnActive: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
