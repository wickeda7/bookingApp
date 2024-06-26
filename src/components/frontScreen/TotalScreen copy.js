import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useAdminContext } from '@contexts/AdminContext';
import Style from '@theme/style';
import { Default, Fonts, Colors } from '@constants/style';
import { formatPrice } from '@utils/helper';
import TotalView from '../TotalView';

const TotalScreen = () => {
  const { extendServices, extendTotal, extendTotalAdditional, extendSubTotal, extendTip } = useAdminContext();
  // useEffect(() => {
  //   console.log('TotalScreen', extendServices);
  //   console.log('extendTotal', extendTotal);
  //   console.log('extendTotalAdditional', extendTotalAdditional);
  //   console.log('extendSubTotal', extendSubTotal);
  //   console.log('extendTip', extendTip);
  //   return () => {
  //     console.log('TotalScreen unmount');
  //   };
  // }, []);
  if (extendServices === null) return null;
  return (
    <View style={[Style.contentContainer, { flexDirection: 'column' }]}>
      <View style={[Style.tableHeader, { flexDirection: 'row' }]}>
        <Text style={[Style.tableHeaderText15Medium, { flex: 4, marginLeft: 0 }]}>Service Name</Text>
        <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>Price</Text>
        <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>Additional</Text>
        <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>Total</Text>
      </View>
      {extendServices.map((service, index) => {
        const price = formatPrice(service.price * 100);
        const additional = service.additional ? formatPrice(service.additional * 100) : '';
        const total = service.additional ? formatPrice(service.price + service.additional * 100) : price;
        return (
          <View style={[Style.tableRow, { flexDirection: 'row' }]} key={index}>
            <Text style={[{ flex: 4 }]}>{service.name} </Text>
            <Text style={[{ flex: 1, marginLeft: 0 }]}>{price}</Text>
            <Text style={[{ flex: 1, marginLeft: 0 }]}>{additional}</Text>
            <Text style={[{ flex: 1, marginLeft: 0 }]}>{total}</Text>
          </View>
        );
      })}
      <View
        style={[
          Style.divider,
          {
            marginHorizontal: Default.fixPadding,
            flexDirection: 'row',
            width: '100%',
            marginVertical: Default.fixPadding,
          },
        ]}
      />
      <View style={[{ flexDirection: 'row', width: '100%' }]}>
        <View style={[{ flex: 1 }]}></View>
        <View style={[{ flex: 1, flexDirection: 'column' }]}>
          <TotalView
            subtotal={extendSubTotal}
            additional={extendTotalAdditional}
            total={extendTotal}
            editable={true}
            status={true}
          />
        </View>
      </View>
      <View style={[{ flexDirection: 'row', width: '100%' }]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderColor: 'red',
            borderWidth: 1,
          }}
          onPress={() => {
            console.log('setPayBy', 'cash!!!!!');
          }}
        >
          <Text style={[Fonts.Black15Medium, { marginTop: 5, marginRight: 3, color: Colors.success }]}>
            Total in Cash:
          </Text>
        </TouchableOpacity>
        <Button
          title='Close'
          onPress={() => {
            console.log('fffff');
          }}
        />
        <Button title='React Native Button' onPress={() => alert('Working')} />
        <TouchableOpacity
          onPress={() => {
            alert('Working');
          }}
          style={{ padding: 8 }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Gesture Handler Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TotalScreen;

const styles = StyleSheet.create({});
