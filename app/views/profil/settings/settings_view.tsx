import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/profilSlice';
import { useNavigation } from '@react-navigation/native';
import { couleur } from '../../../color';
import { useTranslation } from 'react-i18next';
import { useUserViewModel } from '../../../viewModels/user_viewModel'; // Importer le hook

const SettingsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.profil.isLoggedIn);
  const userId = useSelector(state => state.profil.userId); // Assurez-vous que l'ID utilisateur est disponible dans le state
  const [isDeletePending, setIsDeletePending] = useState(false);
  const navigation = useNavigation();
  const { deleteUser } = useUserViewModel(); // Utiliser le hook

  const handleDeleteProfile = () => {
    Alert.alert(t('Confirmation'), t('Are you sure you want to delete your profile?'), [
      { text: t('Cancel'), style: 'cancel' },
      {
        text: t('Delete'),
        onPress: () => {
          deleteUser(userId); // Supprimer l'utilisateur
          dispatch(logout()); // Déconnecter l'utilisateur après suppression
          setIsDeletePending(true);
        },
      },
    ]);
  };

  const handleCancelDelete = () => {
    setIsDeletePending(false);
    Alert.alert(t('Cancellation'), t('Your delete request has been cancelled.'));
  };

  const changeLanguage = () => {
    navigation.navigate('Translation' as never);
  };

  const handleLogout = () => {
    Alert.alert(t('Logout'), t('Are you sure you want to logout?'), [
      { text: t('Cancel'), style: 'cancel' },
      {
        text: t('Logout'),
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('Settings')}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={changeLanguage}>
          <Text style={styles.buttonText}>{t('Change Language')}</Text>
          <Ionicons name="language" size={20} color="#fff" />
        </TouchableOpacity>

        {isDeletePending ? (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleCancelDelete}>
            <Text style={styles.buttonText}>{t('Cancel Delete Request')}</Text>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteProfile}>
            <Text style={styles.buttonText}>{t('Delete Profile')}</Text>
            <Ionicons name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        )}

        {isLoggedIn && (
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>{t('Logout')}</Text>
            <Ionicons name="log-out" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleur,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#333', // Couleur sombre pour le titre
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6c757d', // Couleur grise pour les boutons
    borderRadius: 8,
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Couleur rouge sobre pour le bouton de suppression
  },
  logoutButton: {
    backgroundColor: '#007bff', // Couleur bleue sobre pour le bouton de déconnexion
  },
});

export default SettingsView;