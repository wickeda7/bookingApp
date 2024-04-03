import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@utils/helper';
import AccordionStoreBody from './AccordionStoreBody';
import { updateService } from '@redux/actions/adminHomeAction';
import { useDispatch } from 'react-redux';
import { useAdminContext } from '@contexts/AdminContext';

const AccordionStoreSubServicesItem = ({ children, item, expanded, onHeaderPress, serviceId }) => {
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const { storeServices, setStoreServices, setSubCategoryId } = useAdminContext();
  const [catEdit, setCatEdit] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const preName = item.name;

  useEffect(() => {
    setCatEdit(item.id === 'new');
    setName(item.name);
  }, [item]);
  useEffect(() => {
    if (expanded) {
      setCatEdit(false);
    }
  }, [expanded]);
  useEffect(() => {
    if (catEdit) return;
    if (preName !== name && name !== '' && name !== ' ') {
      const catId = item.service ? item.service : serviceId;
      const data = { name, service: item.service };
      dispatch(updateService({ ids: { serviceId: catId, subServiceId: item.id }, data, type: 'subService' }));
    }
  }, [catEdit]);

  const handleCatEdit = () => {
    setCatEdit(!catEdit);
  };
  const handleRemoveCat = () => {
    let services = [...storeServices];
    const catId = item.service ? item.service : serviceId;
    const id = item.id;
    if (id !== 'new') {
      dispatch(
        updateService({ ids: { serviceId: catId, subServiceId: id }, data: { delete: true }, type: 'subService' })
      );
    } else {
      let service = services.find((ser) => ser.id === catId);
      let subs = [...service.sub_services];
      subs = subs.filter((sub) => sub.id !== id);
      service = { ...service, sub_services: subs };
      setStoreServices(storeServices.map((i) => (i.id === catId ? service : i)));
    }
  };
  return (
    <View style={[styles.section]}>
      <TouchableOpacity
        style={[styles.accordHeader]}
        onPress={() => {
          onHeaderPress();
          if (expanded) {
            setSubCategoryId(null);
          } else {
            if (item.id !== 'new') {
              setSubCategoryId(item.id);
            }
          }
        }}
      >
        <View style={[{ flex: 4, flexDirection: 'row', alignItems: 'center' }]}>
          {catEdit ? (
            <>
              <TextInput
                style={[Style.inputStyle, { height: 25, padding: 5, marginRight: 0, width: '85%' }]}
                onChangeText={(text) => setName(text)}
                selectionColor={Colors.primary}
                value={name}
              />
              <TouchableOpacity
                style={[
                  Style.buttonStyle,
                  Style.borderGreen,
                  {
                    paddingVertical: 0,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 22,
                    height: 22,
                    marginHorizontal: 15,
                    borderRadius: 5,
                  },
                ]}
                onPress={handleCatEdit}
              >
                <Icon name={'check-square-o'} size={14} color={Colors.success} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  Style.buttonStyle,
                  Style.borderRed,
                  {
                    paddingVertical: 0,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 22,
                    height: 22,
                    marginHorizontal: 5,
                    borderRadius: 5,
                  },
                ]}
                onPress={handleRemoveCat}
              >
                <Icon name={'remove'} size={14} color={Colors.red} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[Fonts.Info14Medium]}>{item.name}</Text>
              {!expanded && (
                <TouchableOpacity
                  style={[
                    Style.buttonStyle,
                    Style.borderOrange,
                    {
                      paddingVertical: 0,
                      marginTop: 0,
                      flexDirection: 'row',
                      width: 22,
                      height: 22,
                      marginHorizontal: 15,
                      borderRadius: 5,
                    },
                  ]}
                  onPress={handleCatEdit}
                >
                  <Icon name={'edit'} size={14} color={Colors.orange} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={Colors.info} />
        </View>
      </TouchableOpacity>
      {expanded && <AccordionStoreBody data={item} catId={item.id} serviceId={serviceId} />}
    </View>
  );
};

export default AccordionStoreSubServicesItem;

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.info,
  },
  accordHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  accordTitle: {
    fontSize: 12,
  },
});
