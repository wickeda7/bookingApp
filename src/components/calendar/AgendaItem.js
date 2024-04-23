import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Button } from 'react-native';
import moment from 'moment';
import { formatPrice } from '@utils/helper';
const AgendaItem = (props) => {
  const { item } = props;
  const { createdAt, total, services } = item;
  const more = services.length > 1 ? ', more...' : '';
  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    props.navigation.navigate('ReportsStack', {
      screen: 'InvoiceDetail',
      params: { data: item },
    });
  }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      {/* <TouchableOpacity onPress={itemPressed} style={styles.item} testID={testIDs.agenda.ITEM}></TouchableOpacity> */}
      <View>
        <Text style={styles.itemHourText}>{moment(createdAt).format(' h:mm A')}</Text>
        <Text style={styles.itemDurationText}>Total: {formatPrice(total * 100)}</Text>
      </View>
      <Text style={styles.itemTitleText}>{`${services[0].name}${more}`}</Text>
      {/* <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
      </View> */}
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 0,
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});
