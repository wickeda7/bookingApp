import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import { formatPrice } from '@utils/helper';
import moment from 'moment';

const Summary = ({
  commissionType,
  totalTip,
  totalAmount,
  deductAmount,
  deductPercent,
  finalTipAmount,
  tipPercent,
  totalWorkDays,
  userPerDay,
}) => {
  return (
    <View style={[styles.border, { flexDirection: 'column', width: '95%', marginHorizontal: 13 }]}>
      <View style={{ flexDirection: 'row', marginTop: Default.fixPadding }}>
        <Text style={[Fonts.Black14Bold]}>Total Tips:</Text>
        <Text style={[Fonts.Black14Medium]}>{formatPrice(totalTip)}</Text>
      </View>
      <View style={[Style.divider, { marginTop: 3 }]} />
      <View style={{ flexDirection: 'row', marginTop: Default.fixPadding }}>
        <Text style={[Fonts.Black14Bold]}>Total Amount:</Text>
        <Text style={[Fonts.Black14Medium]}>{formatPrice(totalAmount)}</Text>
        <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}>
          {' '}
          @{deductPercent} {formatPrice(deductAmount)}
        </Text>
      </View>
      {commissionType === 'Salary' && (
        <>
          <View style={[Style.divider, { marginTop: 3 }]} />
          <View style={{ flexDirection: 'row', marginTop: Default.fixPadding }}>
            <Text style={[Fonts.Black14Bold]}>Total Work Days: </Text>
            <Text style={[Fonts.Black14Medium]}> {totalWorkDays}</Text>
          </View>
          <View style={[Style.divider, { marginTop: 3 }]} />
          <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding }}>
            <Text style={[Fonts.Black14Bold]}>Total Salary:</Text>
            <Text style={[Fonts.Black14Medium]}>{formatPrice(totalWorkDays * userPerDay * 100)}</Text>
            <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}>
              {' '}
              @{formatPrice(userPerDay * 100)} / per Day
            </Text>
          </View>
        </>
      )}
      <View style={[Style.divider, { marginTop: 3 }]} />
      <View style={{ flexDirection: 'row', marginTop: Default.fixPadding }}>
        <Text style={[Fonts.Black14Bold]}>Final Tip Amount:</Text>
        <Text style={[Fonts.Black14Medium]}>{formatPrice(finalTipAmount)}</Text>
        <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}> @{tipPercent}% deduction</Text>
      </View>
      <View style={[Style.divider, { marginTop: 3 }]} />
      <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding }}>
        <Text style={[Fonts.Black14Bold]}>Total Paid:</Text>
        <Text style={[Fonts.Black14Medium]}>{formatPrice(finalTipAmount + deductAmount)}</Text>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  border: {
    borderColor: '#00005f',
    borderWidth: 1,
    borderRadius: 10,
    padding: Default.fixPadding,
    shadowColor: '#00005f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
  },
});
