import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { withTranslation } from 'react-i18next';
import TabNavigator from '@navigation/TabNavigator';
import DrawerNavigator from '@navigation/DrawerNavigator';
import AuthContextProvider from '@contexts/AuthContext';
import StoreContextProvider from '@contexts/StoreContext';
import BookingContextProvider from '@contexts/BookingContext';
import AdminContextProvider from '@contexts/AdminContext';

import i18n from '@languages/index';

import Devi from 'react-native-device-info';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

const isTablet = Devi.isTablet();
const MainNavigation = () => {
  // const config = {
  //   screens: {
  //     profileScreen: {
  //       path: '?',
  //     },
  //   },
  // };
  // const state = {
  //   routes: [
  //     {
  //       name: 'profileScreen',
  //       params: { access: 'code' },
  //     },
  //   ],
  // };
  // const config = {
  //   screens: {
  //     BottomTab: {
  //       screens: {
  //       path: 'profileScreen?',
  //       parse: {
  //         id: (id) => `user-${id}`,
  //       },
  //       stringify: {
  //         id: (id) => id.replace(/^user-/, ''),
  //       },
  //     },
  //   },
  // };
  const config = {
    screens: {
      BottomTab: {
        screens: {
          profileScreen: '?',
        },
      },
      splashScreen: '',
    },
  };
  const linking = {
    prefixes: [prefix],
    config,
  };
  return (
    <NavigationContainer linking={linking}>
      <Provider store={store}>
        <AuthContextProvider>
          <StoreContextProvider>
            <BookingContextProvider>
              <AdminContextProvider>{isTablet ? <DrawerNavigator /> : <TabNavigator />}</AdminContextProvider>
            </BookingContextProvider>
          </StoreContextProvider>
        </AuthContextProvider>
      </Provider>
    </NavigationContainer>
  );
};

const ReloadAppOnLanguageChange = withTranslation('translation', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(MainNavigation);

export default function App() {
  const [loaded] = useFonts({
    Regular: require('./assets/fonts/SF-Pro-Display-Regular.ttf'),
    Medium: require('./assets/fonts/SF-Pro-Display-Medium.ttf'),
    SemiBold: require('./assets/fonts/SF-Pro-Display-Semibold.ttf'),
    Bold: require('./assets/fonts/SF-Pro-Display-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return <ReloadAppOnLanguageChange />;
}
