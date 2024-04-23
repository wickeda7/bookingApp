import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Style from '@theme/style';
import Cell from '@components/table/Cell';
import NameCell from '@components/table/NameCell';
const Row = ({ data, keys, type }) => {
  return (
    <View style={[Style.tableRow, data.selected && Style.tableRowSelected]}>
      {keys.map((key, index) => {
        if (key.headerName === 'name') {
          return <NameCell key={index} data={data} header={key.dataKey} size={key.size} />;
        }
        return <Cell key={index} data={data} type={type} header={key} />;
      })}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({});
