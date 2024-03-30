import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import { BarChart } from 'react-native-gifted-charts';
import ListView from './ListView';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const GraphView = ({ selectedDate, navigation }) => {
  const from = selectedDate?.from ? `From ${moment(selectedDate.from).format('M/D/YY')}` : '';
  const to = selectedDate?.to ? ` to ${moment(selectedDate.to).format('M/D/YY')}` : '';
  const { invoiceByDate } = useSelector((state) => state.staff);
  const barData = invoiceByDate.reduce((acc, item) => {
    acc.push({
      value: item.total / 100,
      label: moment(item.title).format('D'),
      spacing: 2,
      labelWidth: 25,
      labelTextStyle: { color: 'gray' },
      frontColor: Colors.info,
    });
    acc.push({
      value: item.tips / 100,
      frontColor: Colors.success,
    });
    return acc;
  }, []);

  const renderTitle = () => {
    return (
      <View>
        <Text style={[Fonts.Black14Medium, { textAlign: 'center' }]}>
          {from} {to}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: Colors.info,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'lightgray',
              }}
            >
              Total
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: Colors.success,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: 'lightgray',
              }}
            >
              Tips
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={[
          {
            shadowColor: Colors.black,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
            backgroundColor: Colors.white,
            padding: 10,
            shadowColor: Colors.black,
            marginBottom: Default.fixPadding * 1.5,
          },
        ]}
      >
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: 'gray' }}
          noOfSections={3}
          maxValue={700}
        />
      </View>
      <ListView navigation={navigation} />
    </>
  );
};

export default GraphView;

const styles = StyleSheet.create({});
