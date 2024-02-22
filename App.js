import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';

import AuthContextProvider from '@contexts/AuthContext';
import StoreContextProvider from '@contexts/StoreContext';
import BookingContextProvider from '@contexts/BookingContext';
import SplashScreen from '@screens/splashScreen';
import AuthStack from '@navigation/AuthStack';
import BottomTab from '@navigation/bottomTab';
import UserStack from '@navigation/UserStack';
import StoresStack from '@navigation/StoresStack';
import WorkersStack from './src/navigation/WorkersStack';
import TopTabDetails from '@navigation/topTabDetails';
import DetailScreen from '@screens/stores/detailScreen';
import i18n from '@languages/index';

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const BACKGROUND_FETCH_TASK = 'background-fetch';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Background Fetch',
      body: BACKGROUND_FETCH_TASK,
      data: { data: 'goes here' },
    },
    trigger: null,
  });
  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 2, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  }).then(() => BackgroundFetch.setMinimumIntervalAsync(60 * 2));
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StoreContextProvider>
          <BookingContextProvider>
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
              <Stack.Screen name='WorkersStack' component={WorkersStack} options={{ headerShown: false }} />
            </Stack.Navigator>
          </BookingContextProvider>
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    checkStatusAsync();
  }, []);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const checkStatusAsync = async () => {
    await registerBackgroundFetchAsync();
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    const tasks = await TaskManager.getRegisteredTasksAsync();
    console.debug('Registered tasks', tasks);
    console.log('status', status);
    console.log('isRegistered', isRegistered);
    setStatus(status);
    setIsRegistered(isRegistered);
  };
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
