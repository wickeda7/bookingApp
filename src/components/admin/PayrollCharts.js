import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { BarChart } from 'react-native-gifted-charts';

const PayrollCharts = () => {
  const barData = [
    { value: 4260, label: 'May', frontColor: '#90ffff' },
    { value: 4088, label: 'Jun', frontColor: '#7cf1ff' },
    { value: 3911, label: 'Jul', frontColor: '#68ddff' },
    { value: 3200, label: 'Aug', frontColor: '#54c9fe' },
    { value: 3720, label: 'Sept', frontColor: '#40b5ea' },
    { value: 3720, label: 'Otc', frontColor: '#2ca1d6' },
    { value: 3200, label: 'Nov', frontColor: '#188dc2' },
    { value: 3290, label: 'Dec', frontColor: '#0479ae' },
    { value: 4430, label: 'Jan', frontColor: '#00659a' },
    { value: 4080, label: 'Feb', frontColor: '#005186' },
    { value: 3195, label: 'Mar', frontColor: '#003d72' },
    { value: 2250, label: 'Apr', frontColor: '#00295e' },
  ];
  return (
    <View
      style={{ flexDirection: 'row', paddingHorizontal: Default.fixPadding * 2, marginVertical: Default.fixPadding }}
    >
      <BarChart
        showFractionalValue
        showYAxisIndices
        noOfSections={4}
        maxValue={6000}
        data={barData}
        spacing={28}
        isAnimated
      />
    </View>
  );
};

export default PayrollCharts;

const styles = StyleSheet.create({});
