import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Style from '@theme/style';
import { Default, Fonts, Colors } from '@constants/style';
import ServiceRow from './ServiceRow';
import { useTranslation } from 'react-i18next';
import { updateStaff, updatePrice, resetMessage } from '@redux/slices/adminHomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { formatPrice } from '@utils/helper';
import { addInvoice, updateBooking } from '@redux/actions/adminHomeAction';
import Toast from 'react-native-root-toast';

const ServicesTable = ({ services }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const [specialistId, setSpecialistId] = useState('');
  let status = false;
  let subtotal = 0;
  let additional = 0;
  let total = 0;
  const { message } = useSelector((state) => state.adminHome);
  const dispatch = useDispatch();

  const setService = (service, type, staff) => {
    dispatch(updateBooking({ type, service, staff }));
  };

  if (message !== '') {
    Toast.show(tr('invoiceCompleted'), {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: Colors.success,
      onHidden: () => {
        dispatch(resetMessage());
      },
    });
  }

  const setStaff = (staff) => {
    dispatch(updateStaff(staff));
  };
  const handleSubmit = () => {
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
          additional: additional,
          price: value.price,
          bookingId: value.bookingId,
          id: value.id,
          name: value.name,
          notes: notes,
          total: value.total,
        });
      }
      total = subtotal + additional;
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
            createdby: 'admin',
          },
        })
      );
    }
  };
  const handleDelete = () => {
    console.log('delete');
  };
  const handleTextChange = (text, item, field) => {
    const value = field === 'additional' ? text : text.nativeEvent.text;
    dispatch(updatePrice({ value, item, field }));
  };
  for (var value of services) {
    if (value.status === 'pending') continue;
    if (value.price) subtotal += value.price;
    if (value.additional) additional += value.additional;
  }
  status = services.find((obj) => obj.status === 'working');
  total = subtotal + additional;
  return (
    <>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding }]} />
      <View style={[Style.contentContainer, { flexDirection: 'column' }]}>
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
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2,
          paddingTop: Default.fixPadding * 2,
          paddingBottom: Default.fixPadding * 4,
        }}
      >
        <View style={[{ flex: 5 }]}></View>
        <View style={[{ flex: 4, flexDirection: 'column' }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary16Medium]}>Subtotal:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text>{formatPrice(subtotal * 100)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary16Medium]}>Additional:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text>{formatPrice(additional * 100)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary16Medium]}>Total:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text>{formatPrice(total * 100)}</Text>
            </View>
          </View>
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
