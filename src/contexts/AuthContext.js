import { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROIDCLIENTID, IOSCLIENTID, FBAPPID } from '@env';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';

import { appFirebase } from '../utils/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const auth = getAuth(appFirebase);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROIDCLIENTID,
    iosClientId: IOSCLIENTID,
  });

  const [initializing, setInitializing] = useState(true);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData(user);
        setLoggedIn(true);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        // FB and Google user.reloadUserInfo store DB
        console.log('onAuthStateChanged', user);
      } else {
        setLoggedIn(false);
        setUserData(null);
        console.log('no onAuthStateChanged');
      }
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    handleEffect();
  }, [response]);

  const handleEffect = async () => {
    const user = await getLocalUser();
    console.log('handleEffect getLocalUser', user);
    if (!user) {
      console.log(' handleEffect response', response);
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
      }
    } else {
      setUserData(user);
      setLoggedIn(true);
    }
  };

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if (!data) return null;
    return JSON.parse(data);
  };

  const confirmCode = async (code) => {
    // try {
    //   await confirm.confirm(code);
    //   console.log('User signed in successfully');
    // } catch (error) {
    //   console.log('Invalid code.');
    // }
  };

  const facebookLogin = async () => {
    Settings.initializeSDK();
    Settings.setAppID(FBAPPID);
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
    signInWithCredential(auth, facebookCredential);
  };

  const logout = async () => {
    await signOut(auth);
    console.log('User signed out!');
    await AsyncStorage.removeItem('@user');
    setLoggedIn(false);
    setUserData(null);
  };
  const value = {
    loading,
    setLoading,
    loggedIn,
    logout,
    setUserData,
    userData,
    facebookLogin,
    auth,
    confirmCode,
    promptAsync,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
