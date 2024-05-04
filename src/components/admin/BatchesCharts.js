import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';

import { LineChart } from 'react-native-gifted-charts';

const BatchesCharts = ({ servicesData, amountData, additionalData, tipsData }) => {
  const [graph, setGraph] = useState(null);
  useEffect(() => {
    setGraph({ data: amountData, color: '#ce2b13', dataPointsColor: '#a80706', textColor: '#a80706' });
  }, []);

  const updateGrapp = (type) => {
    switch (type) {
      case 'additional':
        setGraph({ data: additionalData, color: '#3434c0', dataPointsColor: '#1f1f7a', textColor: '#1f1f7a' });
        break;
      case 'tips':
        setGraph({ data: tipsData, color: '#cfa835', dataPointsColor: '#a07f07', textColor: '#a07f07' });
        break;
      case 'total':
        setGraph({ data: amountData, color: '#ce2b13', dataPointsColor: '#a80706', textColor: '#a80706' });
        break;
      case 'services':
        setGraph({ data: servicesData, color: '#207a0d', dataPointsColor: '#207a0d', textColor: '#207a0d' });
      default:
        break;
    }
  };
  const renderTitle = () => {
    return (
      <View style={{ marginBottom: 30 }}>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Total Amount, Additional Amount, Tips, Services
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 24,
            backgroundColor: 'yellow',
          }}
        >
          <TouchableOpacity onPress={() => updateGrapp('additional')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#3434c0',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  width: 65,
                  height: 16,
                  color: '#3434c0',
                }}
              >
                Additional
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateGrapp('tips')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#cfa835',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  width: 60,
                  height: 16,
                  color: '#cfa835',
                }}
              >
                Tips
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateGrapp('total')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#ce2b13',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  width: 60,
                  height: 16,
                  color: '#ce2b13',
                }}
              >
                Total
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateGrapp('services')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#207a0d',
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  width: 60,
                  height: 16,
                  color: '#207a0d',
                }}
              >
                Services
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ borderColor: '#2557e5', borderWidth: 1, padding: 10 }}>
      {renderTitle()}
      <LineChart
        data={graph?.data}
        color1={graph?.color}
        dataPointsColor1={graph?.dataPointsColor}
        textColor1={graph?.textColor}
        height={300}
        showVerticalLines
        spacing={60}
        dataPointsHeight={6}
        dataPointsWidth={6}
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
        isAnimated
      />
      {/* <LineChart
        data={amountData}
        color1='#ce2b13'
        dataPointsColor1='#a80706'
        textColor1='#a80706'
        data2={additionalData}
        color2='#cfa835'
        dataPointsColor2='#a07f07'
        textColor2='#a07f07'
        data3={tipsData}
        color3='#3434c0'
        dataPointsColor3='#1f1f7a'
        textColor3='#1f1f7a'
        height={300}
        showVerticalLines
        spacing={60}
        dataPointsHeight={6}
        dataPointsWidth={6}
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
        isAnimated
      /> */}
    </View>
  );
};

export default BatchesCharts;

const styles = StyleSheet.create({});
