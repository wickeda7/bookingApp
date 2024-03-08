import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors, Default, Fonts } from '@constants/style';
import OngoingScreen from '@screens/stores/ongoingScreen';
import HistoryScreen from '@screens/stores/historyScreen';
import MyStatusBar from '@components/myStatusBar';
const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const { t } = useTranslation();

  function tr(key) {
    return t(`bookingScreen:${key}`);
  }

  return (
    <View
      style={{
        paddingHorizontal: Default.fixPadding * 1.5,
        paddingVertical: Default.fixPadding * 1.5,
        backgroundColor: Colors.primary,
      }}
    >
      <Text style={{ ...Fonts.White20Bold }}>{tr('booking')} BS</Text>
      <Text style={{ ...Fonts.White16Medium, marginBottom: Default.fixPadding }}>{tr('upcomingBooking')}</Text>
      <Text style={{ ...Fonts.White16Medium, marginBottom: Default.fixPadding }}>TODO: reminder alert booking</Text>

      <View style={styles.TabBarMainContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={isFocused ? styles.focus_button : styles.button}
            >
              <Text style={isFocused ? Fonts.Primary16Bold : Fonts.White16Bold}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const BookingScreen = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`bookingScreen:${key}`);
  }
  const title = isRtl ? tr('history') : tr('ongoing');
  const title2 = isRtl ? tr('ongoing') : tr('history');

  return (
    <>
      <MyStatusBar />
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen
          name={isRtl ? 'historyScreen' : 'ongoingScreen'}
          component={isRtl ? HistoryScreen : OngoingScreen}
          options={{
            title: title,
          }}
        />

        <Tab.Screen
          name={isRtl ? 'ongoingScreen' : 'historyScreen'}
          component={isRtl ? OngoingScreen : HistoryScreen}
          options={{
            title: title2,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default BookingScreen;

const styles = StyleSheet.create({
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',
  },
  button: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.primary,
  },
  focus_button: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
});
