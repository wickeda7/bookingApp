import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Style from '@theme/style';
import Cell from '@components/table/Cell';
import NameCell from '@components/table/NameCell';
const Row = ({ data, keys, type }) => {
  return (
    <View style={Style.tableRow}>
      {keys.map((key, index) => {
        if (key.headerName === 'name') {
          return <NameCell key={index} data={data} header={key.dataKey} size={key.size} />;
        }
        return <Cell key={index} data={data} type={type} header={key} />;
      })}

      {/* <View style={{ flex: 1 }}>
        <Text>Row </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Row </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Row </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Row </Text>
      </View> */}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({});
