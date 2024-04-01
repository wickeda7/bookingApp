import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { storeHours } from '@constants/settings';

const StoreHours = ({ setStoreInfo, storeInfo }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`settings:${key}`);
  }

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [hoursArr, setHoursArr] = useState([]);
  const [date, setDate] = useState(new Date());
  const [newHour, setNewHour] = useState(null);

  useEffect(() => {
    if (Object.keys(storeInfo).length === 0) return;
    const hours = storeInfo?.hours ? storeInfo.hours : storeHours;
    setHoursArr(hours);
  }, [storeInfo]);

  const handleDateChange = (date) => {
    setDate(date);
    const hour = moment(date).format('h:mm A');
    let time = '';
    if (newHour) {
      time = newHour + ' - ' + hour;
      setNewHour(null);
    } else {
      time = hour + ' - ???';
      setNewHour(hour);
    }
    const newHours = hoursArr.map((item) => {
      if (item.selected) {
        return { ...item, hours: time, selected: newHour ? false : true };
      }
      return item;
    });
    setHoursArr(newHours);
    setStoreInfo({ ...storeInfo, hours: newHours });
  };

  const handleStoreHours = (item) => {
    let hours = [...hoursArr];
    hours = hours.map((hour) => {
      if (hour.day === item.day) {
        return { ...hour, selected: !hour.selected };
      }
      return hour;
    });
    setHoursArr(hours);
  };

  const handleSetHours = (close) => {
    const selectedDays = hoursArr.filter((item) => item.selected);
    if (selectedDays.length === 0) {
      setError(true);
      return;
    }
    if (close) {
      const newHours = hoursArr.map((item) => {
        if (item.selected) {
          return { ...item, hours: 'Closed', selected: false };
        }
        return item;
      });
      setHoursArr(newHours);
      setStoreInfo({ ...storeInfo, hours: newHours });
      return;
    }
    setOpen(true);
  };
  const RenderHours = ({ item, handleStoreHours, setError }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(item?.selected ? true : false);
    const handleCheckBox = () => {
      setToggleCheckBox(!toggleCheckBox);
      handleStoreHours(item);
      setError(false);
    };
    return (
      <View style={[{ flex: 1 }]}>
        <View style={[{ flexDirection: 'row' }]}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={handleCheckBox}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
          <Text style={{ fontWeight: '600', paddingTop: 5, fontSize: 13 }}>{item.day}</Text>
        </View>
        <Text style={{ fontSize: 12 }}>{item.hours}</Text>
      </View>
    );
  };
  return (
    <>
      <View style={[{ flexDirection: 'row' }]}>
        <Text style={Fonts.Black14Medium}>{tr('storeHours')}</Text>
        <TouchableOpacity
          onPress={() => handleSetHours()}
          style={[
            Style.buttonStyle,
            Style.borderInfo,
            {
              paddingVertical: 0,
              marginTop: 0,
              flexDirection: 'row',
              width: 100,
              height: 20,
              marginHorizontal: 10,
            },
          ]}
        >
          <Ionicons name={'time-outline'} size={15} color={Colors.info} />
          <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.info }]}>{tr('setHours')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSetHours('close')}
          style={[
            Style.buttonStyle,
            Style.borderRed,
            {
              paddingVertical: 0,
              marginTop: 0,
              flexDirection: 'row',
              width: 110,
              height: 20,
              marginHorizontal: 10,
            },
          ]}
        >
          <Ionicons name={'time-outline'} size={15} color={Colors.red} />
          <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.red }]}>{tr('dayClosed')}</Text>
        </TouchableOpacity>
        {error && <Text style={{ color: Colors.red }}>{tr('hoursError')}</Text>}
      </View>
      <View style={[Style.inputStyle, { flexDirection: 'row', paddingTop: 5, height: 60 }]}>
        {hoursArr.map((item, index) => {
          return <RenderHours item={item} key={index} handleStoreHours={handleStoreHours} setError={setError} />;
        })}
      </View>
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
    </>
  );
};

export default StoreHours;

const styles = StyleSheet.create({});
