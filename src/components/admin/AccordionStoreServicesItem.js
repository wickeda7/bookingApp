import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import AccordionStoreBody from './AccordionStoreBody';
import { updateService } from '@redux/actions/adminHomeAction';
import { useDispatch } from 'react-redux';
import { useAdminContext } from '@contexts/AdminContext';
const AccordionStoreServicesItem = ({ children, item, expanded, onHeaderPress }) => {
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const { storeServices, setStoreServices, setCategoryId } = useAdminContext();
  const [catEdit, setCatEdit] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const preName = item.name;

  useEffect(() => {
    setCatEdit(item.store !== undefined);
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
      const data = { name, store: item.store };
      const serviceId = item.store === undefined ? item.id : 'new';

      dispatch(updateService({ ids: { serviceId }, data, type: 'service' }));
    }
  }, [catEdit]);

  const handleCatEdit = () => {
    setCatEdit(!catEdit);
  };
  const handleRemoveCat = () => {
    let services = [...storeServices];
    const index = services.findIndex((ser) => ser.id === item.id);
    if (index > -1) {
      if (item.store) {
        services.splice(index, 1);
        setStoreServices(services);
      } else {
        dispatch(updateService({ ids: { serviceId: item.id }, data: { delete: true }, type: 'service' }));
      }
    }

    //
  };
  return (
    <View style={[styles.section]}>
      <TouchableOpacity
        style={[styles.accordHeader]}
        onPress={() => {
          onHeaderPress();
          if (expanded) {
            setCategoryId(null);
          } else {
            if (item.id !== 'new') {
              setCategoryId(item.id);
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
              <Text style={[Fonts.Primary14Medium]}>{item.name}</Text>
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
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={Colors.primary} />
        </View>
      </TouchableOpacity>
      {expanded && <AccordionStoreBody catId={item.id} />}
    </View>
  );
};

export default AccordionStoreServicesItem;

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.lightPrimary,
  },
  accordHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  accordTitle: {
    fontSize: 12,
  },
});
