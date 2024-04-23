import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import ServiceRow from '@components/workers/ServiceRow';
import Header from '@components/table/Header';
import TotalView from '@components/TotalView';
const InvoiceTable = ({ data, multiple }) => {
  const { total, services, specialist, subtotal, additional, cardAmount, cashAmount, fees, tips } = data;
  let specialistName = '';
  let displayColor = Colors.black;
  if (multiple) {
    const firstName = specialist.data.attributes.userInfo.data.attributes.firstName;
    const lastName = specialist.data.attributes.userInfo.data.attributes.lastName;
    specialistName = `${firstName} ${lastName}`;
    displayColor = specialist.data.attributes.userInfo.data.attributes.displayColor;
    let service = services[services.length - 1];
    service = { ...service, specialistName, displayColor };
    services[services.length - 1] = service;
    /// if multiple add specialist name to the last row of service note:
  }
  const header = [
    { size: 2, name: 'servicename' },
    { size: 1, name: 'price' },
    { size: 1, name: 'additional' },
    { size: 1, name: 'total' },
  ];

  return (
    <>
      <View style={[Style.contentContainer, { flexDirection: 'column', marginHorizontal: Default.fixPadding }]}>
        <Header data={header} type={'incomeScreen'} styleText={'tableHeaderText14Medium'} />
      </View>
      <View style={{ paddingHorizontal: Default.fixPadding }}>
        {services.map((item) => (
          <ServiceRow key={item.id} item={item} show={true} />
        ))}
      </View>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding }]} />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <View style={[{ flex: 1, flexDirection: 'column' }]}>
          <TotalView
            subtotal={subtotal}
            additional={additional}
            total={total}
            tips={tips}
            fees={fees}
            cashAmount={cashAmount}
            cardAmount={cardAmount}
          />
        </View>
      </View>
    </>
  );
};

export default InvoiceTable;

const styles = StyleSheet.create({});
