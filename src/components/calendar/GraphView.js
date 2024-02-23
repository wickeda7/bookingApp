import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import ListView from './ListView';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const GraphView = () => {
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
            backgroundColor: Colors.white,
            paddingHorizontal: 30,
            paddingTop: 20,
            shadowColor: Colors.black,
          },
        ]}
      >
        <Image
          source={require('@assets/images/a5.png')}
          resizeMode='stretch'
          style={{ height: height / 4, width: width - 40, marginTop: 30 }}
        ></Image>
      </View>
      <ListView type='graph' />
    </>
  );
};

export default GraphView;

const styles = StyleSheet.create({});
