import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Default, Fonts, StaffColors } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';

import { formatPhoneNumber, uploadProfileImage } from '@utils/helper';

import HoursList from '@components/StaffHoursList';
import StaffImage from '@components/StaffImage';
import { useAdminContext } from '@contexts/AdminContext';
import Loader from '@components/loader';
import { users } from '@api/users';
import { setBackgroundColorAsync } from 'expo-system-ui';
const EditStaff = (props) => {
  const staffArr = props.route.params.staff;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const staff = staffArr[0];
  const refRBSheet = useRef();

  const [email, setEmail] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [formattedNumber, setFormattedNumber] = useState();
  const { visible, setVisible, setImageType, setSelectedImage } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!staff) return;
    parseReduceData(staff);
  }, [staff]);

  const parseReduceData = (staff) => {
    setEmail(staff.email);
    setUserInfo(staff.userInfo);
    setFormattedNumber(formatPhoneNumber(staff.userInfo.phoneNumber));
  };

  const toggleClose = (type) => {
    setVisible(!visible);
    setImageType(type);
  };

  const handleOnchange = (text, input) => {
    setUserInfo((prevState) => ({ ...prevState, [input]: text }));
  };
  const onTextChange = (number) => {
    const formattedNumber = formatPhoneNumber(number);
    setFormattedNumber(formattedNumber);
    setUserInfo((prevState) => ({ ...prevState, phoneNumber: number }));
  };
  const updateUserData = async () => {
    const id = userInfo.id;
    const data = { ...userInfo };
    delete data.selected;
    delete data.selected;
    delete data.images;
    delete data.profileImg;
    delete data.id;
    setIsLoading(true);
    if (email !== staff.email) {
      const temp = {
        email,
      };
      const res = await users.updateEmail(staff.id, temp);
    }
    const response = await users.updateUser(id, data);
    setIsLoading(false);
  };
  if (!userInfo) return <Loader visible={true} />;
  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Loader visible={isLoading} />
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={Style.navBackButton} onPress={() => props.navigation.navigate('Staff')}>
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
          <Text style={Fonts.Black15Medium}>{tr('emailAddress')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => setEmail(text)}
            selectionColor={Colors.primary}
            value={email}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('phoneNumber')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => onTextChange(text)}
            selectionColor={Colors.primary}
            value={formattedNumber}
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
            value={userInfo.experience.toString()}
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
            <Text numberOfLines={1} style={[Fonts.Black16Bold, { color: userInfo.displayColor }]}>
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
            minHeight: 100,
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
            minHeight: 100,
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
          <StaffImage type='profileImg' images={userInfo.profileImg} id={userInfo.id} setUserInfo={setUserInfo} />
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
          <StaffImage type='images' images={userInfo.images} id={userInfo.id} setUserInfo={setUserInfo} />
          <View style={[Style.infoAlert, { position: 'relative', paddingLeft: 30 }]}>
            <View style={{ position: 'absolute', top: 4, left: 5 }}>
              <Ionicons name={'information-circle-outline'} size={20} color={Colors.info} />
            </View>
            <Text style={Style.infoText}>
              <Text style={{ marginLeft: 15, paddingLeft: 25 }}>{tr('imageInfo')}</Text>
            </Text>
          </View>
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
