import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SplashScreen from '@screens/splashScreen';
import AuthStack from '@navigation/AuthStack';
import BottomTab from '@navigation/bottomTab';
import UserStack from '@navigation/UserStack';
import StoresStack from '@navigation/StoresStack';
import WorkersStack from '@navigation/WorkersStack';
import ReportsStack from '@navigation/ReportsStack';
import TopTabDetails from '@navigation/topTabDetails';
import DetailScreen from '@screens/stores/detailScreen';

const Stack = createStackNavigator();
const TabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name='splashScreen' component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name='AuthStack' component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }} />
      <Stack.Screen name='UserStack' component={UserStack} options={{ headerShown: false }} />
      <Stack.Screen name='StoresStack' component={StoresStack} options={{ headerShown: false }} />
      <Stack.Screen
        name='TopTabDetails'
        component={TopTabDetails}
        options={({ navigation }) => ({
          header: () => <DetailScreen navigation={navigation} />,
        })}
      />
      <Stack.Screen name='WorkersStack' component={WorkersStack} options={{ headerShown: false }} />
      <Stack.Screen name='ReportsStack' component={ReportsStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default TabNavigator;
