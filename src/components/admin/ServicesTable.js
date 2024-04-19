import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Style from '@theme/style';
import { Default, Fonts, Colors } from '@constants/style';
import ServiceRow from './ServiceRow';
import { useTranslation } from 'react-i18next';
import { updateStaff, updatePrice, resetMessage } from '@redux/slices/adminHomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { addInvoice, updateBooking } from '@redux/actions/adminHomeAction';
import TotalView from '../TotalView';

const ServicesTable = ({ services, canceled }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const [tip, setTip] = useState(0);
  const [fees, setFees] = useState(0);
  const [cash, setCash] = useState(0);
  const [card, setCard] = useState(0);
  const [payBy, setPayBy] = useState('cash');

  let status = false;
  let subtotal = 0;
  let additional = 0;
  let total = 0;
  const feesAmount = 2;
  const dispatch = useDispatch();

  for (var value of services) {
    if (value.status === 'pending') continue;
    if (value.price) subtotal += value.price;
    if (value.additional) additional += value.additional;
  }
  status = services.find((obj) => obj.status === 'working');
  total = subtotal + additional + tip + fees;

  useEffect(() => {
    if (payBy === 'cash') {
      setCard(0);
      setFees(0);
      setCash(total);
    } else if (payBy === 'card') {
      setCash(0);
      setFees(feesAmount);
      setCard(total + feesAmount);
    }
  }, [payBy]);

  useEffect(() => {
    if (card === 0) return;
    setFees(2);
  }, [card]);

  useEffect(() => {
    if (payBy === 'card') {
      setCard(total);
    } else if (payBy === 'cash') {
      setCash(total);
    } else {
    }
  }, [tip, fees, additional]);

  const setService = (service, type, staff) => {
    dispatch(updateBooking({ type, service, staff }));
  };

  const setStaff = (staff) => {
    dispatch(updateStaff(staff));
  };

  const handleSubmit = () => {
    if (canceled) return;
    const model = {};
    services.reduce((acc, person) => {
      const specialist = person.specialist.id;
      let group = acc[specialist] || [];
      group.push(person);
      acc[specialist] = group;
      return acc;
    }, model);
    for (const key in model) {
      let subtotal = 0;
      let additional = 0;
      let total = 0;
      let services = [];
      let notes = '';
      const clientId = model[key][0].client.id;
      const specialistId = model[key][0].specialist.id;
      const type = model[key][0].timeslot === null ? 'walkin' : 'appointment';
      const storeId = model[key][0].storeID;
      const bookingId = model[key][0].bookingId;
      // setSpecialistId(specialistId);
      for (const value of model[key]) {
        if (value.price) subtotal += value.price;
        if (value.additional !== undefined) additional += value.additional;
        if (value.notes !== undefined) notes = value.notes;

        services.push({
          additional: value.additional !== undefined ? value.additional : 0,
          price: value.price,
          bookingId: value.bookingId,
          id: value.id,
          name: value.name,
          notes: notes,
          total: value.total,
        });
      }
      total = subtotal + additional + tip;

      dispatch(
        addInvoice({
          data: {
            client: clientId,
            specialist: specialistId,
            type,
            store: storeId,
            appointment: bookingId,
            services,
            subtotal,
            additional,
            total,
            tips: tip,
            fees,
            cashAmount: cash,
            cardAmount: card,
            createdby: 'admin',
          },
        })
      );
      setCard(0);
      setCash(0);
      setTip(0);
      setPayBy('cash');
      setFees(0);
    }
  };
  const handleDelete = () => {
    if (canceled) return;
    console.log('delete');
  };
  const handleTextChange = (text, item, field) => {
    if (canceled) return;
    const value = field === 'additional' ? text : text.nativeEvent.text;
    dispatch(updatePrice({ value, item, field }));
  };

  return (
    <>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding }]} />
      <View style={[Style.contentContainer, { flexDirection: 'column', opacity: canceled ? 0.3 : 1 }]}>
        <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
          <Text style={[Style.tableHeaderText15Medium, { flex: 2, marginLeft: 0 }]}>{tr('staff')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 4, marginLeft: 0 }]}>{tr('servicename')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>{tr('price')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}> {tr('additional')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>{tr('total')}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {services.map((service, index) => (
          <ServiceRow
            key={index}
            item={service}
            setService={setService}
            handleTextChange={handleTextChange}
            setStaff={setStaff}
            canceled={canceled}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2,
          paddingTop: Default.fixPadding,
          paddingBottom: Default.fixPadding * 4,
          opacity: canceled ? 0.3 : 1,
        }}
      >
        <View style={[{ flex: 1 }]}></View>
        <View style={[{ flex: 1, flexDirection: 'column' }]}>
          <TotalView
            subtotal={subtotal}
            additional={additional}
            total={total}
            editable={true}
            setTip={setTip}
            tips={tip}
            fees={fees}
            cash={cash}
            setCash={setCash}
            card={card}
            setCard={setCard}
            setPayBy={setPayBy}
          />

          <View
            style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'center' }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleDelete();
                }}
                style={[
                  Style.buttonStyle,
                  {
                    backgroundColor: Colors.red,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 110,
                    opacity: status ? 0.4 : 1,
                  },
                ]}
              >
                <AntIcon size={18} name='delete' color={Colors.white} />
                <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>{tr('delete')}</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding, alignItems: 'center' }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleSubmit();
                }}
                style={[
                  Style.buttonStyle,
                  {
                    backgroundColor: Colors.info,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 100,
                    opacity: status ? 1 : 0.4,
                  },
                ]}
              >
                <AntIcon size={18} name='upload' color={Colors.white} />
                <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>{tr('submit')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ServicesTable;

const styles = StyleSheet.create({});
