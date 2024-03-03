import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import Style from '@theme/style';
import { useAuthContext } from '@contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@components/loader';
import { users } from '@api/users';
import Toast from 'react-native-root-toast';
const AccessCode = ({ setAccessCode }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`profileScreen:${key}`);
  }
  const [code, setCode] = useState('');
  const [visible, setVisible] = useState(false);
  const { userData, setUserData } = useAuthContext();
  const submit = async () => {
    const userId = userData.id;
    setVisible(true);
    try {
      const response = await users.getAccessCode(userId, code);
      if (!response.data) {
        setVisible(false);
        Toast.show(tr('invalidCode'), {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: Colors.red,
          onHidden: () => {
            setAccessCode(false);
          },
        });

        return;
      }
      setUserData(response.data);
      await AsyncStorage.setItem('@user', JSON.stringify(response.data));
      setAccessCode(false);
      setVisible(false);
    } catch (error) {
      setVisible(false);
      setAccessCode(false);
      console.log('error submit access code', error);
    }
  };
  return (
    <View
      style={{
        marginVertical: Default.fixPadding * 2,
        marginHorizontal: Default.fixPadding * 1.5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        ...Default.shadow,
      }}
    >
      <Loader visible={visible} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: Default.fixPadding * 1.5,
        }}
      >
        <MaterialIcons name='password' size={25} color={Colors.primary} style={{ marginRight: 10 }} />
        <Text style={Fonts.Primary16Bold}>{tr('enterCode')}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <TextInput
          style={[Style.inputStyle, { flex: 1, marginTop: 12 }]}
          onChangeText={(text) => setCode(text)}
          selectionColor={Colors.primary}
          value={code}
        />
        <TouchableOpacity
          onPress={() => submit()}
          style={[
            Style.buttonStyle,
            {
              backgroundColor: Colors.primary,
              width: 110,
              marginBottom: 10,
            },
          ]}
        >
          <Text style={Fonts.White18Bold}>{tr('submit')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccessCode;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
});
