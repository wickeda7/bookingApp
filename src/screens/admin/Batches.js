import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors, Default, Fonts, calendarTheme } from '@constants/style';
import Style from '@theme/style';
import MyStatusBar from '@components/myStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@components/loader';
import Accordion from '@components/Accordion';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Calendar } from 'react-native-calendars';
import { getInvoicesByDate } from '@redux/actions/batchesAction';
import BatchesLeft from '@components/admin/BatchesLeft';
import { getSettings } from '@redux/actions/adminHomeAction';
import { setServiceItems } from '@redux/slices/batchesSlice';
const Batches = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`batchesScreen:${key}`);
  }
  const { height, width } = Dimensions.get('window');
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { isLoading, batches } = useSelector((state) => state.batches);
  const { storeSettings } = useSelector((state) => state.adminHome);
  const today = moment().format('YYYY-MM-DD');
  const [calendar, setCalendar] = useState(false);
  const [selected, setSelected] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const refRBSheet = useRef();

  const storeId = userData.storeAdmin.id;
  useEffect(() => {
    if (!refRBSheet.current) return;
    if (calendar) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [calendar]);

  useEffect(() => {
    dispatch(getSettings({ storeId }));
  }, []);

  useEffect(() => {
    if (!storeSettings.services) return;
    let serviceItems = [];

    storeSettings.services.forEach((service) => {
      if (service.items.length > 0) {
        serviceItems = [...serviceItems, ...service.items];
      } else {
        service.sub_services.forEach((subService) => {
          serviceItems = [...serviceItems, ...subService.items];
        });
      }
    });
    dispatch(setServiceItems(serviceItems));
  }, [storeSettings]);

  useEffect(() => {
    if (selected) refRBSheet.current.close();
    if (!selected) {
      setDisplayDate(moment().format('dddd, MMMM Do YYYY'));
    } else {
      setDisplayDate(moment(selected).format('dddd, MMMM Do YYYY'));
    }
    const date = selected ? selected : today;
    dispatch(getInvoicesByDate({ storeId, date }));
  }, [selected]);

  return (
    <KeyboardAvoidingView style={Style.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Loader visible={isLoading} />
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={Style.navBackButton}>
            <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text style={Fonts.White16Bold}>Batches & Reports v1.1</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row-reverse', paddingHorizontal: 20 }}>
          <View style={{ width: 220, alignItems: 'flex-end', paddingTop: 3 }}>
            <TouchableOpacity
              onPress={() => setCalendar((prev) => !prev)}
              style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 1, padding: 5, borderRadius: 5 }}
            >
              <Text style={[Fonts.White16Medium, { marginRight: 10 }]}>{displayDate}</Text>
              <Ionicons name='caret-down' size={15} color={Colors.white} style={{ marginTop: 3 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[Style.contentContainer, { flexDirection: 'row', alignItems: 'flex-start' }]}>
        <View style={{ flex: 1, width: 650 }}>{batches && <BatchesLeft data={batches} />}</View>
        <View style={[styles.borderLeft, { flex: 1 }]}>
          <ScrollView contentInsetAdjustmentBehavior='automatic'>
            <View style={{ paddingBottom: 100 }}>{batches && <Accordion data={batches} type={'batches'} />}</View>
          </ScrollView>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={400}
        openDuration={100}
        onClose={() => setCalendar(false)}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: Colors.white,
          },
        }}
      >
        <View style={{ paddingHorizontal: 60 }}>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'red' },
            }}
            theme={calendarTheme}
            enableSwipeMonths={true}
          />
        </View>
      </RBSheet>
    </KeyboardAvoidingView>
  );
};

export default Batches;

const styles = StyleSheet.create({
  borderLeft: {
    borderLeftColor: Colors.bord,
    borderLeftWidth: 1,
    marginLeft: Default.fixPadding * 2,
    paddingLeft: Default.fixPadding * 1.5,
  },
});
