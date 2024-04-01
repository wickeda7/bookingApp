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
import { uploadStoreImage } from '@redux/actions/adminHomeAction';
import { updateStoreSettings } from '@redux/slices/adminHomeSlice';
import { useEffect } from 'react';
const StaffImage = ({ type, data }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const { visible, setVisible, imageType, setImageType, selectedImage, setSelectedImage } = useAdminContext();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { status, storeSettings, isLoading } = useSelector((state) => state.adminHome);

  useEffect(() => {
    if (!status) return;
    if (status === 'fulfilled') {
      setVisible(false);
    }
  }, [status]);

  let logo = data?.logo?.url;
  let images = data?.images;
  const id = data.id;
  let image = '';
  if (type === 'logo') {
    image = logo ? logo : '';
  }
  const toggleClose = () => {
    setVisible(!visible);
  };
  const uploadLogo = async (file) => {
    dispatch(uploadStoreImage({ id, file, imageType }));
  };

  const toastRemoveImage = async () => {
    let newStoreSettings = {};
    const response = await users.deleteImage(selectedImage.id);
    if (imageType === 'logo') {
      newStoreSettings = { ...storeSettings, logo: null };
    } else {
      const newImages = images.filter((item) => item.id !== selectedImage.id);
      newStoreSettings = { ...storeSettings, images: newImages };
    }
    dispatch(updateStoreSettings({ data: newStoreSettings }));
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
      await uploadLogo(uri);
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
      await uploadLogo(uri);
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
    <View style={{ marginTop: Default.fixPadding, flexDirection: 'row' }}>
      {type === 'logo' ? (
        <>{image !== '' && <Image source={{ uri: `${image}` }} style={{ width: 120, height: 120 }} />}</>
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
          <Loader visible={isLoading} />
          <Text
            style={{
              ...Fonts.Black18Bold,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {imageType === 'logo' ? tr('changeLogo') : tr('addmage')}
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
          {imageType === 'logo' && (
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
