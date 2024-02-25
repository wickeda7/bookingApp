import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import Style from '@theme/style';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import moment from 'moment';
const HoursList = ({ data, setUserInfo }) => {
  const [hours, setHours] = useState();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`staff:${key}`);
  }
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [newHour, setNewHour] = useState(null);

  useEffect(() => {
    if (!data) return;
    setHours(data);
  }, [data]);

  const handleDeleteTodo = (id) => {
    const newHours = hours.filter((item) => item.id !== id);
    //setHours((prevData) => prevData.filter((item) => item.id !== id));
    setHours(newHours);
    setUserInfo((prevState) => ({ ...prevState, hours: newHours }));
  };

  const updateHours = (data) => {
    setHours(data);
    setUserInfo((prevState) => ({ ...prevState, hours: data }));
  };

  const handleDateChange = (date) => {
    setDate(date);
    const hour = moment(date).format('h:mm A');
    if (newHour) {
      const result = hours.map((a) => Number(a.id));
      const maxID = Math.max(...result);
      const newItem = { id: (maxID + 1).toString(), hours: newHour + ' - ' + hour };
      const newHours = [...hours, newItem];
      setHours(newHours);
      setUserInfo((prevState) => ({ ...prevState, hours: newHours }));
      setNewHour(null);
    } else {
      setNewHour(hour);
    }
  };
  const renderItem = ({ item, drag, isActive }) => {
    // render individual todo items
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[isActive ? Style.tableRowSelected : '', { marginVertical: 3 }]}
        >
          <Text style={{ marginVertical: 3 }}>
            {item.hours}
            <View>
              <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                <Ionicons name='trash' size={15} color={Colors.red} style={{ paddingLeft: 20 }} />
              </TouchableOpacity>
            </View>
          </Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };
  if (!hours) return null;
  return (
    <View style={{ marginTop: Default.fixPadding, flexDirection: 'row' }}>
      <View style={{ flex: 0.7 }}>
        <DraggableFlatList
          data={hours}
          onDragEnd={({ data }) => updateHours(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[
            Style.buttonStyle,
            {
              backgroundColor: Colors.primary,
              width: 110,
            },
          ]}
        >
          <Text style={Fonts.White18Bold}>{tr('addTime')}</Text>
        </TouchableOpacity>
        {newHour && <Text style={[Fonts.Black16Medium, { marginVertical: 20 }]}>From {newHour} to ?</Text>}
        <DatePicker
          modal
          open={open}
          date={date}
          mode='time'
          onDateChange={(date) => {
            handleDateChange(date);
          }}
          onConfirm={(date) => {
            setOpen(false);
            handleDateChange(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default HoursList;

const styles = StyleSheet.create({});
