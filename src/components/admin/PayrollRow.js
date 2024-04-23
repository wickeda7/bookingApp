import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import { formatPrice } from '@utils/helper';
const PayrollRow = ({ data, payrollData, totalDeduct, handleDisplayInvoice }) => {
  const {
    id: userId,
    userInfo: { displayColor, firstName, lastName, perDay, totalDeduct: userDeduct },
  } = data;
  let commission = userDeduct ? userDeduct : '';
  commission = commission ? commission : perDay;
  commission = commission ? commission : totalDeduct;
  commission = typeof commission === 'number' ? formatPrice(commission * 100) : commission;
  let total = 0;

  if (payrollData[userId]) {
    total = payrollData[userId].reduce((acc, item) => {
      return acc + item.subtotal * 100;
    }, 0);
  }
  return (
    <>
      <View
        style={[
          Style.mainContainer,
          data.selected && Style.tableRowSelected,
          { flexDirection: 'row', marginHorizontal: Default.fixPadding * 1.5, paddingVertical: 5 },
        ]}
      >
        <View style={{ flex: 2, paddingLeft: Default.fixPadding }}>
          <Text style={{ color: displayColor }}>
            {firstName} {lastName}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text>{commission}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{formatPrice(total)}</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            onPress={() => {
              handleDisplayInvoice(userId);
            }}
            style={[
              Style.buttonStyle,
              Style.borderInfo,
              {
                paddingVertical: 0,
                marginTop: 0,
                width: 27,
                height: 25,
                marginHorizontal: 5,
                borderRadius: 5,
              },
            ]}
          >
            <Icon6 name={'file-invoice-dollar'} size={15} color={Colors.info} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PayrollRow;

const styles = StyleSheet.create({});
