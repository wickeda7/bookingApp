import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useWorkersContext } from '@contexts/WorkersContext';
import { Colors, Fonts, Default } from '@constants/style';
import moment from 'moment';
const ListView = ({ type }) => {
  const { selectedDate } = useWorkersContext();
  const from = selectedDate?.from ? `From ${moment(selectedDate.from).format('M/D/YY')}` : '';
  const to = selectedDate?.to ? ` to ${moment(selectedDate.to).format('M/D/YY')}` : '';
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Default.fixPadding,
          margin: Default.fixPadding,
        }}
      >
        <Text style={[{ fontSize: 14, color: Colors.black, fontWeight: '700' }]}>
          {from}
          {to}
        </Text>
      </View>
      <View style={[Fonts.Divider, { backgroundColor: Colors.bord }]}></View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: Default.fixPadding }}>
        <Text style={[{ color: Colors.active, marginHorizontal: 20, marginTop: 15, fontSize: 16 }]}>
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
        </View>
      </ScrollView>
    </>
  );
};

export default ListView;

const styles = StyleSheet.create({});
