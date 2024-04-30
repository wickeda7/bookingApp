import { ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Default, DefaultImage } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationsHelper from '@utils/notifications';
import { useAuthContext } from '@contexts/AuthContext';
const Reports = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`reports:${key}`);
  }
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const [notification, setNotification] = useState(null);
  const [newNotification, setNewNotification] = useState(null);
  const [payrollId, setPayrollId] = useState(null);
  const { userData } = useAuthContext();
  const { id: userId } = userData;
  useEffect(() => {
    if (notification) {
      const data = notification.request.content.data;
      if (data.type === 'newPayroll' && data.specialistId === userId) {
        setPayrollId(data.payrollId);
        setNewNotification(true);
      }
    }
  }, [notification]);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <NotificationsHelper setNotification={setNotification} />
      <MyStatusBar />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text style={Fonts.White16Bold}>{tr('reports')}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 15 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() =>
            props.navigation.navigate('ReportsStack', {
              screen: 'Weekly',
            })
          }
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#63ffe9', //##63ffe9 https://coolors.co/palettes/trending
              borderRadius: 15,
              height: 55,
              width: 55,
              ...Default.shadow,
            }}
          >
            <MaterialCommunityIcons name='note' size={37} color={'#008000'} />
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>{tr('income')}</Text>
            <Text style={[{ fontSize: 12, color: Colors.disable }]}>{tr('incomeDesc')}</Text>
          </View>
          <Icon name='chevron-forward' size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 20 }]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() =>
            props.navigation.navigate('ReportsStack', {
              screen: 'Income',
            })
          }
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#50e1cb', //#c7f9cc https://coolors.co/palettes/trending
              borderRadius: 15,
              height: 55,
              width: 55,
              ...Default.shadow,
            }}
          >
            <FontAwesome6 name='filter-circle-dollar' size={30} color={'#008000'} />
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>{tr('incomeRange')}</Text>
            <Text style={[{ fontSize: 12, color: Colors.disable }]}>{tr('incomeRangeDesc')}</Text>
          </View>
          <Icon name='chevron-forward' size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 20 }]}></View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            props.navigation.navigate('ReportsStack', {
              screen: 'Payroll',
              params: {
                //payrollId,
                payrollId: 20,
              },
            });
            setNewNotification(null);
            setPayrollId(null);
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3ccdb7', //#c7f9cc https://www.fgruber.ch/projects/50-colorScheme/?hexColor=3ccdb7 //note-plus
              borderRadius: 15,
              height: 55,
              width: 55,
              ...Default.shadow,
            }}
          >
            <FontAwesome6 name='file-invoice-dollar' size={35} color={'#008000'} />
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>
              {tr('payroll')}
              {'     '}
              {newNotification && <MaterialIcons name='new-releases' size={20} color={Colors.red} />}
            </Text>

            <Text style={[{ fontSize: 12, color: Colors.disable }]}>{tr('payrollDesc')}</Text>
          </View>
          <Icon name='chevron-forward' size={24} color={Colors.black} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({});
