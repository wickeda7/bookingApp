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
import { use } from 'i18next';
import Loader from '@components/loader';
const Staff = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const [edit, setEdit] = useState(false);
  const [orientation, setOrientation] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const { userData } = useAuthContext();
  const { staff, getStaff, selectStaff, deleteStaff, isLoading } = useAdminContext();

  useEffect(() => {
    if (userData.role.id !== 4) return;
    getStaff(userData.storeAdmin.id);

    checkOrientation();
    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    return () => {
      ScreenOrientation.removeOrientationChangeListeners(subscription);
    };
  }, []);
  useEffect(() => {
    const selected = staff.filter((item) => item.selected);
    setSelectedStaff(selected);
  }, [staff]);
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
  const rows = tableRows(staff, header, 'staff');
  const lastRow = staff.length - 1;
  const handlePress = (item) => {
    selectStaff(item);
  };
  const handleLongPress = (item) => {
    props.navigation.navigate('EditStaff', {
      staff: [item],
    });
  };
  if (isLoading) return <Loader visible={true} />;
  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={Style.navBackButton} onPress={() => props.navigation.navigate('Home')}>
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
            <View style={[Style.navRightButton, { backgroundColor: edit ? Colors.white : Colors.primary }]}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('EditStaff', {
                    staff: selectedStaff,
                  })
                }
              >
                <Icons6 name={'user-gear'} size={22} color={edit ? Colors.primary : Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={[Style.navRightButton, { backgroundColor: edit ? Colors.white : Colors.primary }]}>
              <TouchableOpacity onPress={() => setEdit((prev) => !prev)}>
                <Icons6 name={'user-plus'} size={22} color={edit ? Colors.primary : Colors.white} />
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
        {staff.map((item, index) => (
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
