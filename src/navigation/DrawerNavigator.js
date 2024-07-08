import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@screens/bottomTab/homeScreen';
import ProfileScreen from '@screens/bottomTab/profileScreen';
import Staff from '@screens/admin/Staff';
import Payroll from '@screens/admin/Payroll';
import Batches from '@screens/admin/Batches';
import Settings from '@screens/admin/Settings';
import Devices from '@screens/devices/Devices';
import SplashScreen from '@screens/splashScreen';
import OnboardingScreen from '@screens/auth/onboardingScreen';
import LoginScreen from '@screens/auth/loginScreen';
import EditStaff from '@screens/admin/EditStaff';
import Test from '../screens/admin/Test';
import Test2 from '../screens/admin/Test2';
import Test3 from '../screens/admin/Test3';
import UnverifiedStaff from '@screens/admin/UnverifiedStaff';
import { Colors, Fonts } from '../constants/style';
import { Text } from 'react-native';
import Icons6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuthContext } from '@contexts/AuthContext';
import UserStack from '@navigation/UserStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { userData } = useAuthContext();
  const roleId = userData?.role.id ? userData.role.id : 1; // 3 === worker, 1 === user, 4 === admin
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          // backgroundColor: Colors.lightPrimary,
        },
      }}
    >
      <Drawer.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Home</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,
          drawerIcon: ({ focused }) => {
            return (
              <Icon
                name={'home-sharp'}
                size={17}
                color={focused ? Colors.white : Colors.primary}
                style={{ position: 'absolute', left: 15 }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name='Payroll'
        component={Payroll}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused, color }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Payroll</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,
          drawerIcon: ({ focused }) => {
            return (
              <Icons6
                name={'money-check-dollar'}
                size={15}
                color={focused ? Colors.white : Colors.primary}
                style={{ position: 'absolute', left: 15 }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name='Batches'
        component={Batches}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused, color }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Batches & Reports</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,
          drawerIcon: ({ focused }) => {
            return (
              <Icons6
                name={'file-invoice-dollar'}
                size={15}
                color={focused ? Colors.white : Colors.primary}
                style={{ position: 'absolute', left: 15 }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name='Staff'
        component={Staff}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Staff</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,

          drawerIcon: ({ focused }) => {
            return (
              <Icons6
                name={'users'}
                size={15}
                color={focused ? Colors.white : Colors.primary}
                style={{ position: 'absolute', left: 15 }}
              />
            );
          },
        }}
      />
      {/* <Drawer.Screen name='Staff' component={Staff} options={{ headerShown: false }} /> user-group */}

      <Drawer.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Settings</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,

          drawerIcon: ({ focused }) => {
            return (
              <Icons6
                name={'gear'}
                size={15}
                color={focused ? Colors.white : Colors.primary}
                style={{ position: 'absolute', left: 15 }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name='Devices'
        component={Devices}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Devices</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,

          drawerIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name={'devices-other'}
                size={17}
                color={focused ? Colors.white : Colors.primary}
                style={{ position: 'absolute', left: 15 }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused, color }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Profile</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,
          drawerIcon: ({ focused }) => {
            return (
              <Icons6
                name={'user-gear'}
                size={15}
                color={focused ? Colors.white : Colors.primary}
                style={{ position: 'absolute', left: 15 }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name='Test'
        component={Test}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused, color }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Color Drag</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,
        }}
      />
      <Drawer.Screen
        name='Test2'
        component={Test2}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused, color }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Chess</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,
        }}
      />
      <Drawer.Screen
        name='Test3'
        component={Test3}
        options={{
          headerShown: false,
          drawerItemStyle: { borderRadius: 5, marginHorizontal: 2 },
          drawerLabel: ({ focused, color }) => {
            return <Text style={[focused ? Fonts.White16Bold : Fonts.Primary16Bold]}>Scrolling</Text>;
          },
          drawerActiveBackgroundColor: Colors.primary,
          drawerInactiveBackgroundColor: Colors.white,
        }}
      />
      <Drawer.Screen
        name='onboardingScreen'
        component={OnboardingScreen}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name='loginScreen'
        component={LoginScreen}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name='EditStaff'
        component={EditStaff}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' }, lazy: false }}
        unmountOnBlur={true}
      />
      <Drawer.Screen
        name='UnverifiedStaff'
        component={UnverifiedStaff}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name='UserStack'
        component={UserStack}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
