import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Items from '@components/items';
const SubService = ({ subservices }) => {
  const [subMenu, setSubMenu] = useState(null);
  useEffect(() => {
    if (subservices) {
      setSubMenu(subservices);
    }
  }, []);
  if (!subMenu) return null;
  return (
    <>
      {subMenu.map((subService) => {
        return (
          <View key={subService.id}>
            <View style={Style.tableHeader}>
              <Text style={Fonts.tableHeaderText16}>{subService.name}</Text>
            </View>
            <Items items={subService.items} />
          </View>
        );
      })}
    </>
  );
};

export default SubService;

const styles = StyleSheet.create({});
