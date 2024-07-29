import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Default, Fonts, Colors } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SERVICE_UUID, CHARACTERISTIC_UUID, deviceName } from '@constants/settings';
import { useAdminContext } from '@contexts/AdminContext';
import Toast from 'react-native-root-toast';
import { useAuthContext } from '@contexts/AuthContext';

const Devices = (props) => {
  const { device, isConnected, scanConnect, disconnectFromDevice, sendData } = useAdminContext();
  const { userData } = useAuthContext();
  const storeId = userData.storeAdmin.id;
  const storeName = userData.storeAdmin.name;
  let statusText = '';
  let statusColor = '';
  let btnText = '';
  let btnColor = '';

  if (isConnected) {
    statusText = 'Connected';
    statusColor = Colors.success;
    btnText = 'Disconnect';
    btnColor = Colors.red;
  } else {
    statusText = 'Disconnected';
    statusColor = Colors.red;
    btnText = 'Connect';
    btnColor = Colors.success;
  }

  const showToast = (message, color) => {
    console.log('showToast message', message);
    try {
      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: color,
        // onHidden: () => {
        //   setAccessCode(false);
        // },
      });
    } catch (error) {
      console.error('Error showing toast:', error);
    }
  };

  const handleConnect = () => {
    if (!isConnected) {
      scanConnect(deviceName);
    } else {
      disconnectFromDevice(device.id);
    }
  };
  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <MyStatusBar />
      <View
        style={[
          Style.primaryNav,
          {
            alignItems: 'flex-start',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          style={[Style.navBackButton, { flexDirection: 'row' }]}
        >
          <Ionicons name={'arrow-back'} size={22} color={Colors.white} />
          <Text style={Fonts.White16Bold}>Devices</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={[
              Style.contentContainer,
              Style.borderBlue,
              {
                flexDirection: 'column',
                marginTop: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'flex-start',
              },
            ]}
          >
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name={'devices'} size={35} />
              <Text style={[Fonts.Black15Bold, { marginLeft: 5, marginTop: 14 }]}>Front Device</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={[Style.divider, { flex: 1 }]} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={[Fonts.Black15Medium, { marginRight: 5 }]}>Status: </Text>
              <Text style={[Fonts.Black15Medium, { color: statusColor }]}>{statusText}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => handleConnect()}
                style={[Style.buttonStyle, { backgroundColor: btnColor, width: 110 }]}
              >
                <Text style={[Fonts.White15Medium]}>{btnText} </Text>
              </TouchableOpacity>
            </View>
            {isConnected && (
              <>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <MaterialIcons name={'cloud-sync-outline'} size={35} />
                  <Text style={[Fonts.Black15Bold, { marginLeft: 5, marginTop: 14 }]}>Send Info To Device</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[Style.divider, { flex: 1 }]} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => sendData({ storeId, storeName })}
                    style={[Style.buttonStyle, { backgroundColor: Colors.info, width: 110 }]}
                  >
                    <Text style={[Fonts.White15Medium]}>Sync</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
        <View style={{ flex: 3, flexDirection: 'row' }}></View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Devices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropDown: {
    zIndex: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#00000066',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devicesList: { flex: 1 },
  btn: {
    backgroundColor: Colors.info,
    padding: 12,
    marginVertical: 5,
    borderRadius: 100,
    alignItems: 'center',
  },
});
