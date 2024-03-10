import { View } from 'react-native';
import React from 'react';
import { Colors } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import WorkerHome from '@screens/workers/home';
import UserHome from '@screens/user/home';
import AdminHome from '@screens/admin/home';
import { useAuthContext } from '@contexts/AuthContext';
const HomeScreen = (props) => {
  const { userData } = useAuthContext();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  const roleId = userData?.role.id || null; // 3 === worker, 1 === user, 4 === admin

  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />

      {(() => {
        switch (roleId) {
          case 3:
            return <WorkerHome props={props} />;
          case 4:
            return <AdminHome props={props} />;
          default:
            return <UserHome props={props} />;
        }
      })()}
    </View>
  );
};

export default HomeScreen;
