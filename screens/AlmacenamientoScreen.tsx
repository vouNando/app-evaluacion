import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ref, get, child, remove, update } from 'firebase/database';
import { db } from '../config/config';

export default function AlmacenamientoScreen({ navigation }: any) {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<any[]>([]); // Estado para usuarios filtrados
  const [selectedUserId, setSelectedUserId] = useState<string>(''); // Para almacenar el ID del usuario seleccionado
  const [selectedUserDetails, setSelectedUserDetails] = useState<any>(null); // Para almacenar detalles del usuario seleccionado
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Función para cargar los usuarios desde Firebase
  const cargarUsuarios = async () => {
    try {
      const usuariosSnapshot = await get(child(ref(db), 'usuarios/'));
      const usuariosList: any[] = [];
      usuariosSnapshot.forEach((snap) => {
        usuariosList.push({
          id: snap.key,
          ...snap.val()
        });
      });

      setUsuarios(usuariosList);
      filtrarUsuarios(usuariosList, searchTerm); // Filtrar usuarios al cargar
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    }
  };

  // Función para manejar la selección de un usuario y mostrar detalles
  const handleSelectUser = async (userId: string) => {
    try {
      const usuarioSnapshot = await get(child(ref(db), `usuarios/${userId}`));
      setSelectedUserDetails(usuarioSnapshot.val());
      setSelectedUserId(userId);
    } catch (error) {
      console.error('Error al cargar detalles del usuario:', error);
      Alert.alert('Error', 'No se pudieron cargar los detalles del usuario');
    }
  };

  // Función para manejar la edición de un usuario
  const handleEditarUsuario = async () => {
    try {
      if (!selectedUserId) {
        Alert.alert('Error', 'Selecciona un usuario para editar');
        return;
      }
      // Aquí podrías navegar a una pantalla de edición o implementar la lógica para editar directamente en este componente
      // Por ejemplo:
      // navigation.navigate('EditarUsuarioScreen', { userId: selectedUserId });
      Alert.alert('Editar usuario', `Implementa la lógica para editar el usuario con ID ${selectedUserId}`);
    } catch (error) {
      console.error('Error al editar usuario:', error);
      Alert.alert('Error', 'No se pudo editar el usuario');
    }
  };

  // Función para manejar la eliminación de un usuario
  const handleEliminarUsuario = async () => {
    try {
      if (!selectedUserId) {
        Alert.alert('Error', 'Selecciona un usuario para eliminar');
        return;
      }
      await remove(ref(db, `usuarios/${selectedUserId}`));
      Alert.alert('Usuario eliminado', `Usuario con ID ${selectedUserId} eliminado correctamente`);
      limpiarSeleccion();
      cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      Alert.alert('Error', 'No se pudo eliminar el usuario');
    }
  };

  // Función para limpiar la selección actual de usuario
  const limpiarSeleccion = () => {
    setSelectedUserId('');
    setSelectedUserDetails(null);
  };

  // Función para filtrar usuarios por nombre
  const filtrarUsuarios = (usuariosList: any[], searchTerm: string) => {
    const usuariosFiltrados = usuariosList.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsuariosFiltrados(usuariosFiltrados);
  };

  // Función para renderizar cada elemento en la FlatList
  const renderUsuario = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectUser(item.id)}>
      <Text style={styles.itemText}>{item.nombre}</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleEditarUsuario}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleEliminarUsuario}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Función para manejar cambios en el término de búsqueda
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    filtrarUsuarios(usuarios, text); // Filtrar usuarios al cambiar el término de búsqueda
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios Almacenados</Text>

      {/* Sección de detalles del usuario seleccionado */}
      {selectedUserDetails && (
        <View style={styles.detailContainer}>
          <Text style={styles.subtitle}>Detalles del Usuario</Text>
          <Text>Nombre: {selectedUserDetails.nombre}</Text>
          <Text>Correo: {selectedUserDetails.email}</Text>
          <Text>Comentario: {selectedUserDetails.comentario}</Text>
        </View>
      )}

      {/* Campo de búsqueda */}
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchTerm}
        placeholder="Buscar por nombre"
      />

      {/* Lista de nombres de usuarios filtrados */}
      <Text style={styles.subtitle}>Lista de Nombres</Text>
      <FlatList
        data={usuariosFiltrados}
        renderItem={renderUsuario}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
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
  detailContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#31363F',
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#CDE8E5',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
    color: '#7AB2B2',
  },
  editButton: {
    backgroundColor: '#76ABAE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  flatList: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#31363F',
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#EEEEEE',
    marginBottom: 10,
    color: '#7AB2B2',
  },
});
