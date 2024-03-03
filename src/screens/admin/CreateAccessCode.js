import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import Loader from '@components/loader';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { formatPhoneNumber } from '@utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import { createAccessCode } from '@redux/actions/staffAction';
const CreateAccessCode = ({ visible, setVisible, storeId, data }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }

  const refRBSheet = useRef();
  const [info, setInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [formattedNumber, setFormattedNumber] = useState('');
  const [inputErr, setInputErr] = useState([]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.staff);

  useEffect(() => {
    setInputErr([]);
    if (visible) {
      refRBSheet.current.open();
      if (data) {
        setUserInfo(data);
      } else {
        setUserInfo({});
      }
    } else {
      refRBSheet.current.close();
    }
  }, [visible]);

  const handleOnchange = (text, input) => {
    setInputErr([]);
    if (input === 'phoneNumber') {
      text = formatPhoneNumber(text);
    }
    setUserInfo((prevState) => ({ ...prevState, [input]: text }));
  };
  const generateCode = () => {
    let r = (Math.random() + 1).toString(36).substring(6);

    handleOnchange(`${storeId}_${r}`, 'code');
  };
  const updateUserData = async () => {
    let method = 'POST';
    let temp = { ...userInfo };
    if (temp.id) {
      method = 'PUT';
      delete temp.createdAt;
      delete temp.updatedAt;
      delete temp.selected;
    }
    if (temp?.phoneNumber && temp?.phoneNumber !== '') {
      temp.phoneNumber = temp.phoneNumber.replace(/[^\d\+]/g, '');
    }
    let err = [];
    if (!temp.code) {
      err.push('code');
    }
    if (!temp.phoneNumber) {
      err.push('phoneNumber');
    }
    if (err.length > 0) {
      setInputErr(err);
      return;
    }

    dispatch(createAccessCode({ data: temp, method }));
    setVisible(false);
  };
  return (
    <RBSheet
      ref={refRBSheet}
      height={350}
      openDuration={100}
      onClose={() => setVisible(false)}
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: Colors.white,
        },
      }}
    >
      <Loader visible={isLoading} />
      <View
        style={[
          Style.contentContainer,
          {
            flexDirection: isRtl ? 'row-reverse' : 'row',
            paddingHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 2,
            marginBottom: 0,
            paddingBottom: 0,
          },
        ]}
      >
        <MaterialIcons
          name='password'
          size={30}
          color={Colors.primary}
          style={[{ marginHorizontal: Default.fixPadding * 1 }]}
        />
        <Text
          style={{
            ...Fonts.Primary18Bold,
            color: Colors.primary,
          }}
        >
          {tr('createCode')}
        </Text>
      </View>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding * 1.5 }]}></View>
      {inputErr.length > 0 && (
        <View
          style={[
            Style.contentContainer,
            {
              flexDirection: 'row-reverse',
              paddingHorizontal: Default.fixPadding * 1.5,
            },
          ]}
        >
          <View style={[Style.errorAlert, { position: 'relative', paddingLeft: 30 }]}>
            <View style={{ position: 'absolute', top: 4, left: 5 }}>
              <Ionicons name={'information-circle-outline'} size={20} color={Colors.red} />
            </View>
            <Text style={Style.errorText}>
              <Text style={{ marginLeft: 15, paddingLeft: 25 }}>{tr('inputError')}</Text>
            </Text>
          </View>
        </View>
      )}
      {info && (
        <View
          style={[
            Style.contentContainer,
            {
              flexDirection: 'row-reverse',
              paddingHorizontal: Default.fixPadding * 1.5,
            },
          ]}
        >
          <View style={[Style.infoAlert, { position: 'relative', paddingLeft: 30 }]}>
            <View style={{ position: 'absolute', top: 4, left: 5 }}>
              <FontIcon name={'question-circle-o'} size={20} color={Colors.info} />
            </View>
            <Text style={Style.infoText}>
              <Text style={{ marginLeft: 15, paddingLeft: 25 }}>{tr('generateDesc')}</Text>
            </Text>
          </View>
        </View>
      )}
      <View
        style={[
          Style.contentContainer,
          {
            flexDirection: isRtl ? 'row-reverse' : 'row',
            paddingHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 2,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('firstName')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'firstName')}
            selectionColor={Colors.primary}
            value={userInfo.firstName}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={Fonts.Black15Medium}>{tr('lastName')}</Text>
          <TextInput
            style={Style.inputStyle}
            onChangeText={(text) => handleOnchange(text, 'lastName')}
            selectionColor={Colors.primary}
            value={userInfo.lastName}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={[Fonts.Black15Medium, { color: inputErr.includes('phoneNumber') ? Colors.red : Colors.black }]}>
            {tr('phoneNumber')}
          </Text>
          <TextInput
            style={[Style.inputStyle, { borderColor: inputErr.includes('phoneNumber') ? Colors.red : Colors.grey }]}
            onChangeText={(text) => handleOnchange(text, 'phoneNumber')}
            selectionColor={Colors.primary}
            value={userInfo.phoneNumber}
            keyboardType='phone-pad'
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Text style={[Fonts.Black15Medium, { color: inputErr.includes('code') ? Colors.red : Colors.black }]}>
            {tr('accessCode')}
            <TouchableOpacity onPress={() => setInfo((prev) => !prev)}>
              <FontIcon name={'question-circle-o'} size={20} color={Colors.info} />
            </TouchableOpacity>
          </Text>
          <TextInput
            style={[
              Style.inputStyle,
              { borderColor: inputErr.includes('code') ? Colors.red : Colors.grey, position: 'relative' },
            ]}
            onChangeText={(text) => handleOnchange(text, 'code')}
            selectionColor={Colors.primary}
            value={userInfo.code}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => generateCode()}
            style={[
              Style.buttonStyle,
              {
                backgroundColor: Colors.primary,
                width: 110,
                position: 'absolute',
                paddingVertical: 6,
                right: 32,
                top: 21,
                borderRadius: 5,
              },
            ]}
          >
            <Text style={[Fonts.white14SemiBold, { color: Colors.white }]}>{tr('generate')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          Style.contentContainer,
          {
            flexDirection: isRtl ? 'row-reverse' : 'row',
            paddingHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 2,
          },
        ]}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => updateUserData()}
            style={[
              Style.buttonStyle,
              {
                backgroundColor: Colors.primary,
                width: 110,
              },
            ]}
          >
            <Text style={Fonts.White18Bold}>{tr('save')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
};

export default CreateAccessCode;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: Colors.grey,
  },
});
