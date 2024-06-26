import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import DashedLine from 'react-native-dashed-line';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAdminContext } from '@contexts/AdminContext';

const TotalView = ({
  subtotal,
  additional,
  total,
  editable,

  status,
}) => {
  const { setPayBy, extendTip, setExtendTip, fees, cash, setCash, card, setCard } = useAdminContext();
  const handlePriceChange = (value, field) => {
    setPayBy('both');
    const totalCash = cash;
    const totalCard = card;
    const temp = total - value;
    if (field === 'cash') {
      setCash(value);
      setCard(temp);
    } else {
      setCard(value);
      setCash(temp);
    }
  };
  if (editable) {
    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: Default.fixPadding * 0.25,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                }}
                activeOpacity={0.8}
                onPress={() => {
                  if (!status) return;
                  console.log('setPayBy', 'cash');
                  setPayBy('cash');
                }}
              >
                <MatIcons size={27} name='cash' color={Colors.success} />
                <Text style={[Fonts.Black15Medium, { marginTop: 5, marginRight: 3, color: Colors.success }]}>
                  Total in Cash:
                </Text>
              </TouchableOpacity>
              <NumericInput
                type='decimal'
                decimalPlaces={2}
                value={cash}
                onUpdate={(value) => {
                  handlePriceChange(value, 'cash');
                }}
                style={[Style.inputStyle, { width: 65, height: 25, marginVertical: 0, padding: 4 }]}
                selectionColor={Colors.primary}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: Default.fixPadding * 0.25,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                }}
                activeOpacity={0.8}
                onPress={() => {
                  if (!status) return;
                  setPayBy('card');
                  console.log('setPayBy', 'card');
                }}
              >
                <MatIcons size={27} name='credit-card-outline' color={Colors.info} />
                <Text style={[Fonts.Black15Medium, { marginTop: 5, marginRight: 11, color: Colors.info }]}>
                  Total in Card:
                </Text>
              </TouchableOpacity>
              <NumericInput
                type='decimal'
                decimalPlaces={2}
                value={card}
                onUpdate={(value) => {
                  handlePriceChange(value, 'card');
                }}
                style={[Style.inputStyle, { width: 65, height: 25, marginVertical: 0, padding: 4 }]}
                selectionColor={Colors.primary}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Service Charge:</Text>
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[Fonts.Black14Medium]}>{formatPrice(subtotal * 100)}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Additional:</Text>
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[Fonts.Black14Medium]}>{formatPrice(additional * 100)}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Tip:</Text>
              </View>
              <View style={[{ flex: 1 }]}>
                <NumericInput
                  type='decimal'
                  decimalPlaces={2}
                  value={extendTip}
                  onUpdate={(value) => setExtendTip(value)}
                  style={[Style.inputStyle, { width: '50%', height: 25, marginVertical: 0, padding: 4 }]}
                  selectionColor={Colors.primary}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Fees:</Text>
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[Fonts.Black14Medium]}>{formatPrice(fees * 100)}</Text>
              </View>
            </View>
            <DashedLine
              dashLength={4}
              dashColor={Colors.bord}
              style={{ marginVertical: Default.fixPadding * 0.25, marginHorizontal: Default.fixPadding * 5 }}
            />
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Total:</Text>
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[Fonts.Black14Medium]}>{formatPrice(total * 100)}</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {/* {fees > 0 && (
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 5, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary13Medium]}>Fees: </Text>
              </View>
              <View style={[{ flex: 3 }]}>
                <Text style={[Fonts.Black13Medium]}>{formatPrice(fees * 100)}</Text>
              </View>
            </View>
          )}
          {cardAmount > 0 && (
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 5, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary13Medium]}>Card Amount: </Text>
              </View>
              <View style={[{ flex: 3 }]}>
                <Text style={[Fonts.Black13Medium]}>{formatPrice(cardAmount * 100)}</Text>
              </View>
            </View>
          )}
          {cashAmount > 0 && (
            <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
              <View style={[{ flex: 5, alignItems: 'flex-end' }]}>
                <Text style={[Fonts.Primary13Medium]}>Cash Amount: </Text>
              </View>
              <View style={[{ flex: 3 }]}>
                <Text style={[Fonts.Black13Medium]}>{formatPrice(cashAmount * 100)}</Text>
              </View>
            </View>
          )} */}
        </View>
        <View style={{ flex: 1.1, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
            <View style={[{ flex: 2, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary13Medium]}>Service Charge: </Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black13Medium]}>{formatPrice(subtotal * 100)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
            <View style={[{ flex: 2, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary13Medium]}>Additional: </Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black13Medium]}>{formatPrice(additional * 100)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
            <View style={[{ flex: 2, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary13Medium]}>Tip: </Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black13Medium]}>{formatPrice(extendTip * 100)}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
            <View style={[{ flex: 2, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary13Medium]}>Total: </Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black13Medium]}>{formatPrice(total * 100)}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default TotalView;

const styles = StyleSheet.create({});
