
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../screens/Welcome';
import StackNavigators from './StackNavigators';
import AlmacenamientoScreen from '../screens/AlmacenamientoScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ApiScreen from '../screens/ApiScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Welcome} />
      <Tab.Screen name="Settings" component={AlmacenamientoScreen} />
      <Tab.Screen name="Settings" component={RegisterScreen} />
      <Tab.Screen name="Settings" component={ApiScreen} />
    </Tab.Navigator>
  );
}