import { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ANDROIDCLIENTID, IOSCLIENTID } from '@env';

//import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { appFirebase } from '../utils/firebaseConfig';
import { use } from 'i18next';
////import { GoogleSignin } from '@react-native-google-signin/google-signin';
//import auth from '@react-native-firebase/auth';

//GoogleSignin.configure({ webClientId: ANDROIDCLIENTID });

WebBrowser.maybeCompleteAuthSession();
const auth = getAuth(appFirebase);
const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROIDCLIENTID,
    iosClientId: IOSCLIENTID,
  });

  const [initializing, setInitializing] = useState(true);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('6266754894');
  const countryCode = '+1';

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData(user);
        setLoggedIn(true);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
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
    if (!user) {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const googleUser = await signInWithCredential(auth, credential);
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
    await signOut(auth);
    console.log('User signed out!');
    await AsyncStorage.removeItem('@user');
    setLoggedIn(false);
    setUserData(null);
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
    promptAsync,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
