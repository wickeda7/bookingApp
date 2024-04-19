import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Default } from '@constants/style';
import Style from '@theme/style';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import { calendarTheme } from '@constants/style';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';
import { useAuthContext } from '@contexts/AuthContext';
import AgendaItem from '@components/calendar/AgendaItem';
import { formatPrice } from '@utils/helper';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceByDate } from '@redux/actions/staffAction';
import Loader from '@components/loader';
const Weekly = (props) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`incomeScreen:${key}`);
  }
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const { invoiceByDate, weeklyTips, weeklyTotal, isLoading } = useSelector((state) => state.staff);
  const monday = moment().day(1).format('YYYY-MM-DD');
  const nextMonday = moment(monday).add(7, 'days').format('YYYY-MM-DD');
  const userId = userData?.id;
  const storeId = userData?.storeEmployee?.id;

  useEffect(() => {
    dispatch(getInvoiceByDate({ from: monday, to: nextMonday, userId, storeId }));
  }, []);

  const date = invoiceByDate.length > 0 ? invoiceByDate[0].title : moment().format('YYYY-MM-DD');
  const getMarkedDates = () => {
    const marked = {};

    if (isLoading) return;

    invoiceByDate.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0) {
        marked[item.title] = { marked: true, selected: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  };

  const marked = useRef(getMarkedDates());
  const onDateChanged = (date, source) => {
    const currentDate = moment(date).day();
    if (currentDate === 1) {
      // if selected date is Monday
      const fromDate = date;
      const toDate = moment(date).add(7, 'days').toDate().toISOString().split('T')[0];
      dispatch(getInvoiceByDate({ from: fromDate, to: toDate, userId, storeId }));
    }
  };
  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} navigation={props.navigation} />;
  }, []);

  const sectionHeader = useCallback(
    (item) => {
      const temp = invoiceByDate.find((x) => x.title === item);
      const tips = temp?.tips;
      const total = temp?.total;
      return (
        <View
          style={[
            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
            styles.section,
          ]}
        >
          <Text style={{ color: Colors.primary, textTransform: 'capitalize' }}>
            {moment(item).format('dddd MMM Do')}
          </Text>
          <Text style={{ color: Colors.primary, textTransform: 'capitalize', fontSize: 12 }}>
            Tips:{formatPrice(tips)}
            {'        '}Total:{formatPrice(total)}
          </Text>
        </View>
      );
    },
    [invoiceByDate]
  );
  if (isLoading) {
    return <Loader visible={true} />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View style={[Style.primaryNav, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity style={Style.navBackButton} onPress={() => props.navigation.navigate('reports')}>
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={22} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>Report</Text>
        <View style={[{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }]}>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}></View>
          <View style={[{ marginRight: Default.fixPadding * 1.5 }]}>
            <Text style={[Fonts.white14SemiBold]}>Tips: {formatPrice(weeklyTips)}</Text>
          </View>
          <View style={[{ marginRight: Default.fixPadding }]}>
            <Text style={[Fonts.white14SemiBold]}>Total: {formatPrice(weeklyTotal)}</Text>
          </View>
        </View>
      </View>
      <CalendarProvider onDateChanged={onDateChanged} showTodayButton date={date}>
        <ExpandableCalendar firstDay={1} markedDates={marked.current} theme={calendarTheme} />
        <AgendaList
          sections={invoiceByDate}
          renderItem={renderItem}
          sectionStyle={styles.section}
          renderSectionHeader={sectionHeader}
        />
      </CalendarProvider>
    </View>
  );
};

export default Weekly;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    backgroundColor: Colors.lightPrimary,
    color: Colors.primary,
    textTransform: 'capitalize',
  },
});
