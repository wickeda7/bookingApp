import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '@screens/bottomTab/homeScreen';
import ProfileScreen from '@screens/bottomTab/profileScreen';
import Staff from '@screens/admin/Staff';
import SplashScreen from '@screens/splashScreen';
import OnboardingScreen from '@screens/auth/onboardingScreen';
import LoginScreen from '@screens/auth/loginScreen';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='Staff' component={Staff} options={{ headerShown: false }} />
      {/* <Drawer.Screen name='Staff' component={Staff} options={{ headerShown: false }} /> user-group */}
      <Drawer.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
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
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
