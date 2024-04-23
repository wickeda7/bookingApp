import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors, Default, Fonts } from '@constants/style';
import Appoinment from '@components/Appoinment';
import InVoice from '@components/Invoice';
import { View, Dimensions, Text } from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const Tab = createMaterialTopTabNavigator();
const CProfileTop = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.white, shadowColor: Colors.white, marginHorizontal: 15, marginTop: 10 },
        tabBarShowLabel: true,
        swipeEnabled: false,
        tabBarIndicatorStyle: { opacity: 0 },
        tabBarPressOpacity: 10,
        tabBarPressColor: Colors.white,
      }}
    >
      <Tab.Screen
        name='Appoinment'
        component={Appoinment}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <View
              style={{
                width: width / 2.5,
                paddingVertical: 12,
                backgroundColor: focused ? Colors.primary : Colors.white,
                borderColor: focused ? Colors.primary : '#D1D1D1',
                borderWidth: focused ? 0 : 1,
                borderRadius: 15,
              }}
            >
              <Text style={[{ fontSize: 12, color: focused ? Colors.white : Colors.black, textAlign: 'center' }]}>
                Appointments - 54
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='InVoice'
        component={InVoice}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: ({ focused, color }) => (
            <View
              style={{
                width: width / 2.5,
                paddingVertical: 12,
                backgroundColor: focused ? Colors.primary : Colors.white,
                borderColor: focused ? Colors.primary : '#D1D1D1',
                borderWidth: focused ? 0 : 1,
                borderRadius: 15,
              }}
            >
              <Text
                style={[
                  { fontSize: 12, color: focused ? Colors.white : Colors.black, textAlign: 'center', marginTop: 2 },
                ]}
              >
                Invoice - 52
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default CProfileTop;
