import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import StoreServiceItem from './StoreServiceItem';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Accordion from '@components/Accordion';
import { useAdminContext } from '@contexts/AdminContext';
const AccordionStoreBody = ({ catId, serviceId }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }
  const { storeServices, setStoreServices } = useAdminContext();
  let service = {};
  if (serviceId) {
    const sub = storeServices.find((item) => item.id === serviceId);
    service = sub.sub_services.find((item) => item.id === catId);
  } else {
    service = storeServices.find((item) => item.id === catId);
  }
  const [itemData, setItemData] = useState(service?.items ? service.items : []);
  const [subservices, setSubservices] = useState(service?.sub_services ? service.sub_services : []);
  useEffect(() => {
    if (!service?.sub_services) return;
    setSubservices(service.sub_services);
  }, [service]);

  const handleServiceCategory = () => {
    let subs = [...subservices];
    subs = [{ name: '', id: 'new', service: catId }, ...subs];
    service = { ...service, sub_services: subs };
    setStoreServices(storeServices.map((item) => (item.id === catId ? service : item)));
  };
  return (
    <>
      <View style={[Style.divider, { marginVertical: Default.fixPadding }]} />
      {!serviceId && (
        <>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => handleServiceCategory()}
              style={[
                Style.buttonStyle,
                Style.borderInfo,
                {
                  paddingVertical: 0,
                  marginTop: 0,
                  flexDirection: 'row',
                  width: 190,
                  height: 20,
                  marginHorizontal: 10,
                },
              ]}
            >
              <Ionicons name={'reorder-three-outline'} size={15} color={Colors.info} />
              <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.info }]}>
                {tr('addServiceSubCat')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleServiceCategory()}
              style={[
                Style.buttonStyle,
                Style.borderBlack,
                {
                  paddingVertical: 0,
                  marginTop: 0,
                  flexDirection: 'row',
                  width: 140,
                  height: 20,
                  marginHorizontal: 10,
                },
              ]}
            >
              <Ionicons name={'list-outline'} size={15} color={Colors.black} />
              <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.black }]}>
                {tr('addService')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {subservices.length > 0 && (
        <View style={{ marginTop: Default.fixPadding }}>
          <Accordion data={subservices} type={'subService'} serviceId={catId} />
        </View>
      )}
      {itemData.length > 0 && (
        <>
          <View style={[{ flexDirection: 'column' }]}>
            <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
              <Text style={[Style.tableHeaderText14Medium, { flex: 3, marginLeft: 0 }]}>{tr('name')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('price')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('option')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 0.5, marginLeft: 0 }]}> {tr('Enable')}</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {itemData.map((item, index) => (
              <StoreServiceItem key={index} item={item} catId={catId} />
            ))}
          </ScrollView>
          <View style={[{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 15 }]}>
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
                },
              ]}
            >
              <AntIcon size={18} name='upload' color={Colors.white} />
              <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>{tr('submit')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default AccordionStoreBody;

const styles = StyleSheet.create({});
