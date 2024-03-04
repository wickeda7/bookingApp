import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@screens/bottomTab/homeScreen';
import ProfileScreen from '@screens/bottomTab/profileScreen';
import Staff from '@screens/admin/Staff';
import SplashScreen from '@screens/splashScreen';
import OnboardingScreen from '@screens/auth/onboardingScreen';
import LoginScreen from '@screens/auth/loginScreen';
import EditStaff from '@screens/admin/EditStaff';
import UnverifiedStaff from '@screens/admin/UnverifiedStaff';
import { Colors, Fonts } from '../constants/style';
import { Text } from 'react-native';
import Icons6 from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthContext } from '@contexts/AuthContext';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { userData } = useAuthContext();
  const roleId = userData?.role.id ? userData.role.id : 1; // 3 === worker, 1 === user, 4 === admin
  console.log('userData!!!!!', userData);
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
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
