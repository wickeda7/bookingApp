import { Platform } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '@contexts/AuthContext';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
const BACKGROUND_FETCH_TASK = 'background-fetch';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
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
  } else {
    //alert('Must use physical device for Push Notifications');
  }

  return token;
}

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();

//   console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: 'Background Fetch',
//       body: BACKGROUND_FETCH_TASK,
//       data: { data: 'goes here' },
//     },
//     trigger: null,
//   });
//   // Be sure to return the successful result type!
//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });
// async function registerBackgroundFetchAsync() {
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//     minimumInterval: 15, // 15 minutes
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   }).then(() => BackgroundFetch.setMinimumIntervalAsync(60 * 2));
// }

// async function unregisterBackgroundFetchAsync() {
//   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }

const NotificationsHelper = ({ setNotification }) => {
  const { userData, updateToken } = useAuthContext();
  const [expoPushToken, setExpoPushToken] = useState('');
  //const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);
  // const checkStatusAsync = async () => {
  //   await registerBackgroundFetchAsync();
  //   const status = await BackgroundFetch.getStatusAsync();
  //   const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
  //   const tasks = await TaskManager.getRegisteredTasksAsync();

  //   setStatus(status);
  //   setIsRegistered(isRegistered);
  // };
  // useEffect(() => {
  //   checkStatusAsync();
  // }, []);

  useEffect(() => {
    if (!expoPushToken) return;
    if (!userData?.userInfo) return;
    if (userData?.userInfo?.pushToken !== expoPushToken) {
      updateToken(userData?.userInfo.id, expoPushToken);
    }
  }, [expoPushToken]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      if (setNotification) {
        setNotification(notification);
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      // alert(`response ${response}`);
      // console.log('response', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
};

export default NotificationsHelper;
