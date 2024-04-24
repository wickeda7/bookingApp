import { StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import { formatPrice } from '@utils/helper';
import ModalContent from '../ModalContent';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { createPayroll, updatePayroll } from '@redux/actions/payrollAction';
const Summary = ({
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
  const [visible, setVisible] = useState(false);
  const { payrollSummary } = useSelector((state) => state.payroll);
  const dispatch = useDispatch();

  let finalDeduct = commissionType;
  if (commissionType === 'Salary' || commissionType === null) finalDeduct = storeTotalDeduct;
  const deduct = finalDeduct.split('/');

  let finalAmount = 0;
  const dataTip = payrollSummary.tips;
  const dataSubtotal = payrollSummary.subtotal;
  const invoiceIds = payrollSummary.invoiceIds; /// if invoiceIds.length === 0  payroll already created
  const signature = payrollSummary.signature;
  const payrollId = payrollSummary.payrollId;
  const payrollCreatedAt = payrollSummary.payrollCreatedAt;
  const paid = payrollSummary?.paid;
  const deductAmount = dataSubtotal * (deduct[0] / 100);
  let tips = 0;
  if (dataTip > 0) {
    const tipAmount = dataTip * (storeTipDeduct / 100);
    tips = dataTip - tipAmount;
  }
  const today = moment().format('YYYY-MM-DD');
  const checkDate = () => {
    if (moment(endDate).isSame(today)) {
      runPayroll();
    } else {
      setVisible(true);
    }
  };
  const submitPayroll = () => {
    const data = {
      paid: true,
      paidDate: today,
    };
    dispatch(updatePayroll({ payrollId, data }));
  };
  const runPayroll = () => {
    const data = {
      startDate,
      endDate,
      commissionType,
      totalTip: dataTip,
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

    if (invoiceIds.length === 0) return;
    try {
      dispatch(createPayroll(data));
    } catch (error) {
      console.log('error runPayroll', error);
    }
  };

  const Salary = () => {
    const salary = userPerDay * totalWorkDays * 100;
    let compareText = '';

    if (dataSubtotal > salary) {
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
      </>
    );
  };

  return (
    <View style={[styles.border, { flexDirection: 'column', width: '92%', marginHorizontal: 13 }]}>
      <Modal animationType='fade' transparent={true} visible={visible}>
        <ModalContent
          title='Run Payroll'
          message='This is not the end of payroll period. Are you sure you want to run payroll?'
          setVisible={setVisible}
          okAction={runPayroll}
          okButtonTitle='Run Payroll'
        />
      </Modal>
      <View style={{ flexDirection: 'row', marginTop: Default.fixPadding }}>
        <Text style={[Fonts.Black14Bold]}>Total Tips: </Text>
        <Text style={[Fonts.Black14Medium]}> {formatPrice(dataTip)}</Text>
      </View>
      <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={[Fonts.Black14Bold]}>Total Amount: </Text>
        <Text style={[Fonts.Black14Medium]}> {formatPrice(dataSubtotal)}</Text>
        <Text style={[{ color: Colors.lightGrey, fontStyle: 'italic' }]}>
          {' '}
          @{finalDeduct} {formatPrice(deductAmount)}
        </Text>
      </View>
      <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
      {commissionType === 'Salary' && <Salary />}
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
      <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
      {signature ? (
        <>
          <View style={{ flexDirection: 'column', height: 130 }}>
            <Text style={[Fonts.Black14Bold, { marginBottom: 10 }]}>Signature: </Text>
            <Image
              source={{ uri: signature }}
              style={{ width: '100%', height: '100%', resizeMode: 'stretch', borderRadius: 10 }}
            />
          </View>
          <View style={[Style.divider, { marginTop: 3, marginBottom: Default.fixPadding }]} />
          {!paid && (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: Default.fixPadding * 2 }}>
              <TouchableOpacity
                onPress={() => submitPayroll()}
                style={[
                  Style.buttonStyle,
                  {
                    paddingVertical: 4,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 135,
                    height: 35,
                    marginHorizontal: 10,
                    backgroundColor: Colors.success,
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
                  Submit Payroll
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: Default.fixPadding * 2 }}>
          {!payrollId ? (
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
          ) : (
            <View style={[Style.infoAlert, { flexDirection: 'row' }]}>
              <Ionicons name={'information-circle'} size={18} color={Colors.info} />
              <Text style={[Style.infoText, { marginLeft: 5 }]}>
                Created on {moment(payrollCreatedAt).format('L')}. Waiting for confirmation.{' '}
              </Text>
            </View>
          )}
        </View>
      )}
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
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
  },
});
