import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts, graphColors } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { formatPrice } from '@utils/helper';
import Header from '@components/payroll/Header';
import Table from '@components/payroll/Table';
import Summary from '@components/payroll/Summary';
import { useSelector, useDispatch } from 'react-redux';

const PayrollInvoice = ({ employee, store, startDate, endDate }) => {
  const { employeePayroll, payrollSummary } = useSelector((state) => state.payroll);
  const {
    id: userId,
    userInfo: { firstName, lastName, perDay: userPerDay, totalDeduct: userDeduct, tipDeduct: userTipDeduct },
  } = employee;

  const { totalDeduct, tipDeduct, employee: storeEmployee, name } = store;
  const checkEmployee = storeEmployee.findIndex((item) => item.id === userId);
  const userPayrollId = employeePayroll[0].specialistId;
  const commissionType = userPerDay ? 'Salary' : userDeduct;

  const lastRow = employeePayroll.length - 1;

  if (userPayrollId !== userId)
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2,
          marginVertical: Default.fixPadding,
        }}
      >
        <Ionicons name={'warning'} size={20} color={Colors.red} />
        <Text style={{ color: Colors.red, fontSize: 16, marginLeft: 5 }}>
          There is no data for {firstName} {lastName} .
        </Text>
      </View>
    );
  if (checkEmployee === -1)
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2,
          marginVertical: Default.fixPadding,
        }}
      >
        <Ionicons name={'warning'} size={20} color={Colors.red} />
        <Text style={{ color: Colors.red, fontSize: 16, marginLeft: 5 }}>
          Are you sure {firstName} {lastName} is an employee of {name}?
        </Text>
      </View>
    );
  return (
    <View
      style={{
        paddingHorizontal: Default.fixPadding,
        marginVertical: Default.fixPadding,
      }}
    >
      <View style={{ flexDirection: 'column' }}>
        <Header
          startDate={startDate}
          endDate={endDate}
          firstName={firstName}
          lastName={lastName}
          commissionType={commissionType}
          totalDeduct={totalDeduct}
        />

        <View style={[styles.row]}>
          <View style={[styles.row, { flex: 1 }]}>
            <Table data={employeePayroll} />
          </View>
          <View style={[styles.row]}>
            <Summary
              data={payrollSummary}
              commissionType={commissionType}
              storeTotalDeduct={totalDeduct}
              storeTipDeduct={tipDeduct}
              userPerDay={userPerDay}
              totalWorkDays={employeePayroll.length}
              userDeduct={userDeduct}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PayrollInvoice;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
  },
});
