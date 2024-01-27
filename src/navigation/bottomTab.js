import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/bottomTab/homeScreen';
import NearByScreen from '@screens/bottomTab/nearByScreen';
import BookingScreen from '@screens/bottomTab/bookingScreen';
import ProfileScreen from '@screens/bottomTab/profileScreen';

import { Colors, Fonts, Default } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { BackHandler, Text, Modal, View, TouchableOpacity, Platform } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`bottomTab:${key}`);
  }
  const title1 = isRtl ? tr('profile') : tr('home');
  const title2 = isRtl ? tr('home') : tr('profile');
  const title3 = isRtl ? tr('booking') : tr('nearBy');
  const title4 = isRtl ? tr('nearBy') : tr('booking');

  const [backClickCount, setBackClickCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        setVisible(true);
        setBackClickCount(1);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [])
  );
  const backModel = () => {
    return (
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
              justifyContent: 'center',
              alignItems: 'center',
              width: 300,
              height: 150,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <View
              style={{
                paddingHorizontal: Default.fixPadding * 1.5,
                paddingVertical: Default.fixPadding,
              }}
            >
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  textAlign: 'center',
                  marginVertical: Default.fixPadding,
                }}
              >
                {tr('exitApp')}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  justifyContent: 'space-around',
                  marginVertical: Default.fixPadding,
                }}
              >
                <TouchableOpacity
                  onPress={() => BackHandler.exitApp()}
                  style={{
                    alignItems: 'center',
                    paddingVertical: Default.fixPadding,
                    width: '40%',
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                    ...Default.shadow,
                  }}
                >
                  <Text style={Fonts.White14Bold}>{tr('yes')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={{
                    alignItems: 'center',
                    paddingVertical: Default.fixPadding,
                    width: '40%',
                    borderRadius: 10,
                    backgroundColor: Colors.regularGrey,
                    ...Default.shadow,
                  }}
                >
                  <Text style={Fonts.Primary16Bold}>{tr('no')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName='homeScreen'
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: Default.fixPadding * 0.5,
            height: Platform.OS === 'ios' ? 90 : 60,
            backgroundColor: Colors.white,
          },
          tabBarLabelStyle: {
            fontFamily: 'Medium',
            fontSize: 14,
            paddingBottom: Default.fixPadding * 0.5,
          },
        }}
      >
        <Tab.Screen
          name={isRtl ? 'profileScreen' : 'homeScreen'}
          component={isRtl ? ProfileScreen : HomeScreen}
          options={{
            title: title1,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={isRtl ? 'person-outline' : 'home-outline'}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? 'bookingScreen' : 'nearByScreen'}
          component={isRtl ? BookingScreen : NearByScreen}
          options={{
            title: title3,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={isRtl ? 'calendar-sharp' : 'location-outline'}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? 'nearByScreen' : 'bookingScreen'}
          component={isRtl ? NearByScreen : BookingScreen}
          options={{
            title: title4,
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={isRtl ? 'location-outline' : 'calendar-sharp'}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={isRtl ? 'homeScreen' : 'profileScreen'}
          component={isRtl ? HomeScreen : ProfileScreen}
          options={{
            title: title2,
            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={isRtl ? 'home-outline' : 'person-outline'}
                color={focused ? Colors.primary : Colors.lightGrey}
                size={22}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {backClickCount == 1 ? backModel() : null}
    </>
  );
};

export default BottomTab;
