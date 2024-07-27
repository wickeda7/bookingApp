import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import { useTranslation } from 'react-i18next';
import AntIcon from 'react-native-vector-icons/AntDesign';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import { updateServiceRow } from '@redux/slices/adminHomeSlice';
import { addSplitService } from '@redux/actions/adminHomeAction';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { setStaffToService } from '@redux/slices/adminHomeSlice';
import Toast from 'react-native-root-toast';
import AddStaffService from './AddStaffService';
import StaffServiceBtn from './StaffServiceBtn';
const ServiceRow = ({ item, setService, setStaff, handleTextChange, canceled }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const { staffToService } = useSelector((state) => state.adminHome);
  const [add, setAdd] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [value, setValue] = useState('');
  const [ogPrice, setOgPrice] = useState(null);
  const ref = useRef();
  const specialist = item.specialist;
  const color = specialist ? specialist.userInfo.displayColor : '#000';
  const firstName = specialist ? specialist.userInfo.firstName : '';
  const lastName = specialist ? specialist.userInfo.lastName : '';

  const id = specialist ? specialist.id : '';
  const price = item.price;
  const additional = item.additional ? item.additional.toString() : '';
  const total = item.total ? item.total : price;
  const editable = item.status === 'pending' ? false : true;
  const notes = item.notes ? item.notes : `Status: ${tr(item.status)}`;
  const dispatch = useDispatch();

  const handleAddRow = () => {
    let temp = { ...item };
    delete temp.specialist;
    delete temp.specialistID;
    temp.id = item.id * Default.fixPadding;
    temp.status = 'pending';
    temp.name = `${item.name} - Split`;
    temp.price = 0;
    temp.total = 0;
    setOgPrice(price);
    setAddedItem(temp);
    setAdd(!add);
  };
  const onChange = () => {
    dispatch(updateServiceRow({ value, item, field: 'price' }));
  };
  useEffect(() => {
    ref.current = onChange;
  }, [onChange]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  const handlePriceChange = (value) => {
    debouncedCallback();
    let temp = { ...addedItem };
    temp.price = value;
    temp.total = value;
    setAddedItem(temp);
    const newPrice = ogPrice * 100 - value * 100;
    setValue(newPrice / 100);
  };
  const handleCancel = () => {
    const newPrice = ogPrice * 100;
    dispatch(updateServiceRow({ value: newPrice / 100, item, field: 'price' }));
    setAdd(!add);
    setAddedItem(null);
  };
  const moveStaffService = () => {
    if (!staffToService) {
      Toast.show('Please select staff first', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: Colors.red,
      });
      return;
    }
    if (specialist) return;
    if (!item.id || !item.name) {
      return;
    }

    setService(item, 'service', staffToService);
    setStaff(staffToService);
    dispatch(setStaffToService(null));
  };
  return (
    <>
      <TouchableOpacity
        style={[
          Style.mainContainer,
          {
            flexDirection: 'row',
            marginHorizontal: Default.fixPadding * 1.5,
            padding: Default.fixPadding,
            opacity: canceled ? 0.3 : 1,
          },
        ]}
        onPress={() => moveStaffService()}
      >
        <View style={[{ flex: 2, paddingLeft: 10, flexDirection: 'row' }]}>
          <AntIcon size={15} name='menu-unfold' color={color} />
          <Text style={[{ marginHorizontal: Default.fixPadding, color: color, fontSize: 14 }]}>
            {firstName} {lastName} {id}
          </Text>
        </View>

        <View style={[{ flex: 4 }]}>
          <Text style={{ fontSize: 14 }}>{item.name}</Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={{ fontSize: 14 }}>{formatPrice(price * 100)}</Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <NumericInput
            type='decimal'
            decimalPlaces={2}
            value={additional}
            onUpdate={(value) => handleTextChange(value, item, 'additional')}
            style={[Style.inputStyle, { width: '80%', height: 25, marginVertical: 0, padding: 4 }]}
            selectionColor={Colors.primary}
            editable={editable}
          />
        </View>
        <View style={[{ flex: 1 }]}>
          <Text style={{ fontSize: 14 }}>{formatPrice(total * 100)}</Text>
        </View>
      </TouchableOpacity>
      {add && <AddStaffService addedItem={addedItem} handlePriceChange={handlePriceChange} />}
      <View
        style={[
          Style.mainContainer,
          {
            flexDirection: 'row',
            marginHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding,
            opacity: canceled ? 0.3 : 1,
          },
        ]}
      >
        <View style={[{ flex: 3, paddingLeft: 10, flexDirection: 'row' }]}>
          {specialist && (
            <StaffServiceBtn
              add={add}
              setAdd={setAdd}
              setAddedItem={setAddedItem}
              addedItem={addedItem}
              handleCancel={handleCancel}
              canceled={canceled}
              setService={setService}
              handleAddRow={handleAddRow}
              item={item}
            />
          )}
        </View>
        <View style={[{ flex: 4, flexDirection: 'row' }]}>
          <Text style={{ fontSize: 14, marginTop: 5, marginRight: 5 }}>{tr('notes')}: </Text>
          <TextInput
            multiline={true}
            numberOfLines={5}
            selectionColor={Colors.primary}
            style={[Style.inputStyle, { width: '90%', height: 50 }]}
            placeholder={notes}
            onEndEditing={(text) => handleTextChange(text, item, 'notes')}
            editable={editable}
            //value={notes}
          />
        </View>
      </View>
      <View
        style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
      />
    </>
  );
};

export default ServiceRow;

const styles = StyleSheet.create({});
