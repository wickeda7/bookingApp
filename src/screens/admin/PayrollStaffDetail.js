import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts, graphColors } from '@constants/style';
import Style from '@theme/style';
import moment from 'moment';
import { parseAccordionData2 } from '@utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@components/Accordion';
import { setEmployeePayroll } from '@redux/slices/payrollSlice';
const PayrollStaffDetail = ({ endDate, showGraph, payperiod }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`payroll:${key}`);
  }

  const { payrollData, isLoading, selectedEmployee } = useSelector((state) => state.payroll);
  const {
    id: userId,
    userInfo: { displayColor, firstName, lastName, perDay, totalDeduct: userDeduct },
  } = selectedEmployee;

  let days = 0;
  if (payperiod === 1) days = 7;
  if (payperiod === 2) days = 14;
  if (payperiod === 4) days = 30;
  const commission = userDeduct ? userDeduct : perDay;
  const invoices = payrollData[userId];
  const dispatch = useDispatch();
  useEffect(() => {
    if (accordionData.length > 0) {
      dispatch(setEmployeePayroll(accordionData));
    }
  }, [selectedEmployee]);
  const payWeekDates = [];
  let i = days;
  while (i--) {
    payWeekDates.push(moment(endDate).subtract(i, 'days').toISOString().split('T')[0]);
  }
  const { dates, total, tips } = invoices.reduce(
    (acc, item) => {
      const date = moment(item.testCreatedAt).format('DD');
      if (!acc.dates[item.testCreatedAt]) {
        acc.dates[item.testCreatedAt] = [];
      }
      acc.dates[item.testCreatedAt].push(item);
      acc.total += item.subtotal * 100;
      acc.tips += item.tips * 100;
      return acc;
    },
    { dates: {}, total: 0, tips: 0 }
  );
  const barData = [];
  const tempAccordionData = [];
  payWeekDates.forEach((date, index) => {
    const data = dates[date];
    const temp = {};
    if (data) {
      tempAccordionData.push({ date, data });
      temp.label = moment(date).format('ddd');
      const amount = data.reduce((acc, i) => acc + i.subtotal * 100, 0);
      temp.value = amount / 100;
    } else {
      temp.value = 0;
    }
    //temp.value = Math.floor(Math.random() * (400 - 100 + 1) + 100);
    temp.frontColor = graphColors[index];
    barData.push(temp);
  });
  const accordionData = parseAccordionData2(tempAccordionData);
  return (
    <>
      {showGraph && (
        <>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: Default.fixPadding * 2,
              marginVertical: Default.fixPadding,
            }}
          >
            <BarChart
              showFractionalValue
              showYAxisIndices
              noOfSections={4}
              maxValue={400}
              data={barData}
              spacing={25}
              isAnimated
            />
          </View>
          <View
            style={[
              Style.divider,
              { marginVertical: Default.fixPadding * 1.5, marginHorizontal: Default.fixPadding * 3 },
            ]}
          />
        </>
      )}
      <View
        style={{
          paddingHorizontal: Default.fixPadding * 2,
          marginTop: Default.fixPadding,
          marginBottom: Default.fixPadding * 10,
        }}
      >
        <Accordion data={accordionData} type={'staff'} />
      </View>
      <View
        style={{
          paddingHorizontal: Default.fixPadding * 2,
          marginTop: Default.fixPadding,
          marginBottom: Default.fixPadding * 10,
        }}
      ></View>
    </>
  );
};

export default PayrollStaffDetail;

const styles = StyleSheet.create({});
