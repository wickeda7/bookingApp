import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import Loader from '@components/loader';
import { useAuthContext } from '@contexts/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import UnAuthorized from '@components/UnAuthorized';
import Header from '@components/table/Header';
import PayrollRow from '@components/admin/PayrollRow';
import moment from 'moment';
import { getDateOfMonth } from '@utils/helper';
import { getPayrollData } from '@redux/actions/payrollAction';
import { setSelectedEmployee, setEmployeePayroll } from '@redux/slices/payrollSlice';
import PayrollCharts from '@components/admin/PayrollCharts';
import PayrollChartSummary from '@components/admin/PayrollChartSummary';
import PayrollStaffDetail from './PayrollStaffDetail';
import { weekDaysObj } from '@constants/settings';
import PayrollInvoice from '@components/admin/PayrollInvoice';
import NotificationsHelper from '@utils/notifications';
const Payroll = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`payroll:${key}`);
  }

  const { userData } = useAuthContext();
  const { payrollData, isLoading, selectedEmployee } = useSelector((state) => state.payroll);
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [showGraph, setShowGraph] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setEmployees(userData?.storeAdmin?.employee);
    dispatch(getPayrollData({ storeId, startDate, endDate }));
  }, []);

  useEffect(() => {
    if (notification) {
      const { payrollId, userId, storeId: notiStoreId, type } = notification.request.content.data;
      if (type === 'PayrollConfirmation' && storeId === notiStoreId) {
        console.log('notification  Payroll notification.request.content.data', notification.request.content.data);
        dispatch(getPayrollData({ storeId, startDate, endDate }));
      }
    }
  }, [notification]);
  const header = [
    { size: 2, name: 'name' },
    { size: 1, name: 'commission' },
    { size: 1, name: 'total' },
    { size: 0.5, name: '' },
  ];

  const store = userData?.storeAdmin;
  const payperiod = store?.payperiod;
  const payperiod_date = store?.payperiod_date;
  const weekDay = weekDaysObj[payperiod_date];
  const payDate = getDateOfMonth(weekDay, payperiod);

  const totalDeduct = store?.totalDeduct;
  const lastRow = employees.length - 1;
  const storeId = store?.id;

  const endDate = payDate;
  const payWeekDates = [];

  let i = 13;
  while (i--) {
    payWeekDates.push(moment(endDate).subtract(i, 'days').toISOString().split('T')[0]);
  }
  const startDate = payWeekDates[0];

  const handleDisplayInvoice = (userId) => {
    if (!payrollData[userId]) return;
    if (selectedEmployee && userId === selectedEmployee.id) {
      setShowInvoice(true);
    }
  };

  const handlePress = (item) => {
    if (!payrollData[item.id]) return;
    const newEmployees = employees.map((employee) => {
      if (employee.id === item.id) {
        if (!employee.selected) {
          dispatch(setSelectedEmployee(employee));
          setShowInvoice(false);
        } else {
          dispatch(setSelectedEmployee(null));
          dispatch(setEmployeePayroll([]));
          setShowInvoice(false);
        }

        employee = { ...employee, selected: !employee.selected };
      } else {
        employee = { ...employee, selected: false };
      }
      return employee;
    });
    setEmployees(newEmployees);
  };

  if (userData?.role?.id !== 4) return <UnAuthorized />;

  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Loader visible={isLoading} />
      <NotificationsHelper setNotification={setNotification} />
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={Style.navBackButton}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>{tr('payroll')}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <View style={{ flexDirection: 'row', paddingVertical: Default.fixPadding }}>
                <Ionicons name={'calendar-number'} size={20} color={Colors.black} />
                <Text style={{ marginLeft: Default.fixPadding }}>
                  Pay Period {moment(startDate).format('L')} - {moment(endDate).format('L')}
                </Text>
              </View>
              <Header data={header} type={'payroll'} />
            </View>
          </View>
          <ScrollView style={{ width: '100%' }}>
            {Object.keys(payrollData).length > 0 &&
              employees?.map((employee, index) => (
                <TouchableOpacity onPress={() => handlePress(employee)} key={index}>
                  <PayrollRow
                    key={index}
                    data={employee}
                    payrollData={payrollData}
                    totalDeduct={totalDeduct}
                    setShowInvoice={setShowInvoice}
                    handleDisplayInvoice={handleDisplayInvoice}
                  />

                  {lastRow !== index && (
                    <View
                      style={[
                        Style.divider,
                        { marginVertical: Default.fixPadding, marginHorizontal: Default.fixPadding * 1.5 },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1.5 }}>
          <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <View style={{ flexDirection: 'row', paddingVertical: Default.fixPadding }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Octicons name={'graph'} size={20} color={Colors.black} />
                  <Text style={{ marginLeft: Default.fixPadding }}>{tr('payrollSummary')}</Text>
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row' }}>
                  {!showInvoice && (
                    <>
                      <TouchableOpacity
                        onPress={() => handleSetHours()}
                        style={[
                          Style.buttonStyle,
                          Style.borderInfo,
                          {
                            paddingVertical: 0,
                            marginTop: 0,
                            flexDirection: 'row',
                            width: 120,
                            height: 20,
                            marginHorizontal: 10,
                          },
                        ]}
                      >
                        <Ionicons name={'calendar-number-outline'} size={15} color={Colors.info} />
                        <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.info }]}>
                          {tr('quarterly')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSetHours()}
                        style={[
                          Style.buttonStyle,
                          Style.borderInfo,
                          {
                            paddingVertical: 0,
                            marginTop: 0,
                            flexDirection: 'row',
                            width: 120,
                            height: 20,
                            marginHorizontal: 10,
                          },
                        ]}
                      >
                        <Ionicons name={'calendar-number-outline'} size={15} color={Colors.info} />
                        <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.info }]}>
                          {tr('monthly')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowGraph((prev) => !prev)}
                        style={[
                          Style.buttonStyle,
                          showGraph ? Style.borderRed : Style.borderInfo,
                          {
                            paddingVertical: 0,
                            marginTop: 0,
                            flexDirection: 'row',
                            width: 125,
                            height: 20,
                            marginHorizontal: 10,
                          },
                        ]}
                      >
                        <Ionicons
                          name={showGraph ? 'eye-off-outline' : 'eye-outline'}
                          size={15}
                          color={showGraph ? Colors.red : Colors.info}
                        />
                        <Text
                          style={[
                            {
                              paddingHorizontal: Default.fixPadding * 0.5,
                              color: showGraph ? Colors.red : Colors.info,
                            },
                          ]}
                        >
                          {showGraph ? tr('hideGraph') : tr('showGraph')}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
          <ScrollView style={{ width: '100%' }}>
            {selectedEmployee ? (
              <>
                {showInvoice ? (
                  <PayrollInvoice employee={selectedEmployee} store={store} startDate={startDate} endDate={endDate} />
                ) : (
                  <PayrollStaffDetail payWeekDates={payWeekDates} showGraph={showGraph} />
                )}
              </>
            ) : (
              <>
                <PayrollCharts />
                <PayrollChartSummary />
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Payroll;

const styles = StyleSheet.create({});
