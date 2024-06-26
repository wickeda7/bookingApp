import { Button, StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState } from 'react';
import ExternalDisplay, { useExternalDisplay } from 'react-native-external-display';
import { useAdminContext } from '@contexts/AdminContext';
import TotalScreen from '../frontScreen/TotalScreen';
import CheckInScreen from '../frontScreen/CheckInScreen';
import { GestureHandlerRootView, Swipeable, TouchableOpacity, RectButton } from 'react-native-gesture-handler';
const ExternalScreen = () => {
  const screens = useExternalDisplay();
  const { showExtend } = useAdminContext();

  const info = useExternalDisplay();
  const [on, setOn] = useState(true);
  const [screen, setScreen] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <ExternalDisplay
        mainScreenStyle={{
          flex: 1,
        }}
        fallbackInMainScreen={false}
        screen={on && (screen || Object.keys(info)[0])}
      >
        <View>{showExtend ? <TotalScreen /> : <CheckInScreen />}</View>
      </ExternalDisplay>
    </View>
  );
};

export default ExternalScreen;

const styles = StyleSheet.create({});
