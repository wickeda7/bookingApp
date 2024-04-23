import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';

const PayrollChartSummary = () => {
  return (
    <>
      <View
        style={[Style.divider, { marginVertical: Default.fixPadding, marginHorizontal: Default.fixPadding * 2.5 }]}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2.5,
          marginVertical: 3,
        }}
      >
        <View style={[{ width: 150 }]}>
          <Text style={[Fonts.Black14Bold]}>Total Monthly</Text>
        </View>
        <View>
          <Text style={[Fonts.Black14Bold]}>$11333.00</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2.5,
          marginVertical: 3,
        }}
      >
        <View style={[{ width: 150 }]}>
          <Text style={[Fonts.Black14Bold]}>Monthly Average</Text>
        </View>
        <View>
          <Text style={[Fonts.Black14Bold]}>$10123.00</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2.5,
          marginVertical: 3,
        }}
      >
        <View style={[{ width: 150 }]}>
          <Text style={[Fonts.Black14Bold]}>Total Yearly</Text>
        </View>
        <View>
          <Text style={[Fonts.Black14Bold]}>$91333.00</Text>
        </View>
      </View>
    </>
  );
};

export default PayrollChartSummary;

const styles = StyleSheet.create({});
