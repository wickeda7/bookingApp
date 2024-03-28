import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { Colors, Fonts, Default, DefaultImage } from '@constants/style';
import Style from '@theme/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { formatPhoneNumber, formatPrice } from '@utils/helper';
import moment from 'moment';
import DashedLine from 'react-native-dashed-line';
import ServiceRow from '@components/workers/ServiceRow';
const InvoiceDetail = (props) => {
  const { navigation, route } = props;
  const { data } = route.params;
  const { createdAt, total, services, client, type, updatedAt, subtotal, additional } = data;

  const id = client?.data?.id;
  const attributes = client?.data?.attributes;
  const userId = client?.data?.attributes?.userInfo?.data?.id;
  const userAttributes = client?.data?.attributes?.userInfo?.data?.attributes;
  const clientData = { ...attributes, id, userInfo: { ...userAttributes, id: userId } };
  const lastName = clientData?.userInfo?.lastName ? clientData.userInfo.lastName : '';
  const firstName = clientData?.userInfo?.firstName ? clientData.userInfo.firstName : '';
  const image = clientData?.userInfo?.profileImg?.data?.attributes?.url
    ? clientData?.userInfo?.profileImg?.data?.attributes?.url
    : '';
  //console.log('tempClient', data);
  // console.log('clientData', Object.keys(clientData)); /// if length is 1, then it is empty because of userInfo
  //console.log('services', services);
  // console.log('navigation', navigation);
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
            <Text style={{ ...Fonts.Grey14Medium, textAlign: 'center' }}>
              {firstName} {lastName}
            </Text>
          </>
        )}
        {Object.keys(clientData).length > 1 && (
          <>
            <Text style={{ ...Fonts.Grey14Medium, textAlign: 'center' }}>{clientData.email}</Text>
            <Text style={{ ...Fonts.Grey14Medium, textAlign: 'center' }}>
              {formatPhoneNumber(clientData?.userInfo?.phoneNumber)}
            </Text>
          </>
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
                flex: 2.5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: Default.fixPadding,
                borderLeftWidth: isRtl ? 2 : 0,
                borderLeftColor: isRtl ? Colors.lightGrey : null,
              }}
            >
              <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Ionicons name='calendar-outline' color={Colors.black} size={20} />
                <Text
                  style={{
                    ...Fonts.Black16Medium,
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
                flex: 3.5,
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
                    ...Fonts.Black16Medium,
                    marginHorizontal: Default.fixPadding * 0.5,
                    marginBottom: Default.fixPadding * 0.5,
                  }}
                >
                  {tr('time')}
                </Text>
              </View>
              <Text style={Fonts.Grey14Medium}>{moment(createdAt).format('h:mm A')}</Text>
            </View>
          </View>
          <DashedLine
            dashLength={5}
            dashColor={Colors.extraLightGrey}
            style={{ marginTop: Default.fixPadding, marginHorizontal: Default.fixPadding }}
          />
          <View style={[Style.contentContainer, { flexDirection: 'column', marginHorizontal: Default.fixPadding }]}>
            <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
              <Text style={[Style.tableHeaderText14Medium, { flex: 2, marginLeft: 0 }]}>{tr('servicename')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('price')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('additional')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0, textAlign: 'right' }]}>
                {tr('total')}
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: Default.fixPadding }}>
            {services.map((item) => (
              <ServiceRow key={item.id} item={item} show={true} />
            ))}
          </View>

          <View
            style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 2 }]}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: Default.fixPadding * 2,
              paddingTop: Default.fixPadding * 2,
              paddingBottom: Default.fixPadding * 4,
            }}
          >
            <View style={[{ flex: 4 }]}></View>
            <View style={[{ flex: 5, flexDirection: 'column' }]}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
                  <Text style={[Fonts.Primary14Medium]}>Subtotal:</Text>
                </View>
                <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
                  <Text style={[Fonts.Black14Medium]}>{formatPrice(subtotal * 100)}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
                  <Text style={[Fonts.Primary14Medium]}>Additional:</Text>
                </View>
                <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
                  <Text style={[Fonts.Black14Medium]}>{formatPrice(additional * 100)}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
                  <Text style={[Fonts.Primary14Medium]}>Total:</Text>
                </View>
                <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
                  <Text style={[Fonts.Black14Medium]}>{formatPrice(total * 100)}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({});
