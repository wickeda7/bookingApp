import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Share, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const InviteFriendScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`inviteFriendScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.navigate('profileScreen');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [text, onChangeText] = useState('HK452645h5');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };

  const shareData = async () => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      alert(error.message);
    }
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
          onPress={() => props.navigation.navigate('profileScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('invite')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('@assets/images/family.png')}
          style={{
            alignSelf: 'center',
            marginVertical: Default.fixPadding * 2,
          }}
        />
        <Text
          style={{
            ...Fonts.Black16Medium,
            maxWidth: '80%',
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >
          Invite more than 20 friends to install beauty app and you get discount coupon
        </Text>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'space-around',
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 3,
          }}
        >
          <View
            style={{
              flex: 8,
              padding: Default.fixPadding,
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <TextInput
              value={text}
              onChangeText={onChangeText}
              placeholderTextColor={Fonts.Grey16Medium}
              selectionColor={Colors.primary}
              placeholder={tr('typeHere')}
              style={{
                ...Fonts.Black16Medium,
                textAlign: isRtl ? 'right' : 'left',
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              copyToClipboard();
              Toast.show(tr('toastCopy'), {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            }}
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: Colors.lightPink,
              ...Default.shadow,
            }}
          >
            <Text style={Fonts.Primary16Bold}>{tr('copy')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            shareData();
            onChangeText('');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: Default.fixPadding * 5,
            marginVertical: Default.fixPadding,
            paddingVertical: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.primary,
            ...Default.shadow,
          }}
        >
          <Text style={Fonts.White18Bold}>{tr('send')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default InviteFriendScreen;
