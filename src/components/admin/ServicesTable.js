import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Style from '@theme/style';
import { Default, Fonts, Colors } from '@constants/style';
import ServiceRow from './ServiceRow';
import { useTranslation } from 'react-i18next';
import { updateStaff, updatePrice } from '@redux/slices/adminHomeSlice';
import { useDispatch } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { addInvoice, updateBooking, updateBookingService } from '@redux/actions/adminHomeAction';
import TotalView from '../TotalView';
import { useAdminContext } from '@contexts/AdminContext';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useAuthContext } from '@contexts/AuthContext';
import { getServiceItems } from '@redux/actions/batchesAction';
import { cleanServices } from '@utils/helper';

const ServicesTable = ({ services, canceled }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const { setTurn, amountPerTurn, newService, setNewService, totalView, startScan, disconnectFromDevice } =
    useAdminContext();
  const { userData } = useAuthContext();
  const { staffAvailable } = useSelector((state) => state.adminHome);
  const { serviceItems } = useSelector((state) => state.batches);
  const [tip, setTip] = useState(0);
  const [fees, setFees] = useState(0);
  const [cash, setCash] = useState(0);
  const [card, setCard] = useState(0);
  const [payBy, setPayBy] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [additional, setAdditional] = useState(0);
  const [total, setTotal] = useState(0);
  const [addService, setAddService] = useState(false);

  const storeId = userData.storeAdmin.id;
  let extendIcon = '';
  let extendText = '';
  let extendColor = '';

  if (totalView) {
    extendIcon = 'screen-share';
    extendText = 'Screen On';
    extendColor = Colors.green;
  } else {
    extendIcon = 'stop-screen-share';
    extendText = 'Screen Off';
    extendColor = Colors.red;
  }
  let status = false;
  const dispatch = useDispatch();

  const bookingId = services[0].bookingId;
  const serviceIcon = addService ? 'closecircle' : 'pluscircle';
  const serviceColor = addService ? Colors.red : Colors.info;
  const serviceText = addService ? 'Cancel' : 'Add Service';

  useEffect(() => {
    if (services.length === 0) return;

    let tempSubtotal = 0;
    let tempAdditional = 0;
    for (var value of services) {
      if (value.status === 'pending') continue;
      if (value.price) tempSubtotal += value.price;
      if (value.additional) tempAdditional += value.additional;
    }
    setSubtotal(tempSubtotal);
    setAdditional(tempAdditional);
    setTotal(tempSubtotal + tempAdditional);
    if (payBy === null) setPayBy('cash');
  }, [services]);

  status = services.find((obj) => obj.status === 'working');

  useEffect(() => {
    if (newService) {
      setAddService(false);
      let tempService = { ...services[0] };
      tempService = { ...services[0], ...newService };
      services.push(tempService);
      ////
      const updatedServices = services.map((service) => {
        return { id: service.id, name: service.name, price: service.price };
      });
      dispatch(updateBookingService({ id: tempService.bookingId, services: updatedServices }));
      setNewService(null);
    }
  }, [newService]);

  const setService = (service, type, staff) => {
    dispatch(updateBooking({ type, service, staff }));
  };

  const setStaff = (staff) => {
    if (setTurn && amountPerTurn) {
      const date = moment().format('YYYY-MM-DD');
      const objectIndex = staffAvailable.findIndex((obj) => obj.id === staff.id);
      if (!moment(date).isSame(staff.date)) {
        staff = { ...staff, date, amountPerTurn, turn: 1, positionAt: objectIndex };
      } else {
        staff = { ...staff, turn: staff.turn + 1, positionAt: objectIndex };
      }
    }
    dispatch(updateStaff(staff));
  };

  const handleToggleScreen = () => {
    if (canceled || !status) return;
    const bookingId = services[0].bookingId;
    const newServices = cleanServices(services); //tip, fees, cash, card, payBy

    const data = { newServices, subtotal, total, additional, bookingId, tip, fees, cash, card, payBy };
    startScan(data);
  };
  const handleSubmit = () => {
    if (canceled || !status) return;
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
  const handleAddService = () => {
    setAddService(!addService);
    if (!addService) {
      if (!serviceItems) {
        dispatch(getServiceItems({ storeId }));
      }
      let tempService = { ...services[0] };
      tempService.newService = true;
      tempService.name = '';
      tempService.price = 0;
      tempService.additional = 0;
      tempService.total = 0;
      services.push(tempService);
    } else {
      services.pop();
    }

    // if (canceled) return;
    // dispatch(updateBooking({ type: 'add' }));
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
      <View style={{ flexDirection: 'row', paddingHorizontal: Default.fixPadding * 2 }}>
        <View style={[{ flex: 1 }]}>
          <TouchableOpacity
            onPress={() => {
              handleAddService();
            }}
            style={[
              {
                flexDirection: 'row',
                width: 150,
              },
            ]}
          >
            <AntIcon size={15} name={serviceIcon} color={serviceColor} />
            <Text
              style={[
                { paddingHorizontal: Default.fixPadding * 0.5, color: serviceColor, fontSize: 13, fontWeight: '600' },
              ]}
            >
              {serviceText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2,
          paddingTop: Default.fixPadding,
          paddingBottom: Default.fixPadding * 4,
          opacity: canceled ? 0.3 : 1,
        }}
      >
        <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
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
            payBy={payBy}
            setPayBy={setPayBy}
            status={status}
            setFees={setFees}
            bookingId={bookingId}
          />

          <View
            style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 1, padding: Default.fixPadding, alignItems: 'center' }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  disconnectFromDevice();
                }}
                style={[
                  Style.buttonStyle,
                  {
                    backgroundColor: Colors.green,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 120,
                    opacity: status ? 1 : 0.4,
                  },
                ]}
              >
                <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>STOP</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ flex: 1, padding: Default.fixPadding, alignItems: 'center' }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleToggleScreen();
                }}
                style={[
                  Style.buttonStyle,
                  {
                    backgroundColor: extendColor,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 120,
                    opacity: status ? 1 : 0.4,
                  },
                ]}
              >
                <Ionicons name={extendIcon} size={18} color={Colors.white} />
                <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>{extendText}</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ flex: 1, paddingVertical: Default.fixPadding, alignItems: 'center' }]}>
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
