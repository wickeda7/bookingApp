import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Animated,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default, DefaultImage } from '@constants/style';
import { BottomSheet } from 'react-native-btr';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
import { Avatar } from 'react-native-paper';
import Style from '@theme/style';
const ModalUpdate = ({ visibleUpdate, children }) => {
  const [showModal, setShowModal] = useState(visibleUpdate);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visibleUpdate]);
  const toggleModal = () => {
    if (visibleUpdate) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View style={[styles.modalUpdate, { transform: [{ scale: scaleValue }] }]}>{children}</Animated.View>
      </View>
    </Modal>
  );
};

const AccountScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`accountScreen:${key}`);
  }
  const { userData, updateUser, uploadProfileImage, updateEmail } = useAuthContext();
  const { email, id: userId, userInfo } = userData;
  const { id, profileImg, firstName, phoneNumber, lastName, firebase } = userInfo ?? {};
  const { url } = profileImg ?? {};
  const image = url ? url : DefaultImage;
  const editable = firebase === 'facebook.com' || firebase === 'google.com' ? false : true;
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [visibleUpdate, setVisibleUpdate] = useState(false);

  const [name, setName] = useState(firstName);
  const [lName, setLName] = useState(lastName);
  const [textEmail, onChangeTextEmail] = useState(email);
  const [textNo, onChangeTextNo] = useState(phoneNumber);
  const [visible, setVisible] = useState(false);
  const toggleClose = () => {
    setVisible(!visible);
  };

  const toastRemoveImage = () => {
    Toast.show(tr('removeImage'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    setVisible(false);
  };

  const [pickedImage, setPickedImage] = useState();

  const updateUserData = async () => {
    if (email !== textEmail) {
      await updateEmail({ textEmail, userId });
    }
    if (name || lName || textNo) {
      await updateUser({ name, lName, textNo, id });
    }
    setVisibleUpdate(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);

      const uri = Platform.OS === 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri;
      await uploadProfileImage(id, uri);
      setVisible(false);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      const uri = Platform.OS === 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri;
      await uploadProfileImage(id, uri);
      setVisible(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => {
            console.log('props', props.navigation);
            props.navigation.goBack();
            //props.navigation.navigate('profileScreen');
          }}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('account')}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BottomSheet visible={visible} onBackButtonPress={toggleClose} onBackdropPress={toggleClose}>
          <View style={styles.bottomSheetMain}>
            <Text
              style={{
                ...Fonts.Black18Bold,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              {tr('changeProfile')}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={openCamera}
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name='camera' size={25} color={Colors.blue} />
              </View>
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr('camera')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImage}
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name='image' size={25} color={Colors.extraGreen} />
              </View>
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr('gallery')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toastRemoveImage}
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name='trash' size={25} color={Colors.red} />
              </View>
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr('remove')}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        {!pickedImage ? (
          <Avatar.Image
            size={128}
            source={{
              uri: `${image}`,
            }}
            style={{
              marginVertical: Default.fixPadding * 2,
              alignSelf: 'center',
            }}
          />
        ) : (
          // <Image
          //   source={require('@assets/images/profile1.png')}
          //   style={{
          //     alignSelf: 'center',
          //     marginVertical: Default.fixPadding * 2,
          //   }}
          // />
          <Image
            style={{
              marginVertical: Default.fixPadding * 2,
              alignSelf: 'center',
              height: 120,
              width: 120,
              borderRadius: 60,
            }}
            source={{ uri: pickedImage }}
          />
        )}

        <TouchableOpacity
          onPress={toggleClose}
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 40,
            top: '22%',
            left: '55%',
            borderRadius: 20,
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: Colors.primary,
            }}
          >
            <Ionicons style={{ color: Colors.white }} name='camera-outline' size={20} />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            ...Fonts.Grey16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr('name')}
        </Text>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <TextInput
            onChangeText={setName}
            selectionColor={Colors.primary}
            value={name}
            placeholder={tr('EnterName')}
            style={{
              ...Fonts.Black16Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr('lastname')}
        </Text>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <TextInput
            onChangeText={setLName}
            selectionColor={Colors.primary}
            value={lName}
            placeholder={tr('EnterLastName')}
            style={{
              ...Fonts.Black16Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
        <Text
          style={{
            ...Fonts.Grey16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr('email')}
        </Text>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <TextInput
            value={textEmail}
            onChangeText={onChangeTextEmail}
            selectionColor={Colors.primary}
            placeholder={tr('EnterEmail')}
            keyboardType={'email-address'}
            style={{
              ...Fonts.Black16Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
            editable={editable}
          />
        </View>

        <Text
          style={{
            ...Fonts.Grey16Medium,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr('mobile')}
        </Text>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <TextInput
            value={textNo}
            onChangeText={onChangeTextNo}
            selectionColor={Colors.primary}
            keyboardType={'phone-pad'}
            maxLength={10}
            placeholder={tr('EnterMobile')}
            style={{
              ...Fonts.Black16Medium,
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
      </ScrollView>

      <ModalUpdate visibleUpdate={visibleUpdate}>
        <View
          style={{
            padding: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.Black16Bold, marginVertical: Default.fixPadding }}>{tr('successfully')}</Text>

          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisibleUpdate(false);
                props.navigation.navigate('profileScreen');
              }}
            >
              <Text
                style={{
                  ...Fonts.Primary15Medium,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr('ok')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalUpdate>

      <TouchableOpacity
        onPress={() => updateUserData()}
        style={[
          Style.buttonStyle,
          {
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 1.5,
            backgroundColor: Colors.primary,
          },
        ]}
      >
        <Text style={Fonts.White18Bold}>{tr('update')}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalUpdate: {
    paddingHorizontal: Default.fixPadding,
    borderRadius: 10,
    elevation: 20,
    width: '80%',
    backgroundColor: Colors.white,
  },
  bottomSheetMain: {
    paddingVertical: Default.fixPadding,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: Colors.white,
  },
});
