import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import { useAdminContext } from '@contexts/AdminContext';
import Loader from '@components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, updateStoreInfo } from '@redux/actions/adminHomeAction';
import StoreImages from '@components/admin/StoreImages';
import { formatPhoneNumber } from '@utils/helper';
import { STATES, totalDeduct, tipDeduct, weekDays } from '@constants/settings';
import StoreHours from '@components/admin/StoreHours';
import StoreServices from '@components/admin/StoreServices';
import SettingsEmplyee from '@components/admin/SettingsEmplyee';
const Settings = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }
  const payperiods = { 1: false, 2: false, 4: false };
  const { navigation, route } = props;
  const { userData } = useAuthContext();
  const { visible, setVisible, setImageType, setSelectedImage, storeInfo, setStoreInfo, setStoreServices } =
    useAdminContext();
  const storeId = userData.storeAdmin.id;
  const dispatch = useDispatch();
  const { isLoading, storeSettings } = useSelector((state) => state.adminHome);
  const [formattedNumber, setFormattedNumber] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(payperiods);

  useEffect(() => {
    dispatch(getSettings({ storeId }));
  }, []);
  useEffect(() => {
    if (Object.keys(storeSettings).length === 0) return;
    setStoreServices(storeSettings.services || []);
    setStoreInfo(storeSettings);
    setFormattedNumber(formatPhoneNumber(storeSettings.phone));
    const payperiod = storeSettings.payperiod;
    if (payperiod) {
      const toggle = Object.keys(toggleCheckBox).reduce((acc, key) => {
        if (key === payperiod) {
          acc[key] = true;
        } else {
          acc[key] = false;
        }
        return acc;
      }, {});
      setToggleCheckBox(toggle);
    }
  }, [storeSettings]);

  const handleCheckBox = (week) => {
    const toggle = Object.keys(toggleCheckBox).reduce((acc, key) => {
      if (key === week) {
        acc[key] = !toggleCheckBox[key];
      } else {
        acc[key] = false;
      }
      return acc;
    }, {});
    setToggleCheckBox(toggle);
    let payperiod = null;
    for (const [key, value] of Object.entries(toggle)) {
      if (value) {
        payperiod = key;
        console.log(`${key}: ${value}`);
      }
    }
    setStoreInfo((prevState) => ({ ...prevState, payperiod }));
  };

  const handleOnchange = (text, input) => {
    setStoreInfo((prevState) => ({ ...prevState, [input]: text }));
  };
  const onPhoneChange = (number) => {
    const formattedNumber = formatPhoneNumber(number);
    setFormattedNumber(formattedNumber);
    setStoreInfo((prevState) => ({ ...prevState, phone: number }));
  };
  const toggleClose = (type) => {
    setVisible(!visible);
    setImageType(type);
  };

  const handleSave = () => {
    let {
      about,
      address,
      city,
      email,
      name,
      phone,
      state,
      zip,
      totalDeduct,
      tipDeduct,
      hours,
      payperiod,
      payperiod_date,
    } = storeInfo;
    hours = hours.map((item) => {
      delete item.selected;
      return item;
    });
    const data = {
      about,
      address,
      city,
      email,
      name,
      phone,
      state,
      zip,
      totalDeduct,
      tipDeduct,
      hours,
      payperiod,
      payperiod_date,
    };
    console.log('data', data);

    dispatch(updateStoreInfo({ storeId, data }));
  };
  const renderItem = (item) => {
    return (
      <View style={[styles.item, { zIndex: 2 }]}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Loader visible={isLoading} />
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={Style.navBackButton}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>{tr('settings')}</Text>
      </View>
      <ScrollView style={{ width: '100%' }}>
        <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <View
            style={[
              {
                flex: 0.5,
                flexDirection: 'column',
                position: 'relative',
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('logo')}</Text>
            <StoreImages type={'storeLogo'} data={storeSettings} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                height: 35,
                width: 35,
                top: 15,
                left: 135,
                borderRadius: 20,
                backgroundColor: Colors.primary,
              }}
              onPress={() => {
                setSelectedImage(storeSettings.logo);
                toggleClose('storeLogo');
              }}
            >
              <Ionicons style={{ color: Colors.white }} name='camera-outline' size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'column',
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('businessName')}</Text>
            <TextInput
              style={Style.inputStyle}
              onChangeText={(text) => handleOnchange(text, 'name')}
              selectionColor={Colors.primary}
              value={storeInfo.name}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Text style={Fonts.Black14Medium}>{tr('phone')}</Text>
            <TextInput
              style={Style.inputStyle}
              onChangeText={(text) => onPhoneChange(text, 'phone')}
              selectionColor={Colors.primary}
              value={formattedNumber}
              keyboardType='phone-pad'
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Text style={Fonts.Black14Medium}>{tr('email')}</Text>
            <TextInput
              style={Style.inputStyle}
              onChangeText={(text) => handleOnchange(text, 'email')}
              selectionColor={Colors.primary}
              value={storeInfo.email}
              keyboardType='email-address'
            />
          </View>
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
        <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <View
            style={[
              {
                flex: 4,
                flexDirection: 'column',
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('address')}</Text>
            <TextInput
              style={Style.inputStyle}
              onChangeText={(text) => handleOnchange(text, 'address')}
              selectionColor={Colors.primary}
              value={storeInfo.address}
            />
          </View>
          <View
            style={[
              {
                flex: 3,
                flexDirection: 'column',
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('city')}</Text>
            <TextInput
              style={Style.inputStyle}
              onChangeText={(text) => handleOnchange(text, 'city')}
              selectionColor={Colors.primary}
              value={storeInfo.city}
            />
          </View>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'column',
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('state')}</Text>
            <Dropdown
              style={[Style.inputStyle]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={STATES}
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder='States'
              value={storeInfo.state}
              onChange={(item) => {
                handleOnchange(item.value, 'state');
              }}
              renderItem={renderItem}
            />
          </View>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'column',
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('zip')}</Text>
            <TextInput
              style={Style.inputStyle}
              onChangeText={(text) => handleOnchange(text, 'zip')}
              selectionColor={Colors.primary}
              value={storeInfo.zip}
            />
          </View>
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
        <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <View
            style={[
              {
                flexDirection: 'column',
                width: 150,
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('commission')}</Text>
            <Dropdown
              style={[Style.inputStyle]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={totalDeduct}
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder='Select'
              value={storeInfo.totalDeduct}
              onChange={(item) => {
                handleOnchange(item.value, 'totalDeduct');
              }}
              renderItem={renderItem}
            />
          </View>
          <View
            style={[
              {
                flexDirection: 'column',
                width: 150,
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('tipDeduction')}</Text>
            <Dropdown
              style={[Style.inputStyle]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={tipDeduct}
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder='Select'
              value={storeInfo.tipDeduct}
              onChange={(item) => {
                handleOnchange(item.value, 'tipDeduct');
              }}
              renderItem={renderItem}
            />
          </View>
          <View
            style={[
              {
                flexDirection: 'column',
                width: 520,
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('payperiod')}</Text>
            <View style={{ flexDirection: 'row', marginTop: 7 }}>
              <CheckBox
                value={toggleCheckBox[1]}
                onValueChange={() => {
                  handleCheckBox('1');
                }}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
              <Text style={{ paddingTop: 5, fontSize: 13, marginRight: 10 }}>Every Week</Text>
              <CheckBox
                value={toggleCheckBox[2]}
                onValueChange={() => {
                  handleCheckBox('2');
                }}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
              <Text style={{ paddingTop: 5, fontSize: 13, marginRight: 10 }}>Every 2 Weeks</Text>
              <CheckBox
                value={toggleCheckBox[4]}
                onValueChange={() => {
                  handleCheckBox('4');
                }}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
              <Text style={{ paddingTop: 5, fontSize: 13, marginRight: 10 }}>Every 4 Weeks</Text>
              <Text style={{ paddingTop: 5, fontSize: 13, marginRight: 10 }}>On</Text>
              <Dropdown
                style={[Style.inputStyle, { width: 120 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={weekDays}
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder='Select'
                value={storeInfo.payperiod_date}
                onChange={(item) => {
                  handleOnchange(item.value, 'payperiod_date');
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
        <View style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
          <View
            style={[
              {
                flex: 8,
                flexDirection: 'column',
              },
            ]}
          >
            <StoreHours />
          </View>
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
        <View
          style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'flex-start' }]}
        >
          <StoreServices />
          <SettingsEmplyee />
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 0.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
        <View
          style={[Style.contentContainer, { flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'flex-start' }]}
        >
          <View
            style={[
              {
                flex: 1.3,
                flexDirection: 'column',
                position: 'relative',

                padding: 10,
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('images')}</Text>
            <View style={{ marginTop: 15 }}>
              <StoreImages type={'storeImages'} data={storeSettings} />
            </View>

            <TouchableOpacity
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                height: 35,
                width: 35,
                top: -5,
                left: 60,
                borderRadius: 20,
                backgroundColor: Colors.primary,
              }}
              onPress={() => {
                toggleClose('storeImages');
              }}
            >
              <Ionicons style={{ color: Colors.white }} name='camera-outline' size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'column',

                padding: 10,
              },
            ]}
          >
            <Text style={Fonts.Black14Medium}>{tr('about')}</Text>
            <TextInput
              style={[Style.inputStyle, { minHeight: 150 }]}
              numberOfLines={10}
              multiline={true}
              onChangeText={(text) => handleOnchange(text, 'about')}
              selectionColor={Colors.primary}
              value={storeInfo.about}
            />
          </View>
        </View>
        <View
          style={[
            Style.divider,
            { marginVertical: Default.fixPadding * 2.5, marginHorizontal: Default.fixPadding * 1.5 },
          ]}
        ></View>
        <View
          style={[
            Style.contentContainer,
            {
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              paddingVertical: 30,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => handleSave()}
            style={[
              Style.buttonStyle,
              {
                backgroundColor: Colors.primary,
                width: 110,
                marginRight: 30,
              },
            ]}
          >
            <Text style={Fonts.White18Bold}>{tr('save')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  dropdown: {
    height: 24,
    backgroundColor: 'transparent',

    borderBottomWidth: 1,
  },
  borderNormal: {
    borderColor: '#ccc',
  },
  borderError: {
    borderColor: 'red',
  },
  selectedTextStyle: { fontSize: 14 },
  item: {
    paddingHorizontal: 17,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
});
