import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import Accordion from '@components/Accordion';

const StoreServices = ({ setStoreInfo, storeInfo }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }
  console.log('storeSettings', storeInfo);

  const handleServiceCategory = () => {};
  if (!storeInfo) return null;
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
        },
      ]}
    >
      <View style={[{ flexDirection: 'row' }]}>
        <Text style={Fonts.Black14Medium}>{tr('service')}</Text>
        <TouchableOpacity
          onPress={() => handleServiceCategory()}
          style={[
            Style.buttonStyle,
            Style.borderlightPrimary,
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
          <Ionicons name={'reorder-four-outline'} size={15} color={Colors.primary} />
          <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.primary }]}>
            {tr('addServiceCat')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        {storeInfo.services && <Accordion data={storeInfo.services} type={'service'} />}
      </ScrollView>
    </View>
  );
};

export default StoreServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Default.fixPadding,
  },
});
