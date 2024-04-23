import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ServiceScreen from '@screens/stores/serviceScreen';
import InformationScreen from '@screens/stores/informationScreen';
import ReviewScreen from '@screens/stores/reviewScreen';
import { Colors } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Loader from '@components/loader';

const Tab = createMaterialTopTabNavigator();

const TopTabDetails = (props) => {
  const { t, i18n } = useTranslation();
  const screen = props.route.params?.screen ? props.route.params?.screen : '';
  const isRtl = i18n.dir() === 'rtl';
  const { selectedStore, stores, isLoading } = useSelector((state) => state.stores);
  if (isLoading) return null;
  const { services } = selectedStore;
  function tr(key) {
    return t(`topTabDetails:${key}`);
  }
  const title = isRtl ? tr('review') : tr('services');
  const title2 = isRtl ? tr('services') : tr('review');
  return (
    <>
      <Loader visible={isLoading} />
      <Tab.Navigator
        initialRouteName={ServiceScreen}
        screenOptions={{
          lazy: true,
          tabBarLabelStyle: {
            fontSize: 16,
            textTransform: 'capitalize',
          },
          tabBarActiveTintColor: Colors.primary,
          animationEnabled: false,
          inactiveColor: Colors.grey,
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            borderBottomColor: Colors.primary,
            borderBottomWidth: 3,
          },
        }}
      >
        {services.map((service) => {
          return (
            <Tab.Screen
              key={service.id}
              name={`serviceScreen${service.id}`}
              component={ServiceScreen}
              options={{
                title: service.name,
              }}
              initialParams={{ service: service, screen: screen }}
            />
          );
        })}

        <Tab.Screen
          name='informationScreen'
          component={InformationScreen}
          options={{
            title: tr('information'),
          }}
          initialParams={{ screen: screen, selectedStore: selectedStore }}
        />
        <Tab.Screen
          name={isRtl ? 'serviceScreen' : 'reviewScreen'}
          component={isRtl ? ServiceScreen : ReviewScreen}
          options={{
            title: title2,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default TopTabDetails;
