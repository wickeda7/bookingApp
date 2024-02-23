import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
import WorkerHome from '@screens/workers/home';
import UserHome from '@screens/user/home';
const HomeScreen = (props) => {
  const { userData } = useAuthContext();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  const name = userData?.userInfo?.firstName ? userData.userInfo.firstName + ' ' + userData.userInfo.lastName : '';
  const roleId = userData?.role.id || null; // 3 === worker, 1 === user, 4 === admin
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View style={{ paddingVertical: Default.fixPadding, backgroundColor: Colors.primary }}>
        <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', marginHorizontal: Default.fixPadding * 1.5 }}>
          <View style={{ flex: 9 }}>
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <Text style={Fonts.White20Bold}>{tr('hii')},</Text>
              <Text style={Fonts.Yellow20Bold}>{name}</Text>
              <Text style={Fonts.Yellow20Bold}> HS</Text>
            </View>
            <View
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                marginTop: Default.fixPadding * 0.5,
              }}
            ></View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('UserStack', { screen: 'notificationScreen' })}
            style={{ flex: 1, marginVertical: Default.fixPadding }}
          >
            <Ionicons name='notifications-outline' size={30} color={Colors.white} />
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                width: 8,
                height: 8,
                top: '15%',
                left: '45%',
                borderRadius: 4,
                backgroundColor: Colors.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {(() => {
        switch (roleId) {
          case 3:
            return <WorkerHome props={props} />;

          default:
            return <UserHome props={props} />;
        }
      })()}
    </View>
  );
};

export default HomeScreen;
