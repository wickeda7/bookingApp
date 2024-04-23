import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts, graphColors } from '@constants/style';
import Style from '@theme/style';
import moment from 'moment';
const width = Dimensions.get('screen').width;
const Header = ({ startDate, endDate, firstName, lastName, commissionType, payrollCreatedAt, paidDate }) => {
  const date = payrollCreatedAt ? moment(payrollCreatedAt).format('L') : moment().format('L');
  if (width < 500) {
    return (
      <>
        <View style={[styles.container, { flexDirection: 'column' }]}>
          <View style={[styles.rowSmall, { justifyContent: 'center', marginBottom: 10 }]}>
            <Text style={[Fonts.Black16Medium]}>
              Pay Period: {moment(startDate).format('L')} - {moment(endDate).format('L')}
            </Text>
          </View>
          <View style={[styles.rowSmall]}>
            <Text style={[Fonts.Black14Medium]}>Employee Name: </Text>
            <Text style={[Fonts.Black15Regular]}>
              {' '}
              {firstName} {lastName}{' '}
            </Text>
          </View>
          <View style={[styles.rowSmall]}>
            <Text style={[Fonts.Black14Medium]}>Commission Type: </Text>
            <Text style={[Fonts.Black15Regular]}> {commissionType} </Text>
          </View>
          <View style={[styles.rowSmall]}>
            <Text style={[Fonts.Black14Medium]}>Date: </Text>
            <Text style={[Fonts.Black15Regular]}> {date} </Text>
          </View>
          {paidDate && (
            <View style={[styles.rowSmall]}>
              <Text style={[Fonts.Black14Medium]}>Paid Date: </Text>
              <Text style={[Fonts.Black15Regular]}> {moment(paidDate).format('L')} </Text>
            </View>
          )}
          <View style={[Style.divider, { marginBottom: Default.fixPadding }]} />
          <View style={[styles.rowSmall]}>
            <View style={[Style.divider, { marginBottom: Default.fixPadding * 0.5 }]} />
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={[styles.row, { justifyContent: 'center' }]}>
        <Text style={[Fonts.Black16Medium]}>
          Pay Period: {moment(startDate).format('L')} - {moment(endDate).format('L')}
        </Text>
      </View>
      <View style={[styles.row, { justifyContent: 'space-between', marginTop: Default.fixPadding }]}>
        <View style={[{ flexDirection: 'row' }]}>
          <Text style={[Fonts.Black14Medium]}>Employee Name: </Text>
          <Text style={[Fonts.Black15Regular]}>
            {' '}
            {firstName} {lastName}{' '}
          </Text>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <Text style={[Fonts.Black14Medium]}>Commission Type: </Text>
          <Text style={[Fonts.Black15Regular]}> {commissionType} </Text>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <Text style={[Fonts.Black14Medium]}>Date: </Text>
          <Text style={[Fonts.Black15Regular]}> {date} </Text>
        </View>
        {paidDate && (
          <View style={[{ flexDirection: 'row' }]}>
            <Text style={[Fonts.Black14Medium]}>Paid Date: </Text>
            <Text style={[Fonts.Black15Regular]}> {moment(paidDate).format('L')}</Text>
          </View>
        )}
      </View>
      <View style={[Style.divider, { marginBottom: Default.fixPadding }]} />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
  },
  rowSmall: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  container: {
    height: 'auto',
  },
});
