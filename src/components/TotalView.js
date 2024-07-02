import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import DashedLine from 'react-native-dashed-line';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { feesAmount } from '@constants/settings';
import { useAdminContext } from '@contexts/AdminContext';
import _ from 'lodash';
const TotalView = ({
  subtotal,
  additional,
  total,
  editable,
  setTip,
  tips,
  fees,
  cash,
  setCash,
  card,
  setCard,
  payBy,
  setPayBy,
  status,
  setFees,
  bookingId,
}) => {
  const [displayTotal, setDisplayTotal] = useState('');
  const [cashInput, setCashInput] = useState(0);
  const [cardInput, setCardInput] = useState(0);
  const { receivedData } = useAdminContext();

  useEffect(() => {
    if (receivedData === null) return;
    if (bookingId !== receivedData.bookingId) return;
    setTip(receivedData.tip);
    setFees(receivedData.fees);
    setCash(receivedData.cash);
    setCashInput(receivedData.cash);
    setCard(receivedData.card);
    setCardInput(receivedData.card);
    setPayBy(receivedData.payBy);
  }, [receivedData]);

  const debouncedHandleChange = useCallback(
    _.debounce((value, field, total, tips, setCash, setCard) => {
      let tempFees = feesAmount;
      setFees(feesAmount);
      const tempTip = tips > 0 ? tips : 0;
      const temp = total - value + tempTip;
      if (field === 'cash') {
        setCash(value);
        setCashInput(value);
        setCard(temp + tempFees);
        setCardInput(temp + tempFees);
      } else {
        if (value === 0) {
          tempFees = 0;
          setFees(0);
        }
        setCard(value + tempFees);
        setCardInput(value + tempFees);
        setCash(temp);
        setCashInput(temp);
      }
      setDisplayTotal(total + tempTip + tempFees);
    }, 500), // Adjust the debounce delay (in milliseconds) as needed
    []
  );

  useEffect(() => {
    if (payBy === null) return;
    if (payBy === 'cash') {
      setCashInfo();
    } else if (payBy === 'card') {
      setCardInfo();
    } else if (payBy === 'both') {
      const tempTips = tips > 0 ? tips : 0;
      const tempCardAmount = total - cash + tempTips + feesAmount;
      setCard(tempCardAmount);
      setCardInput(tempCardAmount);
      setDisplayTotal(total + tempTips + feesAmount);
    }
  }, [payBy, tips, fees, total]);

  const setCashInfo = () => {
    const tempTips = tips > 0 ? tips : 0;
    const temp = total + tempTips;
    setCash(temp);
    setCashInput(temp);
    setDisplayTotal(temp);
  };

  const setCardInfo = () => {
    setFees(feesAmount);
    setCash(0);
    const tempTips = tips > 0 ? tips : 0;
    const temp = total + tempTips + feesAmount;
    setCard(temp);
    setCardInput(temp);
    setDisplayTotal(temp);
  };

  const handlePriceChange = (value, field) => {
    setPayBy('both');
    if (!value) value = 0;
    debouncedHandleChange(value, field, total, tips, setCash, setCard);
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
                  setPayBy('cash');
                  setCard(0);
                  setFees(0);
                  setCardInput(0);
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
                value={cashInput}
                onUpdate={(value) => {
                  setCashInput(value);
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
                  setCash(0);
                  setCashInput(0);
                  setFees(feesAmount);
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
                value={cardInput}
                onUpdate={(value) => {
                  setCardInput(value);
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
                  value={tips}
                  onUpdate={(value) => {
                    if (!value) value = 0;
                    setTip(value);
                  }}
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
                <Text style={[Fonts.Black14Medium]}>{formatPrice(displayTotal * 100)}</Text>
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
              <Text style={[Fonts.Black13Medium]}>{formatPrice(tips * 100)}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginVertical: Default.fixPadding * 0.25 }}>
            <View style={[{ flex: 2, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary13Medium]}>Total: </Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black13Medium]}>{formatPrice(displayTotal * 100)}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default TotalView;

const styles = StyleSheet.create({});
