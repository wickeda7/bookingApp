import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import { useAuthContext } from '@contexts/AuthContext';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceByDate } from '@redux/actions/staffAction';
import Loader from '@components/loader';
import Accordion from '@components/Accordion';
const ListView = ({ selectedDate, navigation }) => {
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { invoiceByDate, weeklyTips, weeklyTotal, isLoading } = useSelector((state) => state.staff);

  const userId = userData?.id;
  const storeId = userData?.storeEmployee?.id;

  const from = selectedDate?.from ? `From ${moment(selectedDate.from).format('M/D/YY')}` : '';
  const to = selectedDate?.to ? ` to ${moment(selectedDate.to).format('M/D/YY')}` : '';
  useEffect(() => {
    if (selectedDate?.from && selectedDate?.to) {
      //console.log('fetch data', selectedDate.from, selectedDate.to, userId, storeId);
      dispatch(getInvoiceByDate({ from: selectedDate.from, to: selectedDate.to, userId, storeId }));
    }
  }, [selectedDate]);
  return (
    <>
      <Loader visible={isLoading} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Default.fixPadding,
          margin: Default.fixPadding,
        }}
      >
        <Text style={[Fonts.Black14Medium]}>
          {from} {to}
        </Text>
      </View>
      <View style={[Fonts.Divider, { backgroundColor: Colors.bord }]}></View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: Default.fixPadding }}>
        <Accordion data={invoiceByDate} type={'staff'} navigation={navigation} />
        {/* <Text style={[{ color: Colors.active, marginHorizontal: 20, marginTop: 15, fontSize: 16 }]}>
          Transaction Summary
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.primary, flex: 1, textAlign: 'center', fontSize: 12 }]}>Item type</Text>
          <Text style={[{ color: Colors.primary, flex: 1, textAlign: 'center', fontSize: 12 }]}>Sales qty</Text>
          <Text style={[{ color: Colors.primary, flex: 1, textAlign: 'center', fontSize: 12 }]}>Refund qty</Text>
          <Text style={[{ color: Colors.primary, flex: 1, textAlign: 'center', fontSize: 12 }]}>Gross total</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>Services</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>4</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>1</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>$650</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>Vouchers</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>3</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>0</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>$220</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>Total Sales</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>7</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>1</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>$870</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <Text style={[{ color: Colors.active, marginHorizontal: 20, marginTop: 15, fontSize: 16 }]}>
          Cash Movement Detail
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.primary, flex: 1, textAlign: 'center', fontSize: 12 }]}>Payment type</Text>
          <Text style={[{ color: Colors.primary, flex: 1, textAlign: 'center', fontSize: 12 }]}> Collected</Text>
          <Text style={[{ color: Colors.primary, flex: 1, textAlign: 'center', fontSize: 12 }]}> Refunds paid</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>Cash</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>$650</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}> $0.00</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>Other</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>$220</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}> $0.00</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>Others</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>$220</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}> $0.00</Text>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}
        >
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>VoucherRedemptions</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}>$220</Text>
          <Text style={[{ color: Colors.black, flex: 1, textAlign: 'center', fontSize: 12 }]}> $0.00</Text>
        </View> */}
      </ScrollView>
    </>
  );
};

export default ListView;

const styles = StyleSheet.create({});
