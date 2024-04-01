import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons6 from 'react-native-vector-icons/FontAwesome6';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useAuthContext } from '@contexts/AuthContext';
import Header from '@components/table/Header';
import Row from '@components/table/Row';
import { tableRows } from '@utils/helper';
import Loader from '@components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { getStoreById, unverifiedStaff } from '@redux/actions/staffAction';
import { selectRow, resetSeletedRow, getStaff } from '@redux/slices/staffSlice';
import CreateAccessCode from './CreateAccessCode';
import UnAuthorized from '@components/UnAuthorized';

const Staff = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const [orientation, setOrientation] = useState(null);
  const { userData } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { staffData, isLoading, totalNewStaff } = useSelector((state) => state.staff);
  function randomNum() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  useEffect(() => {
    if (userData.role.id !== 4) return;
    dispatch(getStoreById(userData.storeAdmin.id));
    dispatch(unverifiedStaff(userData.storeAdmin.id));
    checkOrientation();
    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    return () => {
      ScreenOrientation.removeOrientationChangeListeners(subscription);
    };
  }, []);

  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(orientation);
  };
  const handleOrientationChange = (o) => {
    if (o.orientationInfo.orientation === 1 || o.orientationInfo.orientation === 2) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  };
  const header = [
    { size: 1.5, name: 'name' },
    { size: 1, name: 'email' },
    { size: 1, name: 'phone' },
    { size: 1, name: 'specialty' },
    { size: 1, name: 'createdAt' },
  ];
  const rows = tableRows(staffData, header, 'staff');
  const lastRow = staffData.length - 1;

  const handlePress = (item) => {
    dispatch(selectRow({ id: item.id, type: 'staff' }));
  };

  const handleLongPress = (item) => {
    dispatch(resetSeletedRow('staff'));
    props.navigation.navigate('EditStaff', {
      staffId: item.id,
      randomNum: randomNum(),
    });
  };
  const handleDelete = () => {};
  if (userData?.role?.id !== 4) return <UnAuthorized />;

  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Loader visible={isLoading} />
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity
          style={Style.navBackButton}
          onPress={() => {
            props.navigation.navigate('Home');
            dispatch(resetSeletedRow('staff'));
          }}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>{tr('staff')}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={
                orientation === 'portrait'
                  ? { flex: 10, alignItems: 'center', justifyContent: 'center' }
                  : { flex: 18, alignItems: 'center', justifyContent: 'center' }
              }
            ></View>
            <View style={[Style.navRightButton, { backgroundColor: Colors.primary }]}>
              <TouchableOpacity
                onPress={() => {
                  const selectedStaff = staffData.find((i) => i.selected);
                  if (!selectedStaff) return;
                  dispatch(getStaff(selectedStaff.id));
                  props.navigation.navigate('EditStaff', {
                    staffId: selectedStaff.id,
                    randomNum: randomNum(),
                  });
                  dispatch(resetSeletedRow('staff'));
                }}
              >
                <Icons6 name={'user-gear'} size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={[Style.navRightButton, { backgroundColor: Colors.primary }]}>
              <TouchableOpacity
                onPress={() => {
                  setVisible((prev) => !prev);
                }}
              >
                <Icons6 name={'user-plus'} size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={[Style.navRightButton, { backgroundColor: Colors.primary }]}>
              <TouchableOpacity onPress={() => handleDelete()} disabled={isLoading}>
                <Icons6 name={'user-xmark'} size={20} color={isLoading ? Colors.lightPrimary : Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={[Style.navRightButton, { backgroundColor: Colors.primary, position: 'relative' }]}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('UnverifiedStaff', { randomNum: randomNum() });
                  dispatch(resetSeletedRow('staff'));
                }}
                disabled={isLoading}
              >
                <Icons6 name={'user-check'} size={20} color={isLoading ? Colors.lightPrimary : Colors.white} />
              </TouchableOpacity>
              {totalNewStaff > 0 && (
                <View style={[Style.tick]}>
                  <Text style={{ color: Colors.white, fontSize: 12, fontFamily: 'Bold' }}>{totalNewStaff}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <Header data={header} type={'staff'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {staffData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
              onPress={() => handlePress(item)}
              onLongPress={() => handleLongPress(item)}
            >
              <Row data={item} keys={rows} type={'staff'} />
            </TouchableOpacity>
            {lastRow !== index && <View style={[Style.divider, { marginHorizontal: Default.fixPadding * 1.5 }]} />}
          </View>
        ))}
      </ScrollView>
      <CreateAccessCode visible={visible} setVisible={setVisible} storeId={userData.storeAdmin.id} />
    </KeyboardAvoidingView>
  );
};

export default Staff;

const styles = StyleSheet.create({});
