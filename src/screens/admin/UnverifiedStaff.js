import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Default, Fonts, DefaultImage } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons6 from 'react-native-vector-icons/FontAwesome6';
import * as ScreenOrientation from 'expo-screen-orientation';
import Header from '@components/table/Header';
import Loader from '@components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { formatPhoneNumber } from '@utils/helper';
import moment from 'moment';
import { selectRow, resetSeletedRow } from '@redux/slices/staffSlice';
import { deleteStaff } from '@redux/actions/staffAction';
const UnverifiedStaff = (props) => {
  const ranNum = props.route.params?.randomNum;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const [orientation, setOrientation] = useState(null);
  const [smsAvailable, setSmsAvailable] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { newStaff, isLoading } = useSelector((state) => state.staff);

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
    { size: 1, name: '' },
  ];
  function randomNum() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  //const rows = tableRows(data, header, 'staff');
  const lastRow = data.length - 1;

  const handlePress = (item) => {
    dispatch(selectRow({ id: item.id, type: 'unverified' }));
  };

  const handleLongPress = (item) => {
    dispatch(resetSeletedRow('unverified'));
    props.navigation.navigate('EditStaff', {
      userInfoId: item.id,
      randomNum: randomNum(),
    });
  };
  const handlePressSend = async (item) => {};
  const handleDelete = () => {
    const staffIds = newStaff.reduce((acc, item) => {
      if (item.selected) {
        acc.push(item.id);
      }
      return acc;
    }, []);
    dispatch(deleteStaff({ ids: staffIds, type: 'unverified' }));
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
                  const selectedStaff = newStaff.find((i) => i.selected);
                  if (!selectedStaff) return;
                  props.navigation.navigate('EditStaff', {
                    userInfoId: selectedStaff.id,
                    randomNum: randomNum(),
                  });
                  dispatch(resetSeletedRow('unverified'));
                }}
              >
                <Icons6 name={'user-gear'} size={22} color={Colors.white} />
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
          const size = header[index]?.size ? header[index].size : 1;
          const color = item?.displayColor ? item.displayColor : 'black';
          const headerName = header[index]?.name ? header[index].name : '';
          return (
            <View key={index}>
              <TouchableOpacity
                style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}
                onPress={() => handlePress(item)}
                onLongPress={() => handleLongPress(item)}
              >
                <View style={[Style.tableRow, item.selected && Style.tableRowSelected]}>
                  <View
                    style={{
                      flex: 1.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: Default.fixPadding * 1.5,
                    }}
                  >
                    <Avatar.Image
                      size={35}
                      source={{
                        uri: `${DefaultImage}`,
                      }}
                    />
                    <Text style={{ fontSize: 14, marginLeft: Default.fixPadding, color: color }}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>
                      {formatPhoneNumber(item.phoneNumber)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>{item.code}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>
                      {moment(item.createdAt).format('MM-DD-YYYY')}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={[Style.buttonStyle, { backgroundColor: Colors.success, width: 80 }]}
                      onPress={() => handlePressSend(item)}
                      onLongPress={() => handleLongPress(item)}
                    >
                      <Text style={Fonts.White14Bold}>{tr('resend')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              {lastRow !== index && <View style={[Style.divider, { marginHorizontal: Default.fixPadding * 1.5 }]} />}
            </View>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UnverifiedStaff;

const styles = StyleSheet.create({});
