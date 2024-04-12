import { StyleSheet, Text, TouchableOpacity, View, Platform, Image } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import RNFS from 'react-native-fs';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import Signature from 'react-native-signature-canvas';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { payroll } from '@api/payroll';

const CaptureSignature = ({ setScrollEnabled, payrollId, userId, signature, storeId }) => {
  const ref = useRef();
  const [signatureImage, setSignatureImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSignatureImage(signature);
  }, [signature]);

  const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
  const createTempImage = async (signature) => {
    try {
      let base64 = signature.replace('data:image/png;base64,', '');
      const fileName = `${payrollId}-${userId}-${Date.now()}.png`;
      const path = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
      await RNFS.writeFile(path, base64, 'base64');

      const image = {
        uri: Platform.OS == 'ios' ? path : 'file://' + path,
        name: fileName,
        type: 'image/png',
      };

      return image;
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleOK = async (signature) => {
    setLoading(true);
    const image = await createTempImage(signature);
    const res = await payroll.uploadSignature(image, payrollId, userId);
    if (res) {
      setSignatureImage(res[0].url);
    }
    setLoading(false);
    await payroll.sendMessage({ payrollId, userId, storeId });
  };

  const handleEmpty = () => {
    console.log('Empty');
  };
  const handleConfirm = () => {
    console.log('end');
    ref.current.readSignature();
  };
  const clear = () => {
    ref.current.clearSignature();
  };
  return (
    <>
      <View style={[{ flexDirection: 'column', width: '100%' }]}>
        <View style={[styles.border, {}]}>
          <Text style={{ marginTop: 10, marginLeft: 10 }}>Signature:</Text>
          <View style={[{ height: 110 }]}>
            {signatureImage ? (
              <Image
                source={{ uri: signatureImage }}
                style={{ width: 350, height: 101, marginTop: 15 }}
                resizeMode='stretch'
              />
            ) : (
              <Signature
                onOK={handleOK}
                onEmpty={handleEmpty}
                descriptionText='Sign'
                clearText='Clear'
                confirmText='Save'
                webStyle={style}
                onBegin={() => setScrollEnabled(false)}
                onEnd={() => setScrollEnabled(true)}
                ref={ref}
              />
            )}
          </View>
        </View>
        <View style={[style.row, { paddingVertical: Default.fixPadding * 2, alignItems: 'center' }]}>
          <View style={[{ flexDirection: 'row', flex: 1, justifyContent: 'center' }]}>
            {signatureImage === null && (
              <>
                <TouchableOpacity
                  onPress={() => clear()}
                  style={[
                    Style.buttonStyle,

                    {
                      paddingVertical: 0,
                      marginTop: 0,
                      flexDirection: 'row',
                      width: 100,
                      height: 40,
                      marginHorizontal: 10,
                      flex: 1,
                      backgroundColor: Colors.info,
                    },
                  ]}
                >
                  <Ionicons name={'close-sharp'} size={25} color={Colors.white} />
                  <Text
                    style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.white, fontFamily: 'Medium' }]}
                  >
                    Clear
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleConfirm()}
                  disabled={loading}
                  style={[
                    Style.buttonStyle,
                    {
                      paddingVertical: 0,
                      marginTop: 0,
                      flexDirection: 'row',
                      width: 100,
                      height: 40,
                      marginHorizontal: 10,
                      flex: 1,
                      backgroundColor: Colors.success,
                      opacity: loading ? 0.3 : 1,
                    },
                  ]}
                >
                  <Ionicons name={'checkmark-sharp'} size={25} color={Colors.white} />
                  <Text
                    style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.white, fontFamily: 'Medium' }]}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default CaptureSignature;

const styles = StyleSheet.create({
  border: {
    borderColor: Colors.success,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: Colors.success,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    width: '100%',
    height: 150,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
  },
});
