import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
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
          <>
            <View
              key={subService.id}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Default.fixPadding,
                padding: Default.fixPadding,
                backgroundColor: Colors.lightPrimary,
              }}
            >
              <Text style={Fonts.Primary16Bold}>{subService.name}</Text>
            </View>
            <Items items={subService.items} />
          </>
        );
      })}
    </>
  );
};

export default SubService;

const styles = StyleSheet.create({});
