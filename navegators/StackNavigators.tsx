import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import ApiScreen from '../screens/ApiScreen';
import AlmacenamientoScreen from '../screens/AlmacenamientoScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Welcome} />
      <Stack.Screen name="Api" component={ApiScreen} />
      <Stack.Screen name="Almacenamiento" component={AlmacenamientoScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}