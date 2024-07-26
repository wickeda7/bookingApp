import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Style from '@theme/style';
import Icon from 'react-native-vector-icons/FontAwesome';

import Maticons from 'react-native-vector-icons/MaterialCommunityIcons';
import Micons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import ServicesTableContainer from './ServicesTableContainer';
import moment from 'moment';
import { appointmentTime } from '@utils/helper';
import { useAdminContext } from '@contexts/AdminContext';
import ModalContent from '@components/admin/ModalContent';
const AccordionItem = ({ children, item, expanded, onHeaderPress }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [localItem, setLocalItem] = useState(item);
  const { setNotificationNumber } = useAdminContext();

  useEffect(() => {
    setLocalItem(item);
  }, [item]);

  let {
    timeslot,
    createdAt,
    callBack,
    client,
    specialist,
    services,
    confirmed,
    canceled,
    alert: itemAlert,
    id,
    storeID,
  } = localItem;
  const name = client?.firstName ? `${client?.firstName} ${client?.lastName}` : `${client?.name}`;

  let time = moment(createdAt).format('h:mm A');
  if (timeslot) {
    time = appointmentTime(specialist?.userInfo?.hours, timeslot);
  }
  services = typeof services === 'string' ? JSON.parse(services) : services;
  if (!services) services = [];
  const servArr = services.reduce((acc, ele) => {
    acc.push(ele.name);
    return acc;
  }, []);

  const newBooking = localItem?.type;
  const borderColor = timeslot ? Colors.info : Colors.success;
  const type = timeslot ? 'appointment' : 'walkIn';

  const updateNewBooking = () => {
    if (!newBooking) return;
    const updatedItem = { ...localItem };
    delete updatedItem.type;
    setLocalItem(updatedItem);
    setNotificationNumber((prev) => prev - 1);
  };
  const titleContent = (
    <>
      <Text style={[styles.accordTitle, { color: borderColor }]}>
        {id} {'  '}
        {tr(type)}
        {'  '} {time} {'  '}
        {name !== 'undefined' && `${name}  `}
        {specialist && `${tr('request')} ${specialist?.userInfo?.firstName} ${specialist?.userInfo?.lastName}`}
      </Text>
      <Text style={[styles.accordTitle, { color: borderColor, marginTop: Default.fixPadding * 0.5 }]}>
        {tr('services')}: {'  '}
        {servArr.join(', ').length < 90 ? `${servArr.join(', ')}` : `${servArr.join(', ').substring(0, 90)}...`}
      </Text>
    </>
  );

  if (services.length === 0) {
    const data = {
      bookingId: id,
      client,
      type: 'walkin',
      status: 'pending',
      storeId: storeID,
    };
    services.push(data);
  }

  return (
    <View style={[styles.accordContainer, { borderColor: borderColor }]}>
      <Modal animationType='fade' transparent={true} visible={visible}>
        <ModalContent message={message} setVisible={setVisible} messageType={messageType} item={localItem} />
      </Modal>
      <TouchableOpacity
        style={[styles.accordHeader, { position: 'relative' }]}
        onPress={() => {
          onHeaderPress();
          updateNewBooking();
        }}
      >
        {newBooking && (
          <View style={[Style.newBookingAlert]}>
            <Maticons name='alert-octagram-outline' size={17} color={'white'} style={{ marginRight: 4 }} />
            <Text style={{ color: Colors.white, fontSize: 12 }}>New!</Text>
          </View>
        )}
        <View style={{ flex: 15 }}>{titleContent}</View>
        <View style={{ flex: canceled ? 3 : 2, flexDirection: 'row' }}>
          {canceled ? (
            <View style={[Style.canceledContainer, { padding: 9 }]}>
              <Text style={[Style.canceledText]}>Canceled</Text>
            </View>
          ) : (
            <>
              {callBack && (
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                    setMessage(tr('sendMessageReady'));
                    setMessageType('client');
                  }}
                >
                  <View>
                    <Micons name='textsms' size={30} color={borderColor} />
                  </View>
                </TouchableOpacity>
              )}

              {type === 'appointment' && !confirmed ? (
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                    setMessage(tr('sendMessageConfirmation'));
                    setMessageType('service');
                  }}
                >
                  <View>
                    <Micons name='textsms' size={30} color={borderColor} />
                  </View>
                </TouchableOpacity>
              ) : null}
              {itemAlert && <Maticons name='bell-ring' size={20} color={'red'} style={{ marginLeft: 10 }} />}
            </>
          )}
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={borderColor} />
        </View>
      </TouchableOpacity>
      {/* {expanded && <ServicesTable services={services} canceled={canceled} />} */}
      {expanded && <ServicesTableContainer services={services} canceled={canceled} />}
    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({
  accordContainer: {
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  accordBody: {
    padding: 10,
  },
  accordHeader: {
    padding: 10,

    flex: 1,
    flexDirection: 'row',
  },
  accordTitle: {
    fontSize: 14,
  },
});
