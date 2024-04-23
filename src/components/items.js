import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import { setServices } from '@redux/slices/bookingSlice';

const Items = ({ items, key }) => {
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(null);
  useEffect(() => {
    if (items) {
      setMenu(items);
    }
  }, []);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';
  const setSelected = (item) => {
    const newMenu = menu.map((menuItem) => {
      if (menuItem.id === item.id) {
        const newVal = { ...menuItem, selected: !menuItem.selected };
        return newVal;
      } else {
        return menuItem;
      }
    });
    dispatch(setServices(item));
    setMenu(newMenu);
  };
  if (!menu) return null;
  return (
    <>
      {menu.map((item) => {
        const option = item.priceOption ? item.priceOption : '';
        return (
          <TouchableOpacity
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
              paddingVertical: Default.fixPadding,
              paddingHorizontal: Default.fixPadding * 1.5,
            }}
            onPress={() => {
              setSelected(item);
            }}
            key={item.id}
          >
            <Text
              style={{
                ...Fonts.Black16Medium,
                flex: 4,
                textAlign: isRtl ? 'right' : 'left',
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                ...Fonts.Black16Medium,
                flex: 4,
                textAlign: isRtl ? 'right' : 'left',
              }}
            >
              {formatPrice(item.price * 100)} {option}
            </Text>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                }}
              >
                <Ionicons
                  name={item.selected ? 'radio-button-on-outline' : 'ellipse-outline'}
                  //name={'radio-button-on-outline'}
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default Items;

const styles = StyleSheet.create({});
