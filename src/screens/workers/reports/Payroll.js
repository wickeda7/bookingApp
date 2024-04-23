import { ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Default, DefaultImage } from '@constants/style';
import Style from '@theme/style';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffPayrollData } from '@redux/actions/payrollAction';
import Loader from '@components/loader';
import Header from '@components/payroll/Header';
import Table from '@components/payroll/Table';
import Summary from '@components/workers/Summary';
import CaptureSignature from '@components/workers/Signature';
import { useAuthContext } from '@contexts/AuthContext';

const Payroll = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`reports:${key}`);
  }
  const { navigation, route } = props;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { userData } = useAuthContext();
  const {
    id: userId,
    storeEmployee: { id: storeId },
    userInfo: { firstName, lastName },
  } = userData;
  const payrollId = route.params?.payrollId;
  const dispatch = useDispatch();
  const { staffPayroll, isLoading } = useSelector((state) => state.payroll);
  useEffect(() => {
    dispatch(getStaffPayrollData({ payrollId, userId, storeId }));
  }, []);
  const checkInvoice = (item) => {
    const { date, specialistId, subtotal, tips } = item;
    if (specialistId !== userId) return;
    props.navigation.navigate('ReportsStack', {
      screen: 'Invoices',
      params: {
        date,
        specialistId,
        storeId,
        subtotal,
        tips,
      },
    });
  };
  return (
    <View style={{ backgroundColor: Colors.white, height: '100%' }}>
      <Loader visible={isLoading} />
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={Style.navBackButton} onPress={() => props.navigation.navigate('reports')}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>Report</Text>
      </View>
      <View
        style={{
          paddingHorizontal: Default.fixPadding,
          marginVertical: Default.fixPadding,
          flex: 1,
        }}
      >
        {staffPayroll && (
          <>
            <Header
              startDate={staffPayroll.startDate}
              endDate={staffPayroll.endDate}
              firstName={firstName}
              lastName={lastName}
              commissionType={staffPayroll.commissionType}
              totalDeduct={''}
              payrollCreatedAt={staffPayroll.createdAt}
              paidDate={staffPayroll.paidDate}
            />
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={scrollEnabled}>
              <View style={{ flexDirection: 'column', height: 'auto', backgroundColor: Colors.white }}>
                <View style={[styles.row, { flex: 1 }]}>
                  <Table data={staffPayroll.payrollData} detail={checkInvoice} />
                </View>
                <View style={[styles.row, { flex: 1 }]}>
                  <Summary
                    commissionType={staffPayroll.commissionType}
                    totalTip={staffPayroll.totalTip}
                    totalAmount={staffPayroll.totalAmount}
                    deductAmount={staffPayroll.deductAmount}
                    deductPercent={staffPayroll.deductPercent}
                    finalTipAmount={staffPayroll.finalTipAmount}
                    tipPercent={staffPayroll.tipPercent}
                    userPerDay={staffPayroll.payPerDay}
                    totalWorkDays={staffPayroll.payrollData.length}
                  />
                </View>
                <View style={[styles.row, { flex: 1, backgroundColor: Colors.white }]}>
                  <CaptureSignature
                    setScrollEnabled={setScrollEnabled}
                    payrollId={payrollId}
                    userId={userId}
                    signature={staffPayroll.signature}
                    storeId={storeId}
                  />
                </View>
                <View style={[styles.row, { margin: Default.fixPadding * 4, backgroundColor: Colors.white }]}></View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};

export default Payroll;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
  },
});
