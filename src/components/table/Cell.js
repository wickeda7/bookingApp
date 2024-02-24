import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Default } from '@constants/style';
import moment from 'moment';
import { formatPhoneNumber } from '@utils/helper';
const Cell = ({ data, type, header }) => {
  let result = '';
  switch (header.headerName) {
    case 'email':
      result = data.email;
      break;
    case 'createdAt':
      result = moment(data.createdAt).format('MM-DD-YYYY');
      break;
    case 'phone':
      result = formatPhoneNumber(data.userInfo.phoneNumber);
      break;
    case 'specialty':
      result = data.userInfo.specialty;
      break;
  }

  return (
    <View style={{ flex: header.size }}>
      <Text style={{ fontSize: 14, marginLeft: Default.fixPadding }}>{result} </Text>
    </View>
  );
};

export default Cell;

const styles = StyleSheet.create({});
