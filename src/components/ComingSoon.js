import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Style from '@theme/style';
const ComingSoon = () => {
  return (
    <View
      style={[
        Style.contentContainer,

        {
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          height: '100%',
        },
      ]}
    >
      <Ionicons name='warning-outline' size={50} color={Colors.primary} />
      <Text style={Fonts.Primary40Bold}>Tablet Version is Coming Soon</Text>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({});
