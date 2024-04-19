import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import moment from 'moment';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import Header from '../table/Header';
import TotalView from '../TotalView';
const PayrollAccordionBody = ({ item }) => {
  const header = [
    { size: 1, name: 'time' },
    { size: 3, name: 'service' },
    { size: 1, name: 'price' },
    { size: 1, name: 'additional' },
    { size: 1, name: 'total' },
  ];
  const { data, tips, additional, total, subtotal } = item;

  const { items } = data.reduce(
    (acc, item) => {
      const temp = item.services.map((service) => {
        return { ...service, createdAt: item.createdAt, type: item.type };
      });
      acc.items = [...acc.items, ...temp];
      return acc;
    },
    { items: [] }
  );
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
              marginHorizontal: Default.fixPadding * 0.5,
              marginVertical: Default.fixPadding,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: color }}>{moment(createdAt).format(' h:mm A')}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={{ color: color }}>{name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: color }}>{formatPrice(price * 100)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: color }}>{additional && formatPrice(additional * 100)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: color }}>{total && formatPrice(total * 100)}</Text>
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
        <View style={[{ flex: 1 }]}></View>
        <View style={[{ flex: 1, flexDirection: 'column' }]}>
          <TotalView subtotal={subtotal / 100} additional={additional / 100} tips={tips / 100} total={total / 100} />
        </View>
      </View>
    </View>
  );
};

export default PayrollAccordionBody;

const styles = StyleSheet.create({});
