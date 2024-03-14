import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Style from '@theme/style';
import { Default, Fonts, Colors } from '@constants/style';
import ServiceRow from './ServiceRow';
import { useTranslation } from 'react-i18next';
import { setStaffService, updatePrice } from '@redux/slices/adminHomeSlice';
import { useDispatch } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { use } from 'i18next';
const ServicesTable = ({ services }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }
  const dispatch = useDispatch();
  const setService = (service, type, staff) => {
    if (type === 'service') {
      dispatch(setStaffService({ type, service, staff }));
    } else {
      dispatch(setStaffService({ type, service }));
    }
  };
  const handleSubmit = () => {};
  const handleDelete = () => {};
  const handleTextChange = (text, item, field) => {
    if (field === 'additional') {
      dispatch(updatePrice({ text, item }));
    }

    // console.log(text);
    // console.log(item, field);
  };

  const status = services.find((obj) => obj.status === 'working');
  return (
    <>
      <View style={[Style.divider, { marginHorizontal: Default.fixPadding }]} />
      <View style={[Style.contentContainer, { flexDirection: 'column' }]}>
        <View style={[Style.tableHeader, { flexDirection: 'row', flex: 1 }]}>
          <Text style={[Style.tableHeaderText15Medium, { flex: 2, marginLeft: 0 }]}>{tr('staff')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 4, marginLeft: 0 }]}>{tr('servicename')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>{tr('price')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}> {tr('additional')}</Text>
          <Text style={[Style.tableHeaderText15Medium, { flex: 1, marginLeft: 0 }]}>{tr('total')}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {services.map((service, index) => (
          <ServiceRow key={index} item={service} setService={setService} handleTextChange={handleTextChange} />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: Default.fixPadding * 2,
          paddingTop: Default.fixPadding * 2,
          paddingBottom: Default.fixPadding * 4,
        }}
      >
        <View style={[{ flex: 5 }]}></View>
        <View style={[{ flex: 4, flexDirection: 'column' }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary16Medium]}>Subtotal:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text>$20.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary16Medium]}>Additional:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text>$20.00</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'flex-end' }]}>
              <Text style={[Fonts.Primary16Medium]}>Total:</Text>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding }]}>
              <Text>$20.00</Text>
            </View>
          </View>
          <View
            style={[Style.divider, { marginHorizontal: Default.fixPadding, marginVertical: Default.fixPadding * 1.5 }]}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={[{ flex: 5, padding: Default.fixPadding, alignItems: 'center' }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  handleDelete();
                }}
                style={[
                  Style.buttonStyle,
                  {
                    backgroundColor: Colors.red,
                    marginTop: 0,
                    flexDirection: 'row',
                    width: 110,
                    opacity: status ? 0.4 : 1,
                  },
                ]}
              >
                <AntIcon size={18} name='delete' color={Colors.white} />
                <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>{tr('delete')}</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ flex: 3, paddingVertical: Default.fixPadding, alignItems: 'center' }]}>
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
                    opacity: status ? 1 : 0.4,
                  },
                ]}
              >
                <AntIcon size={18} name='upload' color={Colors.white} />
                <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5 }, Fonts.White14Bold]}>{tr('submit')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ServicesTable;

const styles = StyleSheet.create({});
