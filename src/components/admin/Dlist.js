import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcons from 'react-native-vector-icons/MaterialIcons';

import { useSelector, useDispatch } from 'react-redux';
import { setStaff } from '@redux/slices/adminHomeSlice';
import { timeCard } from '@redux/actions/adminHomeAction';
import { Default, Colors } from '@constants/style';
import Style from '@theme/style';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { appointmentTime } from '@utils/helper';
import moment from 'moment';

const Dlist = ({ staffAvailable }) => {
  const [data, setData] = useState([]);
  const { appointment } = useSelector((state) => state.adminHome);

  const dispatch = useDispatch();
  useEffect(() => {
    setData(staffAvailable);
  }, [staffAvailable]);

  const updateData = (data) => {
    setData(data);
    dispatch(setStaff(data));
  };
  const renderItem = ({ item, drag, isActive }) => {
    const userId = item.id;
    const storeId = item.storeEmployee.id;
    const timeCardId = item.timeCardId;

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

    const handlePunchClock = () => {
      const date = moment().format('YYYY-MM-DD');
      const hour = moment().format('HH:mm:ss.SSS');
      const postData = { userId, storeId, date };
      let user = { ...item };
      if (!user.in) {
        postData.in = hour;
      } else {
        postData.out = hour;
        postData.timeCardId = timeCardId;
      }
      dispatch(timeCard({ data: postData }));
    };
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
            <TouchableOpacity onPress={() => handlePunchClock()} style={{ flexDirection: 'row' }}>
              <MatIcons name='punch-clock' size={18} color={color} />
              {item.in && <Text style={[Style.inText]}>IN: {moment(item.in, 'HH:mm:ss.SSS').format('h:mm A')}</Text>}
              {item.out && (
                <Text style={[Style.outText]}>OUT: {moment(item.out, 'HH:mm:ss.SSS').format('h:mm a')}</Text>
              )}
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
