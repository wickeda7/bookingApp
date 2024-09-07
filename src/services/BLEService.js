import { BleErrorCode, BleManager, State as BluetoothState, LogLevel } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';
//import Toast from 'react-native-toast-message';
import Toast from 'react-native-root-toast';
const deviceNotConnectedErrorText = 'Device is not connected';
class BLEServiceInstance {
  manager = null;
  device = null;
  characteristicMonitor = null;
  isCharacteristicMonitorDisconnectExpected = false;
  data = [];

  constructor() {
    this.device = null;
    this.characteristicMonitor = null;
    this.manager = new BleManager();
    this.manager.setLogLevel(LogLevel.Verbose);
  }

  createNewManager = () => {
    this.manager = new BleManager();
    this.manager.setLogLevel(LogLevel.Verbose);
  };

  getDevice = () => this.device;
  setData = (data) => {
    this.data.push(data);
  };
  getData = () => this.data;
  initializeBLE = () =>
    new Promise((resolve) => {
      const subscription = this.manager.onStateChange((state) => {
        switch (state) {
          case BluetoothState.Unsupported:
            break;
          case BluetoothState.PoweredOff:
            this.onBluetoothPowerOff();
            this.manager.enable().catch((error) => {
              if (error.errorCode === BleErrorCode.BluetoothUnauthorized) {
                this.requestBluetoothPermission();
              }
            });
            break;
          case BluetoothState.Unauthorized:
            this.requestBluetoothPermission();
            break;
          case BluetoothState.PoweredOn:
            resolve(true);
            subscription.remove();
            break;
          default:
            console.error('Unsupported state: ', state);
          // resolve()
          // subscription.remove()
        }
      }, true);
    });

  disconnectDevice = () => {
    console.log('disconnectDevice', this.device);
    if (!this.device) {
      throw new Error(deviceNotConnectedErrorText);
    }
    return this.manager.cancelDeviceConnection(this.device.id).catch((error) => {
      if (error?.code !== BleErrorCode.DeviceDisconnected) {
        this.onError(error);
      }
    });
  };

  disconnectDeviceById = (id) =>
    new Promise((resolve, reject) => {
      this.manager
        .cancelDeviceConnection(id)
        .then(() => {
          resolve('Device disconnected');
        })
        .catch((error) => {
          if (error?.code !== BleErrorCode.DeviceDisconnected) {
            this.onError(error);
            reject(error);
          }
        });
    });

  onBluetoothPowerOff = () => {};

  scanDevices = (deviceName, UUIDs, legacyScan) => {
    return new Promise((resolve, reject) => {
      this.manager.startDeviceScan(UUIDs, { legacyScan }, (error, device) => {
        if (error) {
          this.onError(error);
          console.error('error', error.message);
          this.manager.stopDeviceScan();
          reject(error);
        }
        if (device && device.name === deviceName) {
          this.manager.stopDeviceScan();
          this.device = device;
          console.log('device', device.name, device.id);
          resolve(device);
        }
        setTimeout(() => {
          this.manager.stopDeviceScan();
          reject('Device not found');
        }, 1000 * 60 * 3);
      });
    });
  };

  connectToDevice = (pickedDevice) =>
    new Promise((resolve, reject) => {
      this.manager
        .connectToDevice(pickedDevice.id)
        .then((device) => {
          this.device = device;
          console.log('connectToDevice success', device.id);
          resolve(device);
        })
        .catch((error) => {
          if (error.errorCode === BleErrorCode.DeviceAlreadyConnected && this.device) {
            resolve(this.device);
          } else {
            if (error.errorCode === '201') {
            }
            // this.restart(pickedDevice);
            this.onError(error);
            reject(error);
          }
        });
    });

  discoverAllServicesAndCharacteristics = async (device) => {
    new Promise((resolve, reject) => {
      device
        .discoverAllServicesAndCharacteristics()
        .then((device) => {
          resolve(device);
          this.device = device;
        })
        .catch((error) => {
          this.onError(error);
          reject(error);
        });
    });
  };
  discoverAllServicesAndCharacteristicsForDevice = async () =>
    new Promise((resolve, reject) => {
      if (!this.device) {
        reject(new Error(deviceNotConnectedErrorText));
        return;
      }
      this.manager
        .discoverAllServicesAndCharacteristicsForDevice(this.device.id)
        .then((device) => {
          resolve(device);
          this.device = device;
        })
        .catch((error) => {
          this.onError(error);
          reject(error);
        });
    });
  readCharacteristicForDevice = async (serviceUUID, characteristicUUID) =>
    new Promise((resolve, reject) => {
      if (!this.device) {
        reject(new Error(deviceNotConnectedErrorText));
        return;
      }
      this.manager
        .readCharacteristicForDevice(this.device.id, serviceUUID, characteristicUUID)
        .then((characteristic) => {
          resolve(characteristic);
        })
        .catch((error) => {
          this.onError(error);
        });
    });

  writeCharacteristicWithResponseForDevice = async (serviceUUID, characteristicUUID, time) => {
    if (!this.device) {
      throw new Error(`writeCharacteristicWithResponseForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager
      .writeCharacteristicWithResponseForDevice(this.device.id, serviceUUID, characteristicUUID, time)
      .catch((error) => {
        this.onError(error);
      });
  };

  writeCharacteristicWithoutResponseForDevice = async (serviceUUID, characteristicUUID, time) => {
    if (!this.device) {
      throw new Error(`writeCharacteristicWithoutResponseForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager
      .writeCharacteristicWithoutResponseForDevice(this.device.id, serviceUUID, characteristicUUID, time)
      .catch((error) => {
        this.onError(error);
      });
  };

  writeCharacteristicWithResponseForService = async (serviceUUID, characteristicUUID, time) => {
    if (!this.device) {
      throw new Error(`writeCharacteristicWithResponseForService: ${deviceNotConnectedErrorText}`);
    }
    return this.device
      .writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, time)
      .catch((error) => {
        this.onError(error);
      });
  };

  writeCharacteristicWithoutResponseForService = async (serviceUUID, characteristicUUID, data) => {
    if (!this.device) {
      throw new Error(`writeCharacteristicWithoutResponseForService: ${deviceNotConnectedErrorText}`);
    }
    return this.device
      .writeCharacteristicWithoutResponseForService(serviceUUID, characteristicUUID, data)
      .catch((error) => {
        this.onError(error);
      });
  };
  setupMonitorService = (serviceUUID, characteristicUUID, onCharacteristicReceived, onError) => {
    if (!this.device) {
      throw new Error(`setupMonitorService: ${deviceNotConnectedErrorText}`);
    }
    this.characteristicMonitor = this.device.monitorCharacteristicForService(
      serviceUUID,
      characteristicUUID,
      (error, characteristic) => {
        if (error) {
          console.error('error????1', error);
          if (error.errorCode === 2 && this.isCharacteristicMonitorDisconnectExpected) {
            this.isCharacteristicMonitorDisconnectExpected = false;
            return;
          }
          console.error('error????2', error);
          onError(error);
          if (!hideErrorDisplay) {
            this.onError(error);
            console.error('error????3', error);
            this.characteristicMonitor?.remove();
          }
          return;
        }
        if (characteristic) {
          onCharacteristicReceived(characteristic);
          return;
        }
      }
    );
  };

  setupMonitor = (
    serviceUUID,
    characteristicUUID,
    onCharacteristicReceived,
    onError,
    transactionId,
    hideErrorDisplay
  ) => {
    if (!this.device) {
      throw new Error(`setupMonitor: ${deviceNotConnectedErrorText}`);
    }
    this.characteristicMonitor = this.manager.monitorCharacteristicForDevice(
      this.device?.id,
      serviceUUID,
      characteristicUUID,
      (error, characteristic) => {
        if (error) {
          console.error('error????3', error);
          if (error.errorCode === 2 && this.isCharacteristicMonitorDisconnectExpected) {
            console.error('error????4', error);
            this.isCharacteristicMonitorDisconnectExpected = false;
            return;
          }
          onError(error);
          console.error('error????5', error);
          if (!hideErrorDisplay) {
            this.onError(error);
            console.error('error????6', error);
            this.characteristicMonitor?.remove();
          }
          return;
        }
        if (characteristic) {
          onCharacteristicReceived(characteristic);
        }
      },
      transactionId
    );
  };

  setupCustomMonitor = (...args) => this.manager.monitorCharacteristicForDevice(...args);

  finishMonitor = () => {
    this.isCharacteristicMonitorDisconnectExpected = true;
    this.characteristicMonitor?.remove();
  };

  writeDescriptorForDevice = async (serviceUUID, characteristicUUID, descriptorUUID, data) => {
    if (!this.device) {
      throw new Error(`writeDescriptorForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager
      .writeDescriptorForDevice(this.device.id, serviceUUID, characteristicUUID, descriptorUUID, data)
      .catch((error) => {
        this.onError(error);
      });
  };

  readDescriptorForDevice = async (serviceUUID, characteristicUUID, descriptorUUID) => {
    if (!this.device) {
      throw new Error(`readDescriptorForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager
      .readDescriptorForDevice(this.device.id, serviceUUID, characteristicUUID, descriptorUUID)
      .catch((error) => {
        this.onError(error);
      });
  };

  getServicesForDevice = () => {
    if (!this.device) {
      throw new Error(`getServicesForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.servicesForDevice(this.device.id).catch((error) => {
      this.onError(error);
    });
  };

  getCharacteristicsForDevice = (serviceUUID) => {
    if (!this.device) {
      throw new Error(`getCharacteristicsForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.characteristicsForDevice(this.device.id, serviceUUID).catch((error) => {
      this.onError(error);
    });
  };

  getDescriptorsForDevice = (serviceUUID, characteristicUUID) => {
    if (!this.device) {
      throw new Error(`getDescriptorsForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.descriptorsForDevice(this.device.id, serviceUUID, characteristicUUID).catch((error) => {
      this.onError(error);
    });
  };

  isDeviceConnected = () => {
    if (!this.device) {
      throw new Error(`isDeviceConnected: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.isDeviceConnected(this.device.id);
  };

  isDeviceWithIdConnected = (id) => this.manager.isDeviceConnected(id).catch(console.error('error????4'));

  getConnectedDevices = (expectedServices) => {
    if (!this.device) {
      throw new Error(`getConnectedDevices: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.connectedDevices(expectedServices).catch((error) => {
      this.onError(error);
    });
  };

  requestMTUForDevice = (mtu) => {
    if (!this.device) {
      throw new Error(`requestMTUForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.device.requestMTU(mtu).catch((error) => {
      this.onError(error);
    });
  };

  onDeviceDisconnected = (listener, device) => {
    console.log('onDeviceDisconnected', device);
    console.log('onDeviceDisconnected', this.device);
    if (!this.device) {
      throw new Error(`onDeviceDisconnected: ${deviceNotConnectedErrorText}`);
    }
    console.error('error????6', error);
    return this.device.onDisconnected(this.device, listener);
  };

  onDeviceDisconnectedCustom = (...args) => this.manager.onDeviceDisconnected(...args);

  readRSSIForDevice = () => {
    if (!this.device) {
      throw new Error(`readRSSIForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.readRSSIForDevice(this.device.id).catch((error) => {
      this.onError(error);
    });
  };

  getDevices = () => {
    if (!this.device) {
      throw new Error(`getDevices: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.devices([this.device.id]).catch((error) => {
      this.onError(error);
    });
  };

  cancelTransaction = (transactionId) => this.manager.cancelTransaction(transactionId);

  enable = () =>
    this.manager.enable().catch((error) => {
      this.onError(error);
    });

  disable = () =>
    this.manager.disable().catch((error) => {
      this.onError(error);
    });

  getState = () =>
    this.manager.state().catch((error) => {
      this.onError(error);
    });

  onError = (error) => {
    switch (error.errorCode) {
      case BleErrorCode.BluetoothUnauthorized:
        this.requestBluetoothPermission();
        break;
      case BleErrorCode.LocationServicesDisabled:
        break;
      default:
    }
  };

  requestConnectionPriorityForDevice = (priority) => {
    if (!this.device) {
      throw new Error(`requestConnectionPriorityForDevice: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.requestConnectionPriorityForDevice(this.device?.id, priority);
  };
  restart = (pickedDevice) => {
    try {
      setTimeout(() => {
        console.log('restart', pickedDevice.id, this.device?.id);
        this.disconnectDeviceById(pickedDevice.id);
        const device = this.manager.isDeviceConnected(pickedDevice.id);
      }, 1000);
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };
  cancelDeviceConnection = () => {
    if (!this.device) {
      throw new Error(`cancelDeviceConnection: ${deviceNotConnectedErrorText}`);
    }
    return this.manager.cancelDeviceConnection(this.device?.id);
  };

  requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    if (Platform.OS === 'android') {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31 && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }

    return false;
  };
}

//export const BLEService = new BLEServiceInstance();
export const BLEService = Platform.OS === 'android' ? new BLEServiceInstance() : null;
