import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Default, Fonts } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SettingsEmployeeRow from './SettingsEmployeeRow';

const SettingsEmplyee = () => {
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`settings:${key}`);
  }
  const { isLoading, storeSettings } = useSelector((state) => state.adminHome);
  const dispatch = useDispatch();
  const employees = storeSettings?.employee;
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          paddingLeft: 10,
        },
      ]}
    >
      <View style={[{ flexDirection: 'row' }]}>
        <Text style={Fonts.Black14Medium}>{tr('staff')}</Text>
      </View>
      <View style={[{ flexDirection: 'column' }]}>
        <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
          <Text style={[Style.tableHeaderText14Medium, { flex: 2, marginLeft: 0 }]}>{tr('name')}</Text>
          <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('commission')}</Text>
          <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}>{tr('tips')}</Text>
          <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}> {tr('salary')}</Text>
          <Text style={[Style.tableHeaderText14Medium, { flex: 1, marginLeft: 0 }]}> </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {employees && employees.map((item, index) => <SettingsEmployeeRow key={index} data={item} />)}
      </ScrollView>
    </View>
  );
};

export default SettingsEmplyee;

const styles = StyleSheet.create({});
