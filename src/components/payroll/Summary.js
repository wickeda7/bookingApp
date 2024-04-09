import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts, graphColors } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import { formatPrice } from '@utils/helper';
const Summary = ({ data, commissionType, storeTotalDeduct, storeTipDeduct, userPerDay, totalWorkDays, userDeduct }) => {
  let finalDeduct = commissionType;
  if (commissionType === 'Salary' || commissionType === null) finalDeduct = storeTotalDeduct;
  const deduct = finalDeduct.split('/');
  const deductAmount = data.subtotal * (deduct[0] / 100);
  let finalAmount = 0;

  let tips = 0;
  if (data.tips > 0) {
    const tipAmount = data.tips * (storeTipDeduct / 100);
    tips = data.tips - tipAmount;
  }

  const Salary = () => {
    const salary = userPerDay * totalWorkDays * 100;
    let compareText = '';

    if (data.subtotal > salary) {
      compareText = 'greater';
      finalAmount = deductAmount > salary ? deductAmount : salary;
    } else {
      compareText = 'less';
      finalAmount = salary;
    }

    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Fonts.Black14Bold]}>Total Work Days: </Text>
          <Text style={[Fonts.Black14Medium]}> {totalWorkDays}</Text>
        </View>
        <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Fonts.Black14Bold]}>Total Salary: </Text>
          <Text style={[Fonts.Black14Medium]}>
            {formatPrice(salary)} {'  '}
          </Text>
          <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}>
            {' '}
            @{formatPrice(userPerDay * 100)} / per Day
          </Text>
        </View>
        <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={[Style.infoAlert, { flexDirection: 'row' }]}>
            <Ionicons name={'information-circle'} size={18} color={Colors.info} />
            <Text style={[Style.infoText, { marginLeft: 5 }]}>Total amount is {compareText} than salary amount. </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Fonts.Black14Bold]}>Final Tip Amount: </Text>
          <Text style={[Fonts.Black14Medium]}>{formatPrice(tips)}</Text>
          <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}> @{storeTipDeduct}% deduction</Text>
        </View>
        <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Fonts.Black14Bold]}>Total Paid: </Text>
          <Text style={[Fonts.Black14Medium]}>{formatPrice(tips + finalAmount)}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={[styles.border, { flexDirection: 'column', width: '92%', marginHorizontal: 13 }]}>
      <View style={{ flexDirection: 'row', marginTop: Default.fixPadding }}>
        <Text style={[Fonts.Black14Bold]}>Total Tips: </Text>
        <Text style={[Fonts.Black14Medium]}> {formatPrice(data.tips)}</Text>
      </View>
      <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={[Fonts.Black14Bold]}>Total Amount: </Text>
        <Text style={[Fonts.Black14Medium]}> {formatPrice(data.subtotal)}</Text>
        <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}>
          {' '}
          @{finalDeduct} {formatPrice(deductAmount)}
        </Text>
      </View>
      <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
      {commissionType === 'Salary' ? (
        <Salary />
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[Fonts.Black14Bold]}>Final Tip Amount: </Text>
            <Text style={[Fonts.Black14Medium]}>{formatPrice(tips)}</Text>
            <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}> @{storeTipDeduct}% deduction</Text>
          </View>
          <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={[Fonts.Black14Bold]}>Total Paid: </Text>
            <Text style={[Fonts.Black14Medium]}>{formatPrice(tips + deductAmount)}</Text>
          </View>
        </>
      )}

      <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: Default.fixPadding * 2 }}>
        <TouchableOpacity
          onPress={() => setShowGraph((prev) => !prev)}
          style={[
            Style.buttonStyle,
            // Style.borderInfo,
            {
              paddingVertical: 4,
              marginTop: 0,
              flexDirection: 'row',
              width: 125,
              height: 35,
              marginHorizontal: 10,
              backgroundColor: Colors.info,
            },
          ]}
        >
          <Icon6 name={'file-invoice-dollar'} size={15} color={Colors.white} />
          <Text
            style={[
              Fonts.White14Bold,
              {
                paddingHorizontal: Default.fixPadding * 0.5,
              },
            ]}
          >
            Run Payroll
          </Text>
        </TouchableOpacity>
      </View>
      {/* 
      <View style={{ flexDirection: 'row' }}></View>
      <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
      <View style={{ flexDirection: 'row' }}></View> */}
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
