import { Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const SettingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`settingScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [notification, setNotification] = useState(true);
  const switchNotification = () => setNotification((previousState) => !previousState);

  const [location, setLocation] = useState(true);
  const switchLocation = () => setLocation((previousState) => !previousState);

  const [darkMode, setDarkMode] = useState(false);
  const switchDarkMode = () => setDarkMode((previousState) => !previousState);

  const [update, setUpdate] = useState(true);
  const switchUpdate = () => setUpdate((previousState) => !previousState);

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
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.navigate('profileScreen')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('settings')}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.Black16Regular,
              flex: 8.5,
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {tr('notification')}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={notification}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size='medium'
            onToggle={switchNotification}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.Black16Regular,
              flex: 8.5,
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {tr('location')}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={location}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size='medium'
            onToggle={switchLocation}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.Black16Regular,
              flex: 8.5,
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {tr('darkMode')}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={darkMode}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size='medium'
            onToggle={switchDarkMode}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            marginHorizontal: Default.fixPadding * 2,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <Text
            style={{
              ...Fonts.Black16Regular,
              flex: 8.5,
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {tr('appUpdate')}
          </Text>

          <ToggleSwitch
            style={{ flex: 1.5 }}
            isOn={update}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size='medium'
            onToggle={switchUpdate}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
