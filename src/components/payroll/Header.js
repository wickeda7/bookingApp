import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts, graphColors } from '@constants/style';
import Style from '@theme/style';
import moment from 'moment';
const Header = ({ startDate, endDate, firstName, lastName, commissionType, totalDeduct }) => {
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
          <Text style={[Fonts.Black15Regular]}> {commissionType ? commissionType : totalDeduct} </Text>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <Text style={[Fonts.Black14Medium]}>Date: </Text>
          <Text style={[Fonts.Black15Regular]}> {moment().format('L')} </Text>
        </View>
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
});
