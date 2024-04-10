import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Fonts, Default } from '@constants/style';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import RangeCalendar from '@components/calendar/rangeCalendar';
import ListView from '@components/calendar/ListView';
import GraphView from '@components/calendar/GraphView';
import RBSheet from 'react-native-raw-bottom-sheet';
//https://www.youtube.com/watch?v=F6xtNGtDAJE
const Income = (props) => {
  const { route, navigation } = props;
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`incomeScreen:${key}`);
  }
  //const { calendar, setCalendar, graphView, setGraphView } = useWorkersContext();
  const [selectedDate, setSelectedDate] = useState();
  const [calendar, setCalendar] = useState(true);
  const [calendarView, setCalendarView] = useState(true);
  const [graphView, setGraphView] = useState(false);
  const refRBSheet = useRef();
  useEffect(() => {
    if (!refRBSheet.current) return;
    if (calendar) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [calendar]);

  useEffect(() => {
    if (selectedDate) refRBSheet.current.close();
  }, [selectedDate]);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.navigate('reports')}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White16Bold}>By Date Range</Text>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}
        >
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}></View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: calendarView ? Colors.white : Colors.primary,
                  marginRight: Default.fixPadding,
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setCalendarView((prev) => !prev);
                    setCalendar((prev) => !prev);
                    setGraphView((prev) => !prev);
                  }}
                >
                  <Ionicons name={'calendar-outline'} size={22} color={calendarView ? Colors.primary : Colors.white} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: graphView ? Colors.white : Colors.primary,
                  marginRight: Default.fixPadding,
                  borderRadius: 8,
                  padding: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setCalendarView((prev) => !prev);
                    setGraphView((prev) => !prev);
                  }}
                >
                  <Octicons name='graph' size={20} color={graphView ? Colors.primary : Colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </>
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
        <RangeCalendar setSelectedDate={setSelectedDate} />
      </RBSheet>
      {graphView ? (
        <GraphView selectedDate={selectedDate} navigation={navigation} />
      ) : (
        <ListView selectedDate={selectedDate} navigation={navigation} />
      )}
    </View>
  );
};

export default Income;
