import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Welcome from './screens/Welcome';
import RegisterScreen from './screens/RegisterScreen';
import AlmacenamientoScreen from './screens/AlmacenamientoScreen';
import ApiScreen from './screens/ApiScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Almacenamiento" component={AlmacenamientoScreen} />
        <Stack.Screen name="Api" component={ApiScreen} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
