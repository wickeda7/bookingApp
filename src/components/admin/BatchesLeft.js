import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
import DashedLine from 'react-native-dashed-line';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import { useAuthContext } from '@contexts/AuthContext';
import BatchesCharts from './BatchesCharts';
import { useSelector } from 'react-redux';

const BatchesLeft = ({ data }) => {
  const { userData } = useAuthContext();
  const { serviceItems } = useSelector((state) => state.batches);

  const employees = userData.storeAdmin.employee;
  const totalTickets = data.length;
  const {
    card,
    cash,
    tips,
    subtotal,
    total,
    walkin,
    appointment,
    services,
    specialistsAmount,
    specialistsAdditional,
    specialistsTips,
  } = data.reduce(
    (acc, item) => {
      const { cardAmount, cashAmount, tips, subtotal, total, additional, type, services, specialist } = item.attributes;
      const specialistId = specialist.data.id;
      acc.card += cardAmount * 100;
      acc.cash += cashAmount * 100;
      acc.tips += tips * 100;
      acc.subtotal += subtotal * 100;
      acc.total += total * 100;
      if (type === 'walkin') {
        acc.walkin += 1;
      } else {
        acc.appointment += 1;
      }
      if (!acc.specialistsAmount[specialistId]) {
        acc.specialistsAmount[specialistId] = total * 100;
      } else {
        acc.specialistsAmount[specialistId] += total * 100;
      }
      if (!acc.specialistsAdditional[specialistId]) {
        acc.specialistsAdditional[specialistId] = additional * 100;
      } else {
        acc.specialistsAdditional[specialistId] += additional * 100;
      }
      if (!acc.specialistsTips[specialistId]) {
        acc.specialistsTips[specialistId] = tips * 100;
      } else {
        acc.specialistsTips[specialistId] += tips * 100;
      }
      services.forEach((service) => {
        if (!acc.services[service.id]) {
          acc.services[service.id] = 1;
        } else {
          acc.services[service.id] += 1;
        }
      });
      return acc;
    },
    {
      card: 0,
      cash: 0,
      tips: 0,
      subtotal: 0,
      total: 0,
      walkin: 0,
      appointment: 0,
      services: [],
      specialistsAmount: [],
      specialistsAdditional: [],
      specialistsTips: [],
    }
  );

  let amountData = [];
  let additionalData = [];
  let tipsData = [];
  let servicesData = [];
  services.forEach((service, index) => {
    const { name, displayColor } = serviceItems.find((item) => item.id === index);
    servicesData.push({
      value: service,
      dataPointText: service,
      label: name.replace(/\s/g, '').slice(0, 5),
    });
  });
  specialistsAmount.forEach((amount, index) => {
    const specialist = employees.find((employee) => employee.id === index);
    const { firstName, lastName, displayColor } = specialist.userInfo;
    const color = displayColor ? displayColor : '#000000';
    const name = `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`;
    amountData.push({
      value: amount / 100,
      dataPointText: amount / 100,
      frontColor: color,
      label: name,
      labelTextStyle: { color: color },
    });
  });

  specialistsAdditional.forEach((additional, index) => {
    const specialist = employees.find((employee) => employee.id === index);
    const { firstName, lastName, displayColor } = specialist.userInfo;
    const color = displayColor ? displayColor : '#000000';
    const name = `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`;
    additionalData.push({
      value: additional / 100,
      dataPointText: additional / 100,
      frontColor: color,
      label: name,
      labelTextStyle: { color: color },
    });
  });
  specialistsTips.forEach((tips, index) => {
    const specialist = employees.find((employee) => employee.id === index);
    const { firstName, lastName, displayColor } = specialist.userInfo;
    const color = displayColor ? displayColor : '#000000';
    const name = `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`;
    tipsData.push({
      value: tips / 100,
      dataPointText: tips / 100,
      frontColor: color,
      label: name,
      labelTextStyle: { color: color },
    });
  });
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <BatchesCharts
          servicesData={servicesData}
          amountData={amountData}
          additionalData={additionalData}
          tipsData={tipsData}
        />
      </View>
      <View
        style={[Style.divider, { marginVertical: Default.fixPadding * 2, marginHorizontal: Default.fixPadding * 1.5 }]}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={[{ flex: 3, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Total Walk-Ins:</Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black14Medium]}>{walkin}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={[{ flex: 3, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Total Appointments:</Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black14Medium]}>{appointment}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={[{ flex: 3, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Total Tickets:</Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black14Medium]}>{totalTickets}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={[{ flex: 3, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Total Cash:</Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black14Medium]}>{formatPrice(cash)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={[{ flex: 3, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Total Card:</Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black14Medium]}>{formatPrice(card)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={[{ flex: 3, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Total Tips:</Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black14Medium]}>{formatPrice(tips)}</Text>
            </View>
          </View>
          <DashedLine
            dashLength={4}
            dashColor={Colors.bord}
            style={{ marginVertical: Default.fixPadding, marginLeft: '30%', marginRight: '3%' }}
          />
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={[{ flex: 3, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary14Medium, { marginRight: 5 }]}>Grand Total:</Text>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={[Fonts.Black14Medium]}>{formatPrice(total)}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.borderLeft, { flex: 1, justifyContent: 'center' }]}>
          <TouchableOpacity
            onPress={() => setTurn(true)}
            style={[
              Style.buttonStyle,
              // Style.borderInfo,
              {
                paddingVertical: 4,
                marginTop: 0,
                flexDirection: 'row',
                width: 140,
                height: 35,
                marginHorizontal: 10,
                backgroundColor: Colors.info,
              },
            ]}
          >
            <Icon6 name={'file-arrow-up'} size={18} color={Colors.white} />
            <Text
              style={[
                Fonts.White14Bold,
                {
                  paddingHorizontal: Default.fixPadding * 0.5,
                },
              ]}
            >
              Close Batch
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default BatchesLeft;

const styles = StyleSheet.create({
  borderLeft: {
    borderLeftColor: Colors.bord,
    borderLeftWidth: 1,
    marginLeft: Default.fixPadding * 2,
    paddingLeft: Default.fixPadding * 1.5,
  },
});
