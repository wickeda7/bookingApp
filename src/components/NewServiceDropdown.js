import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { useAdminContext } from '@contexts/AdminContext';
const NewServiceDropdown = () => {
  const { serviceItems } = useSelector((state) => state.batches);
  const [services, setServices] = useState(null);
  const { setNewService } = useAdminContext();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (serviceItems) {
      const temp = serviceItems.map((item) => {
        return { ...item, label: item.name, value: item.id };
      });
      setServices(temp);
    }
  }, [serviceItems]);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  if (!services) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={services}
        search
        maxHeight={300}
        labelField='label'
        valueField='value'
        placeholder={!isFocus ? 'Select Service' : '...'}
        searchPlaceholder='Search...'
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setNewService(item);
          setIsFocus(false);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default NewServiceDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '85%',
  },
  dropdown: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },

  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },

  inputSearchStyle: {
    height: 35,
    fontSize: 14,
  },
});
