import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcons from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import { Default, Colors } from '@constants/style';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { appointmentTime } from '@utils/helper';

const Dlist = ({ staffAvailable }) => {
  const [data, setData] = useState([]);
  const { appointment } = useSelector((state) => state.adminHome);
  useEffect(() => {
    console.log('staffAvailable', staffAvailable);
    setData(staffAvailable);
  }, []);

  const updateData = (data) => {
    console.log('data', data);
    setData(data);
  };
  const renderItem = ({ item, drag, isActive }) => {
    const appNum = appointment.filter((app) => {
      if (app.specialist) return app.specialist.id === item.id;
    });
    let time = '';
    if (appNum.length > 0) {
      const {
        timeslot,
        specialist: {
          userInfo: { hours },
        },
      } = appNum[0];
      time = appointmentTime(hours, timeslot);
    }
    const { userInfo } = item;
    const color = userInfo.displayColor ? userInfo.displayColor : '#000';
    return (
      <ScaleDecorator>
        <View style={[styles.row, { borderColor: color }]}>
          <View style={{ flex: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              size='lg'
              onLongPress={drag}
              disabled={isActive}
              background={isActive ? 'gray300' : 'white'}
              style={[styles.rowItem]}
            >
              <AntIcon size={15} name='menu-fold' color={color} />
              <Text style={[{ marginHorizontal: Default.fixPadding, color: color, fontSize: 14 }]}>
                {userInfo.firstName} {userInfo.lastName} {item.id}
              </Text>
            </TouchableOpacity>
            {appNum.length > 0 && (
              <View style={[styles.appNumContainer, { position: 'relative' }]}>
                <Text style={[styles.time, { color: color }]}>{time}</Text>
                <Ionicons name='notifications-outline' size={20} color={color} />
                <View style={styles.dot}>
                  <Text style={styles.dotText}>{appNum.length}</Text>
                </View>
              </View>
            )}
            <TouchableOpacity onPress={() => console.log('delete')} style={{ flexDirection: 'row' }}>
              <MatIcons name='punch-clock' size={20} color={color} />
              <Text style={{ marginLeft: 5, marginTop: 3 }}>IN: 8:00 AM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <View>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => updateData(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Dlist;

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',

    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  appNumContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  dot: {
    width: 13,
    height: 13,
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    position: 'absolute',
    top: 3,
    left: 20,
    fontSize: 12,
  },
  dotText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
