import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { formatPrice } from '@utils/helper';
import { staff } from '@api/staff';
import Header from '@components/table/Header';
const Invoices = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`reports:${key}`);
  }

  const { navigation, route } = props;
  const date = route.params?.date;
  const specialistId = route.params?.specialistId;
  const storeId = route.params?.storeId;
  const subtotal = route.params?.subtotal;
  const tips = route.params?.tips;

  const [data, setData] = useState(null);
  const header = [
    { size: 3, name: 'service' },
    { size: 1, name: 'price' },
    { size: 1, name: 'addition' },
    { size: 1, name: 'total' },
  ];
  useEffect(() => {
    const getData = async () => {
      const res = await staff.checkInvoice(specialistId, storeId, date);
      setData(res);
    };
    getData();
  }, []);

  const Item = ({ item }) => {
    const { name, price, additional, total, createdAt, type } = item;
    const color = type === 'appointment' ? Colors.info : Colors.success;
    return (
      <>
        <View
          style={[
            Style.mainContainer,
            {
              flexDirection: 'row',
              marginHorizontal: Default.fixPadding,
              marginVertical: Default.fixPadding * 0.5,
            },
          ]}
        >
          <View style={{ flex: 3, flexDirection: 'row' }}>
            <Text style={[Fonts.Black12Regular, { color: color, marginRight: 5 }]}>
              {moment(createdAt).format(' h:mm A')}{' '}
            </Text>
            <Text style={[Fonts.Black12Regular, { color: color }]}>
              {name.substring(0, 13)} {name.length >= 13 && '...'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[Fonts.Black12Regular, { color: color }]}>{formatPrice(price * 100)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[Fonts.Black12Regular, { color: color }]}>{additional && formatPrice(additional * 100)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[Fonts.Black12Regular, { color: color }]}>{total && formatPrice(total * 100)}</Text>
          </View>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 5, marginHorizontal: 5 }]}></View>
      </>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          backgroundColor: Colors.primary,
          height: 40,
        }}
      >
        <TouchableOpacity style={{ marginHorizontal: Default.fixPadding }} onPress={() => navigation.goBack()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>{tr('payroll')}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end', marginHorizontal: Default.fixPadding * 1.5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={[Fonts.White12Medium]}>{moment(date).format('M-DD-YYYY')}</Text>
              <Text style={[Fonts.White12Medium, , { marginLeft: 10 }]}>{formatPrice(tips)}</Text>
              <Text style={[Fonts.White12SemiBold, { marginLeft: 10 }]}>Total:</Text>
              <Text style={[Fonts.White12Medium]}>{formatPrice(subtotal)}</Text>
            </View>
          </View>
        </View>
      </View>
      {data === null ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons name='note' size={50} color={Colors.primary} />
          <Text
            style={{
              ...Fonts.Primary16Bold,
              marginVertical: Default.fixPadding,
            }}
          >
            {tr('noInvoice')}
          </Text>
        </View>
      ) : (
        <>
          <Header data={header} type={'payroll'} styleHeader={'smTableHeader'} styleText={'tableHeaderText12Medium'} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ borderColor: 'red', borderWidth: 1, marginVertical: 10 }}>
              {data.services.map((item, index) => {
                return <Item key={index} item={item} />;
              })}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              padding: Default.fixPadding * 2,
            }}
          >
            <Text style={[Fonts.Primary14Medium]}>Subtotal:</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Invoices;

const styles = StyleSheet.create({});
