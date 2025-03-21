import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Default, Fonts, DefaultImage } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'react-native-paper';
import { useAdminContext } from '@contexts/AdminContext';
import { BottomSheet } from 'react-native-btr';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { users } from '@api/users';
import Loader from '@components/loader';
import Toast from 'react-native-root-toast';
import { updateStaffState } from '@redux/slices/staffSlice';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '@redux/actions/staffAction';
import { useEffect } from 'react';
const StaffImage = ({ type, setUserInfo, userInfo, staff }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const { visible, setVisible, imageType, setImageType, selectedImage, setSelectedImage } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { status, staffData } = useSelector((state) => state.staff);

  useEffect(() => {
    if (!status) return;
    if (status === 'fulfilled') {
      setIsLoading(false);
      setVisible(false);
      if (!staff) {
        return;
      }
      const selectedStaff = staffData.find((i) => i.id === staff.id);
      setUserInfo(selectedStaff.userInfo);
    } else if (status === 'error') {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [status]);

  let profileImg = userInfo?.profileImg;
  let images = userInfo?.images;
  const id = userInfo.id;
  let image = '';
  if (type === 'profileImg') {
    image = profileImg?.url ? profileImg.url : DefaultImage;
  }
  const toggleClose = () => {
    setVisible(!visible);
  };
  const uploadProfileImage = async (file) => {
    const userId = staff?.id ? staff.id : null;
    dispatch(uploadImage({ id, file, imageType, userId }));
  };

  const toastRemoveImage = async () => {
    const prevUserInfo = userInfo;
    let newUserInfo = {};
    setIsLoading(true);
    const response = await users.deleteImage(selectedImage.id);
    if (imageType === 'profileImg') {
      newUserInfo = { ...prevUserInfo, profileImg: null };
    } else {
      const newImages = images.filter((item) => item.id !== selectedImage.id);
      newUserInfo = { ...prevUserInfo, images: newImages };
    }
    const newStaff = { ...staff, userInfo: { ...staff.userInfo, ...newUserInfo } };
    dispatch(updateStaffState({ data: newStaff, method: 'put' }));
    //updateStaffState(newStaff, 'put');
    setUserInfo(newUserInfo);
    setIsLoading(false);
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
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = Platform.OS === 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri;
      await uploadProfileImage(uri);
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
      const uri = Platform.OS === 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri;
      await uploadProfileImage(uri);
    }
  };
  const renderItemPhoto = ({ item, index }) => {
    const totalImg = images.length;
    const isFirst = index === images.length - totalImg;
    return (
      <View
        style={{
          paddingBottom: Default.fixPadding * 1.5,
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSelectedImage(item);
            setShowModal(true);
            setImageType('images');
          }}
        >
          <Image source={{ uri: `${item.url}` }} style={{ width: 110, height: 101 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ marginTop: Default.fixPadding * 3, flexDirection: 'row' }}>
      {/* <Text style={{ ...Fonts.Black18Bold, marginHorizontal: Default.fixPadding * 2 }}>
        {isLoading ? 'loading' : 'waiting'} status {status}
      </Text> */}
      {type === 'profileImg' ? (
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
        <FlatList
          horizontal={true}
          data={images}
          renderItem={renderItemPhoto}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <BottomSheet visible={visible} onBackButtonPress={toggleClose} onBackdropPress={toggleClose}>
        <View style={[styles.bottomSheetMain, { backgroundColor: Colors.white, padding: Default.fixPadding }]}>
          <Text
            style={{
              ...Fonts.Black18Bold,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {imageType === 'profileImg' ? tr('changeProfile') : tr('addmage')}
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
          {imageType === 'profileImg' && (
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
          )}
        </View>
      </BottomSheet>
      <Modal animationType='fade' transparent={true} visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <View
            style={{
              width: 380,
              height: 220,
              paddingHorizontal: Default.fixPadding * 1.5,
              paddingVertical: Default.fixPadding * 1.5,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <Text style={{ ...Fonts.Black18Medium, textAlign: 'center' }}>{tr('deleteMessage')}</Text>
            <Image
              source={{ uri: selectedImage?.url }}
              style={{ width: 100, height: 100, margin: Default.fixPadding }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginVertical: Default.fixPadding * 1.5,
              }}
            >
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text
                  style={{
                    ...Fonts.ExtraLightGrey18Medium,
                    marginHorizontal: Default.fixPadding * 2,
                  }}
                >
                  {tr('cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toastRemoveImage();
                  setShowModal(false);
                }}
              >
                <Text
                  style={{
                    ...Fonts.Primary18Medium,
                    marginRight: Default.fixPadding,
                  }}
                >
                  {tr('delete')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StaffImage;

const styles = StyleSheet.create({});
