import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import StoreServiceItem from './StoreServiceItem';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Accordion from '@components/Accordion';
import { useAdminContext } from '@contexts/AdminContext';
import { updateService } from '@redux/actions/adminHomeAction';
import { useDispatch } from 'react-redux';

const AccordionStoreBody = ({ catId, serviceId }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }
  const { storeServices, setStoreServices, categoryId, subCategoryId } = useAdminContext();
  const dispatch = useDispatch();
  console.log('storeServices!!!!!', storeServices);
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
    setItemData(service?.items ? service.items : []);
    if (!service?.sub_services) return;
    setSubservices(service.sub_services);
  }, [service]);

  const handleServiceCategory = () => {
    let subs = [...subservices];
    subs = [{ name: '', id: 'new', service: catId }, ...subs];
    service = { ...service, sub_services: subs };
    setStoreServices(storeServices.map((item) => (item.id === catId ? service : item)));
  };
  const handleAddService = () => {
    console.log('add service', categoryId, subCategoryId);
    const uid = uuid.v4();

    let services = [...storeServices];
    let categoryIndex = services.findIndex((item) => item.id === categoryId);
    let category = { ...services[categoryIndex] };
    let subCategory = [];
    let itemsArr = [];
    console.log('add category', category);
    const newService = { description: '', name: '', price: 0, priceOption: '', enable: true, id: uid };

    if (subCategoryId) {
      newService.sub_service = subCategoryId;
      let catSubSerives = [...category.sub_services];
      console.log('add catSubSerives', catSubSerives);
      let subCategoryIndex = catSubSerives.findIndex((item) => item.id === subCategoryId);
      subCategory = { ...catSubSerives[subCategoryIndex] };

      itemsArr = [...subCategory.items];
      itemsArr = [newService, ...itemsArr];
      subCategory = { ...subCategory, items: itemsArr };
      catSubSerives[subCategoryIndex] = subCategory;
      category.sub_services = catSubSerives;
      console.log('category', category);
      console.log('add category.sub_services[subCategoryIndex]', catSubSerives);
      services[categoryIndex] = category;
      //setStoreServices(services);
    } else {
      newService.service = categoryId;
      itemsArr = category?.items ? category.items : [];
      itemsArr = [newService, ...itemsArr];
      category = { ...category, items: itemsArr };
      services[categoryIndex] = category;
    }
    setStoreServices(services);
    console.log('add categoryId', categoryId, catId);
    console.log('add subCategoryId', subCategoryId, serviceId);
    console.log('add service', categoryId, subCategoryId, newService, storeServices, services);
  };

  const handleSubmit = () => {
    let services = [...storeServices];
    let categoryIndex = services.findIndex((item) => item.id === categoryId);
    let category = { ...services[categoryIndex] };
    let itemsArr = [];
    if (subCategoryId) {
    } else {
      itemsArr = category.items;
      console.log('handleSubmit', itemsArr);
      dispatch(
        updateService({ ids: { serviceId: categoryId, subServiceId: subCategoryId }, data: itemsArr, type: 'items' })
      );
      // itemsArr = itemsArr.map((i) => (i.id === data.id ? data : i));
      // category = { ...category, items: itemsArr };
      // services = services.map((i) => (i.id === categoryId ? category : i));
      // setStoreServices(services);
    }
    console.log('handleSubmit', storeServices, categoryId, subCategoryId);
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
              onPress={() => handleAddService()}
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
              <Text style={[Style.tableHeaderText14Medium, { flex: 4, marginLeft: 0 }]}>{tr('name')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('price')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 0.5, marginLeft: 0 }]}>{tr('save')}</Text>
              <Text style={[Style.tableHeaderText14Medium, { flex: 0.5, marginLeft: 0 }]}> {tr('delete')}</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {itemData.map((item, index) => (
              <StoreServiceItem key={index} item={item} catId={catId} />
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default AccordionStoreBody;

const styles = StyleSheet.create({});
