import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Style from '@theme/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Micons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import ServicesTable from './ServicesTable';
import moment from 'moment';
import { appointmentTime } from '@utils/helper';
import { booking } from '@api/booking';
const AccordionItem = ({ children, item, expanded, onHeaderPress }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  //console.log('item', item);
  let { timeslot, createdAt, callBack, client, specialist, services, confirmed } = item;
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
  const sendClientMessage = async () => {
    const {
      client: { userInfo },
    } = item;
    const data = {
      subject: 'Your Service',
      message: `Hello ${userInfo.firstName} your service will be ready in 10 minutes. Thank you for your patience.`,
      pushToken: userInfo.pushToken,
      phone: userInfo.phoneNumber,
    };
    const response = await booking.message(data);
    if (response) {
      setVisible(false);
    }
  };
  const sendConfirmation = () => {
    console.log('sendConfirmation', item);
  };
  const borderColor = timeslot ? Colors.info : Colors.success;
  const type = timeslot ? 'appointment' : 'walkIn';
  const titleContent = (
    <>
      <Text style={[styles.accordTitle, { color: borderColor }]}>
        {tr(type)}
        {'  '} {time} {'  '}
        {client?.userInfo?.firstName} {client?.userInfo?.lastName} {'  '}
        {specialist && `${tr('request')} ${specialist?.userInfo?.firstName} ${specialist?.userInfo?.lastName}`}
      </Text>
      <Text style={[styles.accordTitle, { color: borderColor, marginTop: Default.fixPadding * 0.5 }]}>
        {tr('services')}: {'  '}
        {servArr.join(', ').length < 90 ? `${servArr.join(', ')}` : `${servArr.join(', ').substring(0, 90)}...`}
      </Text>
    </>
  );

  return (
    <View style={[styles.accordContainer, { borderColor: borderColor }]}>
      <Modal animationType='fade' transparent={true} visible={visible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <View
            style={{
              width: 400,
              paddingHorizontal: Default.fixPadding * 1.5,
              paddingVertical: Default.fixPadding * 1.5,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <Text style={{ ...Fonts.Black16Medium, textAlign: 'left' }}>{message}</Text>
            <View
              style={[
                Style.divider,
                { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 },
              ]}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginVertical: Default.fixPadding * 1.5,
              }}
            >
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text
                  style={{
                    ...Fonts.ExtraLightGrey18Medium,
                    marginHorizontal: Default.fixPadding * 2,
                  }}
                >
                  {tr('cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (messageType === 'client') sendClientMessage();
                  else sendConfirmation();
                }}
              >
                <Text
                  style={{
                    ...Fonts.Primary18Medium,
                    marginRight: Default.fixPadding,
                  }}
                >
                  {tr('send')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={[styles.accordHeader]} onPress={onHeaderPress}>
        <View style={{ flex: 15 }}>{titleContent}</View>
        {callBack && (
          <TouchableOpacity
            style={{ flex: 2, borderColor: 'red', borderWidth: 1 }}
            onPress={() => {
              setVisible(true);
              setMessage(tr('sendClientMessage'));
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
            style={{ flex: 2, borderColor: 'green', borderWidth: 1 }}
            onPress={() => console.log('This is printed always1')}
          >
            <View>
              <Micons name='textsms' size={30} color={borderColor} />
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={borderColor} />
        </View>
      </TouchableOpacity>
      {expanded && <ServicesTable services={services} />}
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
