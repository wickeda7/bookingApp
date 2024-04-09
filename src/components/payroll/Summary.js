import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import { formatPrice } from '@utils/helper';
import { payroll } from '@api/payroll';
import Loader from '@components/loader';
import ModalContent from '../ModalContent';
import Toast from 'react-native-root-toast';
import moment from 'moment';
const Summary = ({
  data,
  commissionType,
  storeTotalDeduct,
  storeTipDeduct,
  userPerDay,
  totalWorkDays,
  startDate,
  endDate,
  payrollData,
  storeId,
  specialistId,
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  let finalDeduct = commissionType;
  if (commissionType === 'Salary' || commissionType === null) finalDeduct = storeTotalDeduct;
  const deduct = finalDeduct.split('/');
  const deductAmount = data.subtotal * (deduct[0] / 100);
  let finalAmount = 0;
  const dataTip = data.tips;
  const dataSubtotal = data.subtotal;
  const invoiceIds = data.invoiceIds;
  let tips = 0;
  if (data.tips > 0) {
    const tipAmount = data.tips * (storeTipDeduct / 100);
    tips = data.tips - tipAmount;
  }

  const checkDate = () => {
    const today = moment().format('YYYY-MM-DD');
    if (moment(endDate).isSame(today)) {
      submitPayroll();
    } else {
      setVisible(true);
    }
  };
  const submitPayroll = async () => {
    const data = {
      startDate,
      endDate,
      commissionType,
      totalTips: dataTip,
      totalAmount: dataSubtotal,
      deductAmount,
      deductPercent: finalDeduct,
      payPerDay: userPerDay,
      finalTipAmount: tips,
      tipPercent: storeTipDeduct,
      payrollData,
      storeId,
      specialistId,
      invoices: invoiceIds,
    };

    // setLoading(true);
    console.log(data);
    if (invoiceIds.length === 0) return;
    try {
      const res = await payroll.createPayroll(data);
      console.log(res);
      setLoading(false);
      Toast.show('Payroll Created', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: Colors.success,
        onHidden: () => {},
      });
    } catch (error) {
      console.log('error submitPayroll', error);
      setLoading(false);
    }
  };

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
      <Loader visible={loading} />
      <Modal animationType='fade' transparent={true} visible={visible}>
        <ModalContent
          title='Run Payroll'
          message='This is not the end of payroll period. Are you sure you want to run payroll?'
          setVisible={setVisible}
          okAction={submitPayroll}
          okButtonTitle='Run Payroll'
        />
      </Modal>
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
          onPress={() => checkDate()}
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
