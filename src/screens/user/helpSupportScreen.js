import { Text, View, ScrollView, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Default, Colors, Fonts } from '@constants/style';
import Loader from '@components/loader';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const HelpSupportScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`helpSupportScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState();
  const [textEmail, onChangeTextEmail] = useState();
  const [textMessage, onChangeTextMessage] = useState();

  const handleSummit = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate('profileScreen');
    }, 1500);
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
        <Text style={Fonts.White18Bold}>{tr('helpSupport')}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...Fonts.Black16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 1.5,
          }}
        >
          {tr('name')}
        </Text>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            selectionColor={Colors.primary}
            placeholder={tr('enterName')}
            placeholderTextColor={Colors.extraLightGrey}
            style={{
              ...Fonts.Black16Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>

        <Text
          style={{
            ...Fonts.Black16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr('email')}
        </Text>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <TextInput
            value={textEmail}
            onChangeText={onChangeTextEmail}
            selectionColor={Colors.primary}
            placeholder={tr('enterEmail')}
            placeholderTextColor={Colors.extraLightGrey}
            keyboardType='email-address'
            style={{
              ...Fonts.Black16Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>

        <Text
          style={{
            ...Fonts.Black16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr('message')}
        </Text>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <TextInput
            textAlignVertical='top'
            multiline={true}
            numberOfLines={5}
            onChangeText={onChangeTextMessage}
            selectionColor={Colors.primary}
            value={textMessage}
            placeholder={tr('writeMessage')}
            placeholderTextColor={Colors.extraLightGrey}
            style={{
              ...Fonts.Black16Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
      </ScrollView>
      <Loader visible={visible} />
      <TouchableOpacity
        onPress={handleSummit}
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
        <Text style={Fonts.White18Bold}>{tr('submit')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpSupportScreen;
