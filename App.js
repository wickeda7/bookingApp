import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';

import AuthContextProvider from '@contexts/AuthContext';
import StoreContextProvider from '@contexts/StoreContext';
import SplashScreen from '@screens/splashScreen';
import AuthStack from '@navigation/AuthStack';
import BottomTab from '@navigation/bottomTab';
import UserStack from '@navigation/UserStack';
import StoresStack from '@navigation/StoresStack';
import TopTabDetails from '@navigation/topTabDetails';
import DetailScreen from '@screens/stores/detailScreen';

import i18n from '@languages/index';
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StoreContextProvider>
          <Stack.Navigator
            screenOptions={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen name='splashScreen' component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name='AuthStack' component={AuthStack} options={{ headerShown: false }} />
            <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name='UserStack' component={UserStack} options={{ headerShown: false }} />
            <Stack.Screen name='StoresStack' component={StoresStack} options={{ headerShown: false }} />
            <Stack.Screen
              name='TopTabDetails'
              component={TopTabDetails}
              options={({ navigation }) => ({
                header: () => <DetailScreen navigation={navigation} />,
              })}
            />
          </Stack.Navigator>
        </StoreContextProvider>
      </AuthContextProvider>
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
