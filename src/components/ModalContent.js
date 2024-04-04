import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Style from '@theme/style';
import { Colors, Default, Fonts } from '@constants/style';

const ModalContent = ({ title, message, setVisible, okAction, okButtonTitle }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparentBlack,
      }}
    >
      <View
        style={{
          width: 500,
          paddingHorizontal: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Text style={{ ...Fonts.Black16Medium, textAlign: 'left' }}>{title}</Text>
        <View style={[Style.divider, { marginVertical: Default.fixPadding * 1.5 }]} />
        <Text style={{ ...Fonts.Black14Medium, textAlign: 'left', marginVertical: Default.fixPadding * 1.5 }}>
          {message}
        </Text>
        <View style={[Style.divider, { marginVertical: Default.fixPadding * 1.5 }]} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text
              style={{
                ...Fonts.ExtraLightGrey18Medium,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              okAction();
            }}
          >
            <Text
              style={{
                ...Fonts.Primary18Medium,
                marginRight: Default.fixPadding,
              }}
            >
              {okButtonTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalContent;

const styles = StyleSheet.create({});
