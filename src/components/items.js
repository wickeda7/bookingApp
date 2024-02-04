import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@utils/helper';
import { use } from 'i18next';

const Items = ({ items, key }) => {
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    if (items) {
      setMenu(items);
    }
  }, []);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
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
              console.log('item', item);
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
                  //statusOption(item.text);
                }}
              >
                <Ionicons
                  //name={selectedOption === item.text ? 'radio-button-on-outline' : 'ellipse-outline'}
                  name={'radio-button-on-outline'}
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
