import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { Default, Colors } from '@constants/style';
import Style from '@theme/style';
import { DraxProvider, DraxView, DraxViewDragStatus, DraxSnapbackTargetPreset } from 'react-native-drax';
import { appointmentTime } from '@utils/helper';
import moment from 'moment';
const StaffRow = ({ item, busy }) => {
  const { appointment } = useSelector((state) => state.adminHome);
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
  if (!item) return null;
  const { userInfo } = item;
  const color = userInfo.displayColor ? userInfo.displayColor : '#000';

  const RowItem = () => {
    const bColor = busy ? Colors.disable : color;
    const bgColor = busy ? Colors.bord : Colors.white;
    return (
      <View style={[styles.row, { borderColor: bColor, backgroundColor: bgColor }]}>
        <View style={{ flex: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <AntIcon size={15} name='menu-fold' color={color} />
            <Text style={[{ marginHorizontal: Default.fixPadding, color: color, fontSize: 14 }]}>
              {userInfo.firstName} {userInfo.lastName} {item.id}
            </Text>
          </View>
          {appNum.length > 0 && (
            <View style={[styles.appNumContainer, { position: 'relative', flexDirection: 'row' }]}>
              <Text style={[styles.time, { color: color }]}>{time}</Text>
              <Ionicons name='notifications-outline' size={20} color={color} />
              <View style={styles.dot}>
                <Text style={styles.dotText}>{appNum.length}</Text>
              </View>
            </View>
          )}
          <View style={{ flexDirection: 'row' }}>
            <MatIcons name='punch-clock' size={18} color={color} />
            {item.in && <Text style={[Style.inText]}>IN: {moment(item.in, 'HH:mm:ss.SSS').format('h:mm A')}</Text>}
            {item.out && <Text style={[Style.outText]}>OUT: {moment(item.out, 'HH:mm:ss.SSS').format('h:mm a')}</Text>}
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      {!busy ? (
        <DraxView
          style={[styles.centeredContent]}
          draggingStyle={styles.dragging}
          dragReleasedStyle={styles.dragging}
          hoverDraggingStyle={styles.hoverDragging}
          dragPayload={item}
          onDragEnd={(event) => {
            return DraxSnapbackTargetPreset.None;
          }}
          // onDragStart={(event) => {
          //   console.log('onDragStart event', event);
          // }}
          // onDragEnter={(event) => {
          //   console.log('onDragEnter when this view is dragged into a receiver', event);
          // }}
          // onDragOver={(event) => {
          //   console.log('onDragOver while this view is being dragged over a receiver', event);
          // }}
        >
          <RowItem />
        </DraxView>
      ) : (
        <RowItem />
      )}
    </>
  );
};

export default StaffRow;

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  appNumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 10,
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
