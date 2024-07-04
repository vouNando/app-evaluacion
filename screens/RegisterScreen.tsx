import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../config/config';

export default function RegisterScreen({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [comentario, setComentario] = useState('');

  const handleAgregarRecordatorio = () => {
    // Validar que los campos no estén vacíos
    if (!cedula || !nombre || !correo || !comentario) {
      Alert.alert('Todos los campos son requeridos');
      return;
    }

    // Guardar el usuario en Firebase
    guardarUsuario(cedula, nombre, correo, comentario);
  };

  const guardarUsuario = (cedula: string, nombre: string, correo: string, comentario: string) => {
    set(ref(db, `usuarios/${cedula}`), {
      nombre: nombre,
      email: correo,
      comentario: comentario,
    })
      .then(() => {
        Alert.alert('Mensaje', 'Guardado con éxito');
        limpiarFormulario();
        navigation.navigate('AlmacenamientoScreen'); // Navegar a AlmacenamientoScreen después de guardar
      })
      .catch((error) => {
        console.error('Error al guardar el usuario:', error);
        Alert.alert('Error', 'No se pudo guardar el usuario');
      });
  };

  const limpiarFormulario = () => {
    setCedula('');
    setNombre('');
    setCorreo('');
    setComentario('');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/564x/46/e8/5c/46e85c31363adf4dc8a06209a75d8b68.jpg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Recordatorio</Text>
        <Text style={styles.subtitle}>Usuarios</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setCedula(text)}
          value={cedula}
          keyboardType="numeric"
          placeholder="Ingrese cédula"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNombre(text)}
          value={nombre}
          placeholder="Ingrese nombre"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCorreo(text)}
          value={correo}
          keyboardType="email-address"
          placeholder="Ingrese correo"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setComentario(text)}
          value={comentario}
          placeholder="Ingrese comentario"
        />

        <TouchableOpacity style={styles.button} onPress={handleAgregarRecordatorio}>
          <Text style={styles.buttonText}>Agregar Recordatorio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Almacenamiento')}
        >
          <Text style={styles.buttonText}>Ir a Almacenamiento</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#4D869C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#31363F',
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#EEEEEE',
    marginBottom: 10,
    color: '#7AB2B2',
  },
  button: {
    backgroundColor: '#76ABAE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
