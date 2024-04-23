import React from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import { Colors } from '@constants/style';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = () => {
  return (
    <View style={[styles.statusBar, { backgroundColor: Colors.primary }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={Colors.primary} barStyle='light-content' />
      </SafeAreaView>
    </View>
  );
};

export default MyStatusBar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
