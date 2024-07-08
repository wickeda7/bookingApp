import { createContext, useEffect, useState, useContext } from 'react';
import { BleManager } from 'react-native-ble-plx';

import { requestBluetoothPermissions } from '@utils/Permissions';
import Toast from 'react-native-root-toast';
import { Colors } from '@constants/style';
import { TextEncoder } from 'text-encoding';
import { Buffer } from 'buffer';
import { BLEService } from '@services/BLEService';
import { SERVICE_UUID, CHARACTERISTIC_UUID, deviceName } from '@constants/settings';

const END_OF_DATA = 'END_OF_DATA';
let connectOptions = {
  requestMTU: 512,
};
const deviceNotConnectedErrorText = 'Device is not connected';

const AdminContext = createContext({});

const AdminContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [imageType, setImageType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [storeInfo, setStoreInfo] = useState({});
  const [storeServices, setStoreServices] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [amountPerTurn, setAmountPerTurn] = useState(null);
  const [setTurn, setSetTurn] = useState(null);
  const [newService, setNewService] = useState(null);

  const [isConnected, setIsConnected] = useState(false); // device is connected or not
  const [device, setDevice] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [totalView, setTotalView] = useState(false); /// totalView is showing or not
  let messageToSend = null;

  let subOnDisconnected = null;
  let moniterCharacteristic = null;

  // useEffect(() => {
  //   if (!manager) return;
  //   const initBluetooth = async () => {
  //     const granted = await requestBluetoothPermissions();
  //     if (!granted) {
  //       showToast(`Permission denied: Bluetooth permissions are required to use this app.`, Colors.red);
  //       return;
  //     }
  //   };

  //   initBluetooth();

  //   return () => {
  //     // subscription.remove();
  //     subOnDisconnected && subOnDisconnected.remove();
  //     moniterCharacteristic && moniterCharacteristic.remove();
  //     manager.stopDeviceScan();
  //     manager.destroy();
  //   };
  // }, [manager]);

  const showToast = (message, color) => {
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
  };

  const startScan = async (data) => {
    console.log('startScan data', data);
    if (isConnected) {
      console.log('isConnected sendData!!!!!!');
      sendData(data);
      return;
    }
    try {
      const init = await BLEService.initializeBLE();
      if (!init) {
        showToast('Bluetooth is not enabled.', Colors.red);
        return;
      }

      const granted = await BLEService.requestBluetoothPermission();
      if (!granted) {
        showToast('Bluetooth permission is required.', Colors.red);
        return;
      }
      const device = await BLEService.scanDevices(deviceName, null, true);
      if (!device) {
        showToast('Device not found.', Colors.red);
        return;
      }
      const connectedDevice = await BLEService.connectToDevice(device).then((device) => {
        setDevice(device);
        console.log('device connectedDevice then', device.id);
        return device.discoverAllServicesAndCharacteristics();
      });
      if (!connectedDevice) {
        showToast('Connection failed.', Colors.red);
        return;
      }
      /// setIsConnected(true); uncomment this line later
      const mtuRequest = await BLEService.requestMTUForDevice(connectOptions.requestMTU);
      if (!mtuRequest) {
        showToast('MTU negotiation failed.', Colors.red);
        return;
      }
      setIsConnected(true);
      await setupNotification();
      setupDisconnectListener(); // Setup listener for disconnection
      sendData(data);
    } catch (error) {
      console.error('Error scanning device:', error);
      showToast(`Error scanning device: ${error}`, Colors.red);
    }
  };

  const setupNotification = () => {
    new Promise((resolve, reject) => {
      BLEService.setupMonitorService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        (async (error) => {
          console.error(error);
          await BLEService.finishMonitor();
          reject(error);
        },
        async (characteristic) => {
          const decodedData = Buffer.from(characteristic.value, 'base64').toString('utf-8');
          const data = JSON.parse(decodedData);

          if ('totalView' in data) {
            setTotalView(data.totalView);
          } else {
            setTotalView(true);
            // setReceivedData(data);
          }
          await BLEService.finishMonitor();
          console.info('success');
          resolve();
        })
      );
    });
  };

  const setupDisconnectListener = () => {
    const onDeviceDisconnectedSubscription = BLEService.onDeviceDisconnected((device, error) => {
      if (error) {
        console.error(error);
        showToast(` ${error}`, Colors.red);
        onDeviceDisconnectedSubscription.remove();
      } else {
        setIsConnected(false);
        setTotalView(false);
        setDevice(null);
        showToast('Connection to the server has been lost.', Colors.red);
        onDeviceDisconnectedSubscription.remove();
      }
    });
  };
  const sendData = async (data) => {
    try {
      const jsonString = JSON.stringify(data);
      const bytes = new TextEncoder().encode(jsonString);
      const mtuSize = 517;
      const chunkSize = mtuSize - 3; // Subtract 3 bytes for the ATT protocol header
      const chunks = [];
      for (let i = 0; i < bytes.length; i += chunkSize) {
        chunks.push(bytes.slice(i, i + chunkSize));
      }
      console.log('sendData chunks');
      for (const chunk of chunks) {
        await BLEService.writeCharacteristicWithoutResponseForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          Buffer.from(chunk).toString('base64')
        );
      }
      // Send an end-of-data flag
      const endFlag = new TextEncoder().encode('END_OF_DATA');
      await BLEService.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        Buffer.from(endFlag).toString('base64')
      );
    } catch (error) {
      console.error(`Send error: ${error.message}`);
    }
  };

  const disconnectFromDevice = async () => {
    await manager
      .cancelDeviceConnection(device.id)
      .then((device) => {
        console.log(' Disconnect success: ', device.id);
      })
      .catch((error) => {
        console.log(' Disconnect Failed: ', error);
      });
  };

  const stopScan = () => {
    setIsConnected(false);
    //manager.stopDeviceScan();
  };

  const convertToBase64 = (obj) => {
    const jsonString = JSON.stringify(obj) + END_OF_DATA;
    const bytes = new TextEncoder().encode(jsonString); // Convert to byte array
    return Buffer.from(bytes).toString('base64');
  };

  const value = {
    visible,
    setVisible,
    imageType,
    setImageType,
    selectedImage,
    setSelectedImage,
    storeInfo,
    setStoreInfo,
    storeServices,
    setStoreServices,
    categoryId,
    setCategoryId,
    subCategoryId,
    setSubCategoryId,
    amountPerTurn,
    setAmountPerTurn,
    setTurn,
    setSetTurn,
    newService,
    setNewService,
    isConnected,
    setIsConnected,
    startScan,
    receivedData,
    sendData,
    disconnectFromDevice,
    totalView,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
