import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '@redux/actions/adminHomeAction';
///import ModalContent from './ModalContent';
import ModalContent from '@components/ModalContent';
import { Dropdown } from 'react-native-element-dropdown';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import { totalDeduct, tipDeduct } from '@constants/settings';
import Loader from '@components/loader';
import { formatPrice } from '@utils/helper';
const SettingsEmployeeRow = ({ data }) => {
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`settings:${key}`);
  }
  const dispatch = useDispatch();
  const { isLoading, storeSettings } = useSelector((state) => state.adminHome);
  const [visible, setVisible] = useState(false);
  const [catEdit, setCatEdit] = useState(false);
  const [employee, setEmployee] = useState({});
  const [message, setMessage] = useState('');

  const { id: userId } = data;

  useEffect(() => {
    setEmployee(data.userInfo);
  }, [data]);

  const handleSave = () => {
    const { totalDeduct, tipDeduct, perDay, id } = employee;
    const data = { totalDeduct, tipDeduct, perDay };
    dispatch(updateEmployee({ userId, id, data }));
  };
  const handleRemove = () => {
    const data = { storeEmployee: null };
    dispatch(updateEmployee({ userId, id: 'remove', data }));
  };

  const handleCancel = () => {
    const businessName = storeSettings.name;
    const employeeName = `${employee.firstName} ${employee.lastName}`;
    setMessage(`Are you sure you want to remove ${employeeName} from ${businessName}?`);
    setVisible(true);
  };

  const handleOnchange = (value, key) => {
    setEmployee({ ...employee, [key]: value });
  };

  const renderItem = (item) => {
    return (
      <View style={[styles.item, { zIndex: 2 }]}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <Loader visible={isLoading} />
      <View style={[Style.mainContainer, { flexDirection: 'row', marginVertical: 5 }]}>
        <View style={{ flex: 2 }}>
          <Text style={{ color: employee.displayColor }}>
            {employee.firstName} {employee.lastName}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {!catEdit ? (
            <Text>{employee?.totalDeduct}</Text>
          ) : (
            <Dropdown
              style={[Style.inputStyle, styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={totalDeduct}
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder='Select'
              value={employee?.totalDeduct}
              onChange={(item) => {
                handleOnchange(item.value, 'totalDeduct');
              }}
              renderItem={renderItem}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          {!catEdit ? (
            <Text>{employee.tipDeduct && `${employee?.tipDeduct}%`}</Text>
          ) : (
            <Dropdown
              style={[Style.inputStyle, styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={tipDeduct}
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder='Select'
              value={employee?.tipDeduct}
              onChange={(item) => {
                handleOnchange(item.value, 'tipDeduct');
              }}
              renderItem={renderItem}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          {!catEdit ? (
            <Text>{employee.perDay && formatPrice(employee?.perDay * 100)}</Text>
          ) : (
            <NumericInput
              type='decimal'
              decimalPlaces={2}
              value={employee?.perDay}
              onUpdate={(value) => handleOnchange(value, 'perDay')}
              style={[Style.inputStyle, { height: 25, padding: 4 }]}
              selectionColor={Colors.primary}
            />
          )}
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {catEdit ? (
            <TouchableOpacity
              style={[
                Style.buttonStyle,
                Style.borderGreen,
                {
                  paddingVertical: 0,
                  marginTop: 0,
                  flexDirection: 'row',
                  width: 22,
                  height: 22,
                  marginHorizontal: 15,
                  borderRadius: 5,
                },
              ]}
              onPress={() => {
                setCatEdit(!catEdit);
                handleSave();
              }}
            >
              <Icon name={'check-square-o'} size={14} color={Colors.success} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                Style.buttonStyle,
                Style.borderOrange,
                {
                  paddingVertical: 0,
                  marginTop: 0,
                  flexDirection: 'row',
                  width: 22,
                  height: 22,
                  marginHorizontal: 15,
                  borderRadius: 5,
                },
              ]}
              onPress={() => {
                setCatEdit(!catEdit);
              }}
            >
              <Icon name={'edit'} size={14} color={Colors.orange} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              Style.buttonStyle,
              Style.borderRed,
              {
                paddingVertical: 0,
                marginTop: 0,
                flexDirection: 'row',
                width: 22,
                height: 22,
                marginHorizontal: 5,
                borderRadius: 5,
              },
            ]}
            onPress={() => {
              handleCancel();
            }}
          >
            <Icon name={'remove'} size={14} color={Colors.red} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[Style.divider, { marginVertical: Default.fixPadding }]} />
      <Modal animationType='fade' transparent={true} visible={visible}>
        <ModalContent
          title={'Remove Confirmation'}
          message={message}
          setVisible={setVisible}
          okAction={handleRemove}
          okButtonTitle={'Confirmed'}
        />
      </Modal>
    </>
  );
};

export default SettingsEmployeeRow;
const styles = StyleSheet.create({
  dropdown: {
    height: 25,
    backgroundColor: 'transparent',
    width: '90%',
    //borderBottomWidth: 1,
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
