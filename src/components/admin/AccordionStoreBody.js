import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import StoreServiceItem from './StoreServiceItem';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Accordion from '@components/Accordion';
const AccordionStoreBody = ({ data, catId, sub }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }
  const items = data.items;
  const sub_services = data?.sub_services ? data.sub_services : [];
  console.log('AccordionStoreBody catId', catId);
  console.log('AccordionStoreBody items', items);
  console.log('AccordionStoreBody sub_services', sub_services);
  return (
    <>
      <View style={[Style.divider, { marginVertical: Default.fixPadding }]} />
      {!sub && (
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

      {sub_services.length > 0 && (
        <View style={{ marginTop: Default.fixPadding }}>
          <Accordion data={sub_services} type={'subService'} />
        </View>
      )}
      {items.length > 0 && (
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
            {items.map((item, index) => (
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
