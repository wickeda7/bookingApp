import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

const CheckInScreen = () => {
  useEffect(() => {
    console.log('CheckInScreen');
    return () => {
      console.log('CheckInScreen unmount');
    };
  }, []);
  return (
    <View>
      <Text style={{ color: 'green' }}>CheckInScreen</Text>
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({});
