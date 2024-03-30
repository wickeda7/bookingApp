import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import { useAuthContext } from '@contexts/AuthContext';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceByDate } from '@redux/actions/staffAction';
import Loader from '@components/loader';
import Accordion from '@components/Accordion';
const ListView = ({ selectedDate, navigation }) => {
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { invoiceByDate, weeklyTips, weeklyTotal, isLoading } = useSelector((state) => state.staff);

  const userId = userData?.id;
  const storeId = userData?.storeEmployee?.id;
  const from = selectedDate?.from ? `From ${moment(selectedDate.from).format('M/D/YY')}` : '';
  const to = selectedDate?.to ? ` to ${moment(selectedDate.to).format('M/D/YY')}` : '';
  useEffect(() => {
    if (selectedDate?.from && selectedDate?.to) {
      dispatch(getInvoiceByDate({ from: selectedDate.from, to: selectedDate.to, userId, storeId }));
    }
  }, [selectedDate]);
  return (
    <>
      <Loader visible={isLoading} />
      {selectedDate && (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: Default.fixPadding,
              margin: Default.fixPadding,
            }}
          >
            <Text style={[Fonts.Black14Medium]}>
              {from} {to}
            </Text>
          </View>
          <View style={[Fonts.Divider, { backgroundColor: Colors.bord }]}></View>
        </>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: Default.fixPadding }}>
        <Accordion data={invoiceByDate} type={'staff'} navigation={navigation} />
      </ScrollView>
    </>
  );
};

export default ListView;

const styles = StyleSheet.create({});
