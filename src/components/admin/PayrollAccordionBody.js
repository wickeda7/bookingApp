import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import moment from 'moment';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import Header from '../table/Header';
const PayrollAccordionBody = ({ item }) => {
  const header = [
    { size: 1, name: 'time' },
    { size: 3, name: 'service' },
    { size: 1, name: 'price' },
    { size: 1, name: 'additional' },
    { size: 1, name: 'total' },
  ];
  const { data, tips, total } = item;
  const { subtotal, items } = data.reduce(
    (acc, item) => {
      acc.subtotal += item.subtotal * 100;
      const temp = item.services.map((service) => {
        return { ...service, createdAt: item.createdAt };
      });
      acc.items = [...acc.items, ...temp];
      return acc;
    },
    { subtotal: 0, items: [] }
  );
  const Item = ({ item }) => {
    const { name, price, additional, total, createdAt } = item;
    return (
      <>
        <View
          style={[
            Style.mainContainer,
            {
              flexDirection: 'row',
              marginHorizontal: Default.fixPadding * 0.5,
              marginVertical: Default.fixPadding,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text>{moment(createdAt).format(' h:mm A')}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text>{name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{formatPrice(price * 100)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{additional && formatPrice(additional * 100)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{total && formatPrice(total * 100)}</Text>
          </View>
        </View>
        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 5, marginHorizontal: 5 }]}></View>
      </>
    );
  };
  return (
    <View style={{ marginVertical: Default.fixPadding }}>
      <Header data={header} type={'payroll'} styleHeader={'smTableHeader'} styleText={'tableHeaderText14Medium'} />
      {items.map((item, index) => {
        return <Item key={index} item={item} />;
      })}
      <View
        style={{
          flexDirection: 'row',
          padding: Default.fixPadding * 2,
        }}
      >
        <View style={[{ flex: 5 }]}></View>
        <View style={[{ flex: 4, flexDirection: 'column' }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium]}>Subtotal:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text style={[Fonts.Black14Medium]}>{formatPrice(subtotal)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium]}>Additional:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text style={[Fonts.Black14Medium]}>{formatPrice(tips)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium]}>Total:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text style={[Fonts.Black14Medium]}>{formatPrice(total)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PayrollAccordionBody;

const styles = StyleSheet.create({});
