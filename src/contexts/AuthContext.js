import { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROIDCLIENTID } from '@env';

//import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import * as WebBrowser from 'expo-web-browser';
////import { GoogleSignin } from '@react-native-google-signin/google-signin';
//import auth from '@react-native-firebase/auth';

//GoogleSignin.configure({ webClientId: ANDROIDCLIENTID });

WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [initializing, setInitializing] = useState(true);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('6266754894');
  const countryCode = '+1';
  useEffect(() => {
    console.log('ANDROIDCLIENTID', ANDROIDCLIENTID);
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  }, []);
  // Handle user state changes
  function onAuthStateChanged(user) {
    // if (user) {
    //   setLoggedIn(true);
    //   console.log('onAuthStateChanged', user);
    //   setUserData(user);
    // }
    // if (initializing) setInitializing(false);
  }

  const phoneLogin = async () => {
    // console.log('phoneLogin', countryCode + phoneNumber);
    // const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
    // console.log('confirmation', confirmation);
    // setConfirm(confirmation);
  };
  const confirmCode = async (code) => {
    // try {
    //   await confirm.confirm(code);
    //   console.log('User signed in successfully');
    // } catch (error) {
    //   console.log('Invalid code.');
    // }
  };
  const googleLogin = async () => {
    // // Check if your device supports Google Play
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // // Get the users ID token
    // const { idToken } = await GoogleSignin.signIn();
    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  };
  const facebookLogin = async () => {
    // try {
    //   setLoading(true);
    //   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //   if (result.isCancelled) {
    //     throw 'User cancelled the login process';
    //   }
    //   // Once signed in, get the users AccesToken
    //   const data = await AccessToken.getCurrentAccessToken();
    //   // console.log("provider ",facebookAuthProvider);
    //   if (!data) {
    //     throw 'Something went wrong obtaining access token';
    //   }
    //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    //   return auth().signInWithCredential(facebookCredential);
    // } catch (error) {
    //   console.log('error', error);
    //   setLoading(false);
    //   setLoggedIn(false);
    // }
  };

  const logout = async () => {
    // await auth().signOut();
    // console.log('User signed out!');
    // await AsyncStorage.removeItem('@user');
    // setLoggedIn(false);
    // setUserData(null);
  };
  const value = {
    loading,
    loggedIn,
    logout,
    userData,
    facebookLogin,
    googleLogin,
    phoneLogin,
    setPhoneNumber,
    phoneNumber,
    confirmCode,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
