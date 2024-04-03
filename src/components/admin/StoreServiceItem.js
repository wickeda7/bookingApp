import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useRef, useState, useId } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import { useTranslation } from 'react-i18next';
import { useAdminContext } from '@contexts/AdminContext';
import debounce from 'lodash/debounce';
import { updateService } from '@redux/actions/adminHomeAction';
import { useDispatch } from 'react-redux';
const StoreServiceItem = ({ item, catId }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }
  const { storeServices, setStoreServices, categoryId, subCategoryId } = useAdminContext();
  const [toggleCheckBox, setToggleCheckBox] = useState(item?.enable ? true : false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    setData(item);
  }, [item]);

  const onChange = () => {
    console.log('onChange storeServices', data, categoryId, subCategoryId, storeServices);
    let services = [...storeServices];
    let categoryIndex = services.findIndex((item) => item.id === categoryId);
    let category = { ...services[categoryIndex] };
    let itemsArr = [];
    if (subCategoryId) {
      const subIndex = category.sub_services.findIndex((item) => item.id === subCategoryId);
      let subCategory = { ...category.sub_services[subIndex] };
      let itemsArr = subCategory.items;
      itemsArr = itemsArr.map((i) => {
        if (i.id === data.id) {
          return data;
        }
        return i;
      });
      subCategory = { ...subCategory, items: itemsArr };
      category.sub_services[subIndex] = subCategory;
      services[categoryIndex] = category;
    } else {
      itemsArr = category.items;
      itemsArr = itemsArr.map((i) => (i.id === data.id ? data : i));
      category = { ...category, items: itemsArr };
      services = services.map((i) => (i.id === categoryId ? category : i));
    }
    setStoreServices(services);
    ///dispatch(notifyBooking(updatedService));
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

  const handleCheckBox = (value) => {
    console.log('handleCheckBox');
    debouncedCallback();
    setToggleCheckBox(value);

    setData({ ...data, enable: value });
  };
  const handleOnchange = (value, field) => {
    debouncedCallback();

    setData({ ...data, [field]: value });
  };

  const handleRemove = () => {
    let services = [...storeServices];
    const index = services.findIndex((ser) => ser.id === categoryId);
    if (index > -1) {
      if (!item.service && !item.sub_service) {
        console.log('remove1111', item.service);
        dispatch(
          updateService({
            ids: { serviceId: categoryId, subServiceId: subCategoryId, itemId: data.id },
            data: { delete: true },
            type: 'items',
          })
        );
      } else {
        let service = { ...services[index] };
        if (!subCategoryId) {
          let items = [...service.items];
          items = items.filter((i) => i.id !== item.id);
          service = { ...service, items };
          services = services.map((i) => (i.id === categoryId ? service : i));
        } else {
          let subIndex = service.sub_services.findIndex((sub) => sub.id === subCategoryId);
          let subService = { ...service.sub_services[subIndex] };
          let items = [...subService.items];
          items = items.filter((i) => i.id !== item.id);
          subService = { ...subService, items };
          service.sub_services[subIndex] = subService;
          services[index] = service;
        }

        setStoreServices(services);
      }
    }
    console.log('remove', item, catId, categoryId, subCategoryId);
  };
  const handleSave = () => {
    console.log('handleSave', data, catId, categoryId, subCategoryId);
    dispatch(
      updateService({
        ids: { serviceId: categoryId, subServiceId: subCategoryId, itemId: data.id },
        data: data,
        type: 'items',
      })
    );
  };
  return (
    <>
      <View style={[Style.mainContainer, { flexDirection: 'row', marginVertical: 5 }]}>
        <View style={{ flex: 4 }}>
          <TextInput
            style={[Style.inputStyle, { height: 25, padding: 4 }]}
            onChangeText={(text) => handleOnchange(text, 'name')}
            selectionColor={Colors.primary}
            value={data?.name}
            placeholder='Service Name'
          />
        </View>
        <View style={{ flex: 1 }}>
          <NumericInput
            type='decimal'
            decimalPlaces={2}
            value={data?.price}
            onUpdate={(value) => handleOnchange(value, 'price')}
            style={[Style.inputStyle, { height: 25, padding: 4 }]}
            selectionColor={Colors.primary}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            style={[
              Style.buttonStyle,
              Style.borderGreen,
              {
                paddingVertical: 0,
                marginTop: 5,
                flexDirection: 'row',
                width: 22,
                height: 22,
                marginHorizontal: 5,
                borderRadius: 5,
              },
            ]}
            onPress={handleSave}
          >
            <Icon name={'check-square-o'} size={14} color={Colors.success} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            style={[
              Style.buttonStyle,
              Style.borderRed,
              {
                paddingVertical: 0,
                marginTop: 5,
                flexDirection: 'row',
                width: 22,
                height: 22,
                marginHorizontal: 5,
                borderRadius: 5,
              },
            ]}
            onPress={handleRemove}
          >
            <Icon name={'remove'} size={14} color={Colors.red} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[Style.mainContainer, { flexDirection: 'row', marginVertical: 5 }]}>
        <View
          style={[
            {
              flex: 5,
              flexDirection: 'column',
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[{ marginLeft: 0, marginRight: 10 }]} onPress={() => setOpen(!open)}>
              <Ionicons
                name={open ? 'chevron-down-circle-outline' : 'chevron-up-circle-outline'}
                size={20}
                color={Colors.grey}
              />
            </TouchableOpacity>
            <Text style={Fonts.Black14Medium}>Description</Text>
          </View>
          {open && (
            <TextInput
              multiline={true}
              numberOfLines={5}
              selectionColor={Colors.primary}
              style={[Style.inputStyle, { width: '90%', height: 50 }]}
              placeholder={'Description'}
              onChangeText={(text) => handleOnchange(text, 'description')}
              value={data?.description}
            />
          )}
        </View>
        <View
          style={[
            {
              flex: 1.5,
              flexDirection: 'column',
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={Fonts.Black14Medium}>{tr('option')}</Text>
          </View>
          {open && (
            <TextInput
              style={[Style.inputStyle, { height: 25, padding: 4 }]}
              onChangeText={(text) => handleOnchange(text, 'priceOption')}
              selectionColor={Colors.primary}
              value={data?.priceOption}
            />
          )}
        </View>
        <View
          style={[
            {
              flex: 0.5,
              flexDirection: 'column',
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={Fonts.Black14Medium}>{tr('enable')}</Text>
          </View>
          {open && (
            <CheckBox
              value={toggleCheckBox}
              onValueChange={handleCheckBox}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          )}
        </View>
      </View>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding }]} />
    </>
  );
};

export default StoreServiceItem;

const styles = StyleSheet.create({});
