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
import { users } from '@api/users';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState(null);
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
        const userInfo = user.reloadUserInfo.providerUserInfo[0];

        if (userInfo) {
          updateUserData(userInfo);
        }
      } else {
        setLoading(false);
        setLoggedIn(false);
        setUserData(null);
      }
    });
    return () => unSub();
  }, []);

  useEffect(() => {
    handleEffect();
  }, [response]);

  const updateUserData = async (user) => {
    setLoading(true);
    const email = user.email ? user.email : user.phoneNumber + '@' + user.providerId + '.com';
    const res = await users.getUser(email);
    if (!res) {
      const data = {
        email: email,
        username: user.displayName,
        phoneNumber: user.phoneNumber,
        password: user.phoneNumber,
        role: 1,
        firebase: user.providerId,
      };
      const res = await users.register(data);
      await AsyncStorage.setItem('@user', JSON.stringify(res.user));
      setUserData(res.user);
    } else {
      await AsyncStorage.setItem('@user', JSON.stringify(res));
      setUserData(res);
    }
    //console.log('updateUserData setLoggedIn true');
    setLoggedIn(true);
    setLoading(false);
  };
  const handleEffect = async () => {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
      }
    }
    //  else {
    //   console.log('handleEffect setLoggedIn true');
    //   setUserData(user);
    //   setLoggedIn(true);
    //   setLoading(false);
    // }
  };

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if (!data) return null;
    return JSON.parse(data);
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
    await AsyncStorage.removeItem('@user');
    setLoggedIn(false);
    setUserData(null);
  };

  const updateUserFavorite = async () => {
    const updatedUseer = userData;
    const user = await getLocalUser();

    const res = await users.getUser(userData.email);
    if (res.favorites.length === 0) {
      delete updatedUseer.favorites;
    } else {
      updatedUseer.favorites = res.favorites;
    }
    setUserData(updatedUseer);
    await AsyncStorage.setItem('@user', JSON.stringify(updatedUseer));
  };
  const getReviews = async (id) => {
    setLoading(true);
    const response = await users.getReviews(id);
    setReviews(response.data);
    setLoading(false);
  };
  const updateUser = async (data) => {
    const temp = {
      firstName: data.name,
      lastName: data.lName,
      phoneNumber: data.textNo,
    };
    const response = await users.updateUser(data.id, temp);
    const newUserInfo = { ...userData.userInfo, ...temp };
    const newInfo = { ...userData, userInfo: newUserInfo };
    setUserData(newInfo);
    await AsyncStorage.setItem('@user', JSON.stringify(newInfo));
    return response;
  };
  const updateEmail = async (data) => {
    const temp = {
      email: data.textEmail,
    };
    const response = await users.updateEmail(data.userId, temp);
    const newInfo = { ...userData, ...temp };
    setUserData(newInfo);
    await AsyncStorage.setItem('@user', JSON.stringify(newInfo));
    return response;
  };
  const uploadProfileImage = async (id, file) => {
    const response = await users.uploadProfileImage(id, file);
    const newInfo = {
      ...userData,
      userInfo: {
        ...userData.userInfo,
        profileImg: {
          ...userData.userInfo.profileImg,
          url: response[0].url,
        },
      },
    };
    setUserData(newInfo);
    await AsyncStorage.setItem('@user', JSON.stringify(newInfo));
    return response;
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
    promptAsync,
    updateUserFavorite,
    getReviews,
    reviews,
    updateUser,
    updateEmail,
    uploadProfileImage,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
