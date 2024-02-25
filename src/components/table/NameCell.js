import { Text, View } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { Default, Fonts, Colors, DefaultImage } from '@constants/style';
const NameCell = ({ data, header, size }) => {
  const image = data.userInfo.profileImg?.url ? data.userInfo.profileImg.url : DefaultImage;
  const firstName = data.userInfo.firstName;
  const lastName = data.userInfo.lastName;
  const color = data.userInfo?.displayColor ? data.userInfo.displayColor : 'black';
  return (
    <View style={{ flex: size, flexDirection: 'row', alignItems: 'center', marginLeft: Default.fixPadding * 1.5 }}>
      <Avatar.Image
        size={35}
        source={{
          uri: `${image}`,
        }}
      />
      <Text style={{ fontSize: 14, marginLeft: Default.fixPadding, color: color }}>
        {firstName} {lastName}
      </Text>
    </View>
  );
};

export default NameCell;
