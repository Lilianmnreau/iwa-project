import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    } else if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
    } else {
      Alert.alert('Inscription réussie', `Bienvenue ${firstName}`);
      navigation.navigate('Login'); // Redirige vers la page de connexion après succès
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#B0BEC5"
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#B0BEC5"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B0BEC5"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#B0BEC5"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#B0BEC5"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginRedirect} onPress={handleLoginRedirect}>
        <Text style={styles.redirectText}>Déjà un compte ? Connectez-vous</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Fond sobre
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5', // Bordure avec un ton sobre
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff', // Fond blanc pour les champs de texte
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00796B', // Couleur verte naturelle et sobre
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  loginRedirect: {
    marginTop: 30,
    alignItems: 'center',
  },
  redirectText: {
    color: '#00796B', // Même vert naturel pour le lien
    fontWeight: 'bold',
    fontSize: 16,
  },
});
