import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ServiceScreen from '@screens/stores/serviceScreen';
import InformationScreen from '@screens/stores/informationScreen';
import ReviewScreen from '@screens/stores/reviewScreen';
import { Colors } from '@constants/style';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

const TopTabDetails = (props) => {
  const { t, i18n } = useTranslation();
  const screen = props.route.params?.screen ? props.route.params?.screen : '';
  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`topTabDetails:${key}`);
  }
  const title = isRtl ? tr('review') : tr('services');
  const title2 = isRtl ? tr('services') : tr('review');

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          textTransform: 'capitalize',
        },
        tabBarActiveTintColor: Colors.primary,
        inactiveColor: Colors.grey,

        tabBarIndicatorStyle: {
          borderBottomColor: Colors.primary,
          borderBottomWidth: 3,
        },
      }}
    >
      <Tab.Screen
        name={isRtl ? 'reviewScreen' : 'serviceScreen'}
        component={isRtl ? ReviewScreen : ServiceScreen}
        options={{
          title: title,
        }}
        initialParams={{ screen: screen }}
      />
      <Tab.Screen
        name='informationScreen'
        component={InformationScreen}
        options={{
          title: tr('information'),
        }}
        initialParams={{ screen: screen }}
      />
      <Tab.Screen
        name={isRtl ? 'serviceScreen' : 'reviewScreen'}
        component={isRtl ? ServiceScreen : ReviewScreen}
        options={{
          title: title2,
        }}
        initialParams={{ screen: screen }}
      />
    </Tab.Navigator>
  );
};
export default TopTabDetails;
