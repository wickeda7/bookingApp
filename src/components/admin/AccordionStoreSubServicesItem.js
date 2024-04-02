import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@utils/helper';
import AccordionStoreBody from './AccordionStoreBody';
const AccordionStoreSubServicesItem = ({ children, item, expanded, onHeaderPress }) => {
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  console.log('AccordionStoreSubServicesItem item', item);
  const [catEdit, setCatEdit] = useState(false);
  const [name, setName] = useState(item.name);

  useEffect(() => {
    if (expanded) {
      setCatEdit(false);
    }
  }, [expanded]);
  useEffect(() => {
    console.log('catEdit', catEdit);
  }, [catEdit]);
  const handleCatEdit = () => {
    setCatEdit(!catEdit);
  };
  return (
    <View style={[styles.section]}>
      <TouchableOpacity style={[styles.accordHeader]} onPress={onHeaderPress}>
        <View style={[{ flex: 4, flexDirection: 'row', alignItems: 'center' }]}>
          {catEdit ? (
            <>
              <TextInput
                style={[Style.inputStyle, { height: 25, padding: 5, marginRight: 0, width: '90%' }]}
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
            </>
          ) : (
            <>
              <Text style={[Fonts.Info14Medium]}>{item.name}</Text>
              {!expanded && (
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
                      marginHorizontal: 15,
                      borderRadius: 5,
                    },
                  ]}
                  onPress={handleCatEdit}
                >
                  <Icon name={'edit'} size={14} color={Colors.red} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={Colors.info} />
        </View>
      </TouchableOpacity>
      {expanded && <AccordionStoreBody data={item} catId={item.id} sub={true} />}
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
