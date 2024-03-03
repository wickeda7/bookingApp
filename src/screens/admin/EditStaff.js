import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Default, Fonts, StaffColors } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';

import { formatPhoneNumber } from '@utils/helper';

import HoursList from '@components/admin/StaffHoursList';
import StaffImage from '@components/admin/StaffImage';
import { useAdminContext } from '@contexts/AdminContext';
import { useAuthContext } from '@contexts/AuthContext';
import Loader from '@components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, updateEmail } from '@redux/actions/staffAction';
const EditStaff = (props) => {
  const { navigation, route } = props;

  const staffId = route.params?.staffId;
  const ranNum = route.params?.randomNum;
  const userInfoId = route.params?.userInfoId;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }

  const { visible, setVisible, setImageType, setSelectedImage } = useAdminContext();
  const { userData } = useAuthContext();
  const refRBSheet = useRef();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [formattedNumber, setFormattedNumber] = useState();

  const [imageErr, setImageErr] = useState(false);
  const { staffData, isLoading, newStaff } = useSelector((state) => state.staff);
  const dispatch = useDispatch();
  useEffect(() => {
    if (staffId) {
      parseReduceData(staffId);
    }
    if (userInfoId) {
      const temp = newStaff.find((item) => item.id === userInfoId);
      setUserInfo(temp);
      setFormattedNumber(formatPhoneNumber(temp.phoneNumber));
    }

    setImageErr(false);
  }, [ranNum]);

  const parseReduceData = (id) => {
    const temp = staffData.find((item) => item.id === id);
    setUser(temp);
    setEmail(temp.email);
    setUserInfo(temp.userInfo);
    setFormattedNumber(formatPhoneNumber(temp.userInfo.phoneNumber));
  };
  const toggleClose = (type) => {
    if (!user) {
      setImageErr(true);
    } else {
      setVisible(!visible);
      setImageType(type);
    }
  };

  const handleOnchange = (text, input) => {
    setImageErr(false);
    setUserInfo((prevState) => ({ ...prevState, [input]: text }));
  };
  const onTextChange = (number) => {
    setImageErr(false);
    const formattedNumber = formatPhoneNumber(number);
    setFormattedNumber(formattedNumber);
    setUserInfo((prevState) => ({ ...prevState, phoneNumber: number }));
  };
  const updateUserData = async () => {
    setImageErr(false);

    const id = userInfo.id;
    const data = { ...userInfo };
    if (data.phoneNumber !== '') {
      data.phoneNumber = data.phoneNumber.replace(/[^\d\+]/g, '');
    }
    delete data.images;
    delete data.profileImg;
    delete data.id;
    if (user && email !== user.email) {
      const data = {
        email,
      };
      dispatch(updateEmail({ id: user.id, data }));
    }
    dispatch(updateUser({ userId: user?.id, id, data }));
    //const newStaff = { ...user, userInfo: { ...user.userInfo, ...data } };
  };

  const navBack = () => {
    setUserInfo({});
    setEmail('');
    setFormattedNumber('');
    setUser(null);
    props.navigation.navigate('Staff');
  };
  if (!userInfo) return <Loader visible={true} />;
  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Loader visible={isLoading} />
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity
          style={Style.navBackButton}
          onPress={() => {
            navBack();
          }}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White20Bold}>{tr('edit')}</Text>
      </View>
      <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('firstName')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'firstName')}
            selectionColor={Colors.primary}
            value={userInfo.firstName}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('lastName')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'lastName')}
            selectionColor={Colors.primary}
            value={userInfo.lastName}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={[Fonts.Black15Medium]}>{tr('phoneNumber')}</Text>
          <TextInput
            style={[Style.inputStyle]}
            onChangeText={(text) => onTextChange(text)}
            selectionColor={Colors.primary}
            value={formattedNumber}
            keyboardType='phone-pad'
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('emailAddress')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => setEmail(text)}
            selectionColor={Colors.primary}
            value={email}
            keyboardType='email-address'
          />
        </View>
      </View>
      <View
        style={[
          Style.divider,
          { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
        ]}
      ></View>
      <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('specialty')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'specialty')}
            selectionColor={Colors.primary}
            value={userInfo.specialty}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('experience')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'experience')}
            selectionColor={Colors.primary}
            value={userInfo.experience ? userInfo.experience.toString() : ''}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('color')}</Text>
          <TouchableOpacity
            style={[Style.buttonStyle, { width: 125, backgroundColor: Colors.white }]}
            onPress={() => refRBSheet.current.open()}
          >
            <Text
              numberOfLines={1}
              style={[Fonts.Black16Bold, { color: userInfo.displayColor ? userInfo.displayColor : 'black' }]}
            >
              {tr('selectColor')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          Style.divider,
          { marginVertical: Default.fixPadding * 1.5, marginHorizontal: Default.fixPadding * 1.5 },
        ]}
      ></View>
      <View
        style={[
          Style.contentContainer,
          {
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            minHeight: 120,
            maxHeight: 300,
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('hours')}</Text>
          <HoursList data={userInfo.hours} setUserInfo={setUserInfo} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            minHeight: 120,
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('about')}</Text>
          <TextInput
            style={[Style.inputStyle, { minHeight: 100 }]}
            numberOfLines={10}
            multiline={true}
            onChangeText={(text) => handleOnchange(text, 'about')}
            selectionColor={Colors.primary}
            value={userInfo.about}
          />
        </View>
      </View>
      <View
        style={[
          Style.divider,
          { marginVertical: Default.fixPadding * 1.5, marginHorizontal: Default.fixPadding * 1.5 },
        ]}
      ></View>

      <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            minHeight: 200,
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('profileImage')}</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(userInfo.profileImg);
              toggleClose('profileImg');
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
              top: -10,
              left: 180,
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
                borderRadius: 25,
                backgroundColor: Colors.primary,
              }}
            >
              <Ionicons style={{ color: Colors.white }} name='camera-outline' size={20} />
            </View>
          </TouchableOpacity>
          <StaffImage type='profileImg' setUserInfo={setUserInfo} userInfo={userInfo} staff={user} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            minHeight: 200,
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('images')}</Text>
          <TouchableOpacity
            onPress={() => toggleClose('images')}
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
              top: -10,
              left: 180,
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
                borderRadius: 25,
                backgroundColor: Colors.primary,
              }}
            >
              <Ionicons style={{ color: Colors.white }} name='camera-outline' size={20} />
            </View>
          </TouchableOpacity>
          <StaffImage type='images' setUserInfo={setUserInfo} userInfo={userInfo} staff={user} />
          {imageErr && (
            <View style={[Style.errorAlert, { position: 'relative', paddingLeft: 30 }]}>
              <View style={{ position: 'absolute', top: 4, left: 5 }}>
                <Ionicons name={'information-circle-outline'} size={20} color={Colors.red} />
              </View>
              <Text style={Style.errorText}>
                <Text style={{ marginLeft: 15, paddingLeft: 25 }}>{tr('imageError')}</Text>
              </Text>
            </View>
          )}

          {user && (
            <View style={[Style.infoAlert, { position: 'relative', paddingLeft: 30 }]}>
              <View style={{ position: 'absolute', top: 4, left: 5 }}>
                <Ionicons name={'information-circle-outline'} size={20} color={Colors.info} />
              </View>
              <Text style={Style.infoText}>
                <Text style={{ marginLeft: 15, paddingLeft: 25 }}>{tr('imageInfo')}</Text>
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={[
          Style.divider,
          { marginVertical: Default.fixPadding * 1.5, marginHorizontal: Default.fixPadding * 1.5 },
        ]}
      ></View>
      <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => updateUserData()}
            style={[
              Style.buttonStyle,
              {
                backgroundColor: Colors.primary,
                width: 110,
              },
            ]}
          >
            <Text style={Fonts.White18Bold}>{tr('save')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={450}
        openDuration={100}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: Colors.white,
          },
        }}
      >
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 20,
          }}
        >
          <Text style={[Fonts.Black18Bold, { textAlign: 'center' }]}> {tr('selectColor')}</Text>
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
        <View
          style={{
            marginTop: 15,
            marginHorizontal: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {StaffColors.map((color, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleOnchange(color, 'displayColor');
                  refRBSheet.current.close();
                }}
                key={index}
              >
                <View
                  style={{
                    borderRadius: 30,
                    width: 40,
                    height: 40,
                    backgroundColor: color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 15,
                  }}
                  underlayColor='#ccc'
                ></View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
      </RBSheet>
    </KeyboardAvoidingView>
  );
};

export default EditStaff;

const styles = StyleSheet.create({});
