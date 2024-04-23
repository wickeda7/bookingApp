import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASEAPPID } from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: 'nails-411204.appspot.com',
  messagingSenderId: '965029390724',
  appId: FIREBASEAPPID,
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export default appFirebase;
