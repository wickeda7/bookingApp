import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import moment from 'moment';
import DashedLine from 'react-native-dashed-line';
import { staff } from '@api/staff';
import InvoiceTable from '@components/workers/InvoiceTable';
const InvoiceDetail = (props) => {
  const { navigation, route } = props;
  const { data } = route.params;
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    if (specialists.length > 1) {
      const specialistId = specialist.data.id;
      const specialistData = specialists.filter((item) => item.id !== specialistId);
      if (specialistData.length > 0) {
        getInvoice(specialistData);
      }
    }
  }, []);

  const { client, appointment, createdAt, specialist } = data;
  const userAttributes = client?.data?.attributes?.userInfo?.data?.attributes;

  const lastName = userAttributes.lastName ? userAttributes.lastName : '';
  const firstName = userAttributes.firstName ? userAttributes.firstName : '';
  const image = userAttributes.profileImg?.data?.attributes?.url
    ? userAttributes.profileImg?.data?.attributes?.url
    : '';
  const specialists = appointment?.data?.attributes.specialists.data;
  const appointmentId = appointment.data.id;

  const getItem = async (specialistId, appointmentId) => {
    const invoice = await staff.getInvoiceBySpecialist({ specialistId, appointmentId });
    return invoice;
  };
  const getInvoice = async (specialistData) => {
    let invoicesData = [];
    specialistData.forEach((gtin) => {
      invoicesData.push(getItem(gtin.id, appointmentId));
    });

    Promise.all(invoicesData).then((allItemData) => {
      if (allItemData.length > 0) {
        setInvoiceData(allItemData);
      }
    });
  };
  const lastRow = invoiceData.length - 1;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`incomeScreen:${key}`);
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={Style.navBackButton} onPress={() => navigation.pop()}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>Report</Text>
      </View>
      <View
        style={{
          flex: 8.2,
          backgroundColor: Colors.white,
        }}
      >
        {image !== '' && (
          <>
            <Avatar.Image
              size={80}
              source={{
                uri: image,
              }}
              style={{
                marginTop: -40,
                alignSelf: 'center',
                zIndex: 10,
              }}
            />
          </>
        )}
        {firstName !== '' && (
          <Text style={{ ...Fonts.Grey14Medium, textAlign: 'center' }}>
            {firstName} {lastName}
          </Text>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              marginVertical: Default.fixPadding * 1.5,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: Default.fixPadding,
                borderLeftWidth: 2,
                borderLeftColor: Colors.lightGrey,
              }}
            >
              <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Ionicons name='time-outline' color={Colors.black} size={20} />
                <Text
                  style={{
                    ...Fonts.Black14Medium,
                    marginHorizontal: Default.fixPadding * 0.5,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  {tr('time')}
                </Text>
              </View>
              <Text style={Fonts.Grey14Medium}>{moment(createdAt).format('h:mm A')}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: Default.fixPadding,
                borderLeftWidth: 2,
                borderLeftColor: Colors.lightGrey,
              }}
            >
              <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Ionicons name='calendar-outline' color={Colors.black} size={20} />
                <Text
                  style={{
                    ...Fonts.Black14Medium,
                    marginHorizontal: Default.fixPadding * 0.5,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  {tr('date')}
                </Text>
              </View>
              <Text style={Fonts.Grey14Medium}>{moment(createdAt).format('M-DD-YYYY')}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: Default.fixPadding,
                borderLeftWidth: 2,
                borderLeftColor: Colors.lightGrey,
              }}
            >
              <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Ionicons name='receipt-outline' color={Colors.black} size={20} />
                <Text
                  style={{
                    ...Fonts.Black14Medium,
                    marginHorizontal: Default.fixPadding * 0.5,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  Ticket No.
                </Text>
              </View>
              <Text style={Fonts.Grey14Medium}>#{appointmentId}</Text>
            </View>
          </View>
          <DashedLine
            dashLength={5}
            dashColor={Colors.extraLightGrey}
            style={{ marginTop: Default.fixPadding, marginHorizontal: Default.fixPadding }}
          />
          <InvoiceTable data={data} />
          {invoiceData.length > 0 &&
            invoiceData.map((item, index) => {
              return <InvoiceTable key={index} data={item} multiple />;
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({});
