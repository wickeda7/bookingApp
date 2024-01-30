import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ServiceScreen from '@screens/stores/serviceScreen';
import ServiceScreen2 from '@screens/stores/serviceScreen2';
import ServiceScreenSub from '@screens/stores/serviceScreenSub';
import InformationScreen from '@screens/stores/informationScreen';
import ReviewScreen from '@screens/stores/reviewScreen';
import { Colors } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useStoreContext } from '@contexts/StoreContext';
const Tab = createMaterialTopTabNavigator();

const TopTabDetails = (props) => {
  const { t, i18n } = useTranslation();
  const screen = props.route.params?.screen ? props.route.params?.screen : '';
  const isRtl = i18n.dir() === 'rtl';
  const { selectedStore } = useStoreContext();
  const { services } = selectedStore;
  function tr(key) {
    return t(`topTabDetails:${key}`);
  }
  const title = isRtl ? tr('review') : tr('services');
  const title2 = isRtl ? tr('services') : tr('review');
  if (!services) return null;
  return (
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
      {/* <Tab.Screen
        key={services[0].id}
        name={`serviceScreen${services[0].id}`}
        component={ServiceScreen}
        options={{
          title: services[0].name,
        }}
        initialParams={{ service: services[0], screen: screen }}
      /> */}
      {/* {services &&
        services.map((service) => {
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

          // if (service.items) {
          //   return (
          //     <Tab.Screen
          //       key={service.id}
          //       name={`serviceScreen${service.id}`}
          //       component={ServiceScreen}
          //       options={{
          //         title: service.name,
          //       }}
          //       initialParams={{ service: service, screen: screen }}
          //     />
          //   );
          // } else {
          //   return (
          //     <Tab.Screen
          //       key={service.id}
          //       name={`serviceScreenSub${service.id}`}
          //       component={ServiceScreenSub}
          //       options={{
          //         title: service.name,
          //       }}
          //       initialParams={{ service: service, screen: screen }}
          //     />
          //   );
          // }
        })} */}
      {/* {!services && (
        <Tab.Screen
          name={isRtl ? 'reviewScreen' : 'serviceScreen'}
          component={isRtl ? ReviewScreen : ServiceScreen2}
          options={{
            title: title,
          }}
          initialParams={{ screen: screen }}
        />
      )} */}
      <Tab.Screen
        name='informationScreen'
        component={InformationScreen}
        options={{
          title: tr('information'),
        }}
      />
      <Tab.Screen
        name={isRtl ? 'serviceScreen' : 'reviewScreen'}
        component={isRtl ? ServiceScreen : ReviewScreen}
        options={{
          title: title2,
        }}
      />
    </Tab.Navigator>
  );
};
export default TopTabDetails;
