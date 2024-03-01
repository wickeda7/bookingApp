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
import { useAdminContext } from '@contexts/AdminContext';
import Header from '@components/table/Header';
import Row from '@components/table/Row';
import { tableRows } from '@utils/helper';
import Loader from '@components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { getStoreById } from '@redux/actions/staffAction';
import { selectRow, resetSeletedRow, getStaff } from '@redux/slices/staffSlice';

const Staff = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const [orientation, setOrientation] = useState(null);
  const { deleteStaff } = useAdminContext();
  const { userData } = useAuthContext();

  const dispatch = useDispatch();

  const { staffData, isLoading } = useSelector((state) => state.staff);

  const x = 3;
  let y = 2;
  function update(arg) {
    return Math.random() + y * arg;
  }
  //y = 2; ?;
  const result = update(x);
  console.log('result', result); // 10
  useEffect(() => {
    if (userData.role.id !== 4) return;
    dispatch(getStoreById(userData.storeAdmin.id));
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
    dispatch(selectRow(item.id));
  };

  const handleLongPress = (item) => {
    dispatch(resetSeletedRow());
    props.navigation.navigate('EditStaff', {
      staffId: item.id,
    });
  };
  if (isLoading) return <Loader visible={true} />;
  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity
          style={Style.navBackButton}
          onPress={() => {
            props.navigation.navigate('Home');
            dispatch(resetSeletedRow());
          }}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White20Bold}>{tr('staff')}</Text>
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
                  });
                  dispatch(resetSeletedRow());
                }}
              >
                <Icons6 name={'user-gear'} size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={[Style.navRightButton, { backgroundColor: Colors.primary }]}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('EditStaff', { staffId: 'new' });
                  dispatch(resetSeletedRow());
                }}
              >
                <Icons6 name={'user-plus'} size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={[Style.navRightButton, { backgroundColor: Colors.primary }]}>
              <TouchableOpacity onPress={() => deleteStaff(selectedStaff)} disabled={isLoading}>
                <Icons6 name={'user-xmark'} size={22} color={isLoading ? Colors.lightPrimary : Colors.white} />
              </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
};

export default Staff;

const styles = StyleSheet.create({});
