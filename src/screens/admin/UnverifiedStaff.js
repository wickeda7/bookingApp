import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons6 from 'react-native-vector-icons/FontAwesome6';
import * as ScreenOrientation from 'expo-screen-orientation';
import Header from '@components/table/Header';
import Loader from '@components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { formatPhoneNumber } from '@utils/helper';
import moment from 'moment';
import { selectRow, resetSeletedRow } from '@redux/slices/staffSlice';
import { createAccessCode } from '@redux/actions/staffAction';
import CreateAccessCode from './CreateAccessCode';
import { useAuthContext } from '@contexts/AuthContext';
import UnverifiedRow from '@components/admin/UnverifiedRow';

const UnverifiedStaff = (props) => {
  const ranNum = props.route.params?.randomNum;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const [orientation, setOrientation] = useState(null);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const { newStaff, isLoading } = useSelector((state) => state.staff);
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);

  const { userData } = useAuthContext();
  useEffect(() => {
    if (!ranNum) return;
    setData(newStaff);
  }, [ranNum]);

  useEffect(() => {
    setData(newStaff);
  }, [newStaff]);

  useEffect(() => {
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
    { size: 1, name: 'phone' },
    { size: 1, name: 'accessCode' },
    { size: 1, name: 'createdAt' },
    { size: 1, name: 'updatedAt' },
    { size: 1, name: '' },
  ];

  //const rows = tableRows(data, header, 'staff');
  const lastRow = data.length - 1;

  const handlePress = (item) => {
    dispatch(selectRow({ id: item.id, type: 'unverified' }));
  };

  const handleLongPress = (item) => {
    setEditData(item);
    dispatch(resetSeletedRow('unverified'));
    setVisible(true);
  };

  const handleDelete = () => {
    const staffIds = newStaff.reduce((acc, item) => {
      if (item.selected) {
        acc.push(item.id);
      }
      return acc;
    }, []);
    dispatch(createAccessCode({ data: staffIds, method: 'DELETE' }));
  };
  if (isLoading) return <Loader visible={true} />;
  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity
          style={Style.navBackButton}
          onPress={() => {
            props.navigation.navigate('Staff');
            dispatch(resetSeletedRow('unverified'));
          }}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={25} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White20Bold}>{tr('unverifiedStaff')}</Text>
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
                  setEditData(null);
                  setVisible((prev) => !prev);
                }}
              >
                <Icons6 name={'user-plus'} size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={[Style.navRightButton, { backgroundColor: Colors.primary }]}>
              <TouchableOpacity onPress={() => handleDelete()} disabled={isLoading}>
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
        {data.map((item, index) => {
          return (
            <UnverifiedRow
              item={item}
              index={index}
              handlePress={handlePress}
              handleLongPress={handleLongPress}
              lastRow={lastRow}
              key={index}
            />
          );
        })}
      </ScrollView>
      <CreateAccessCode visible={visible} setVisible={setVisible} storeId={userData.storeAdmin.id} data={editData} />
    </KeyboardAvoidingView>
  );
};

export default UnverifiedStaff;

const styles = StyleSheet.create({});
