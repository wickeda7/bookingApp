import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { Default } from '@constants/style';
const StaffRow = ({ item }) => {
  const { appointment } = useSelector((state) => state.adminHome);
  const appNum = appointment.filter((app) => app.specialist.id === item.id);
  const { userInfo } = item;
  const color = userInfo.displayColor ? userInfo.displayColor : '#000';
  return (
    <View style={[styles.row, { borderColor: color }]}>
      <View style={{ flex: 10, flexDirection: 'row' }}>
        <AntIcon size={15} name='menu-fold' color={color} />
        <Text style={[{ marginHorizontal: Default.fixPadding, color: color, fontSize: 14 }]}>
          {userInfo.firstName} {userInfo.lastName}
        </Text>
      </View>
      {appNum.length > 0 && (
        <View style={[styles.appNumContainer, { position: 'relative' }]}>
          <Ionicons name='notifications-outline' size={20} color={color} />
          <View style={styles.dot}>
            <Text style={styles.dotText}>{appNum.length}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default StaffRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  appNumContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  dot: {
    width: 13,
    height: 13,
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
