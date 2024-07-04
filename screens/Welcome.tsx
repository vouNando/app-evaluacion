import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function Welcome({ navigation }: any) {
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/46/e8/5c/46e85c31363adf4dc8a06209a75d8b68.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>Welcome</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Api')}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Fondo semitransparente para ver la imagen de fondo
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#31363F',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#76ABAE',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
