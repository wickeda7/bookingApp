import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import moment from 'moment';
import Style from '@theme/style';
import { formatPrice } from '@utils/helper';
const AccordionBody = ({ data, navigation }) => {
  const Body = ({ item }) => {
    const { services, additional, total, type, createdAt, id } = item;
    const more = services.length > 1 ? ', more...' : '';
    const color = type === 'walkin' ? Colors.success : Colors.info;
    const itemPressed = useCallback(() => {
      navigation.navigate('ReportsStack', {
        screen: 'InvoiceDetail',
        params: { data: item },
      });
    }, []);
    return (
      <TouchableOpacity onPress={itemPressed}>
        <View style={[styles.accordBody]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[{ color: color }]}>{moment(createdAt).format(' h:mm A')}</Text>
            <Text style={[{ color: color, fontSize: 12 }]}>{`${services[0].name}${more}`}</Text>
            <Text style={[{ color: color, fontSize: 12 }]}>
              Tip:{formatPrice(additional * 100)} {'  '} Total:{formatPrice(total * 100)}
            </Text>
          </View>
          <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 5 }]}></View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: Default.fixPadding }}>
      {data.map((item, index) => {
        return <Body key={index} item={item} />;
      })}
    </ScrollView>
  );
};

export default AccordionBody;

const styles = StyleSheet.create({
  accordBody: {
    padding: 10,
  },
});
