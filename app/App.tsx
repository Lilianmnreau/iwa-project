import 'intl-pluralrules'; // Importer le polyfill
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './layout/navbar';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './layout/header';
import { useEffect } from "react";
import { initializeProfil } from './store/actions/profilActions';
import Toast from 'react-native-toast-message';
import './i18n'; // Importer la configuration i18n
import { useNotificationViewModel } from './viewModels/notification.viewModel';
import { AppDispatch } from './store';
const Stack = createStackNavigator();

function AppContent() {
  
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Appel de la fonction initializeProfil au chargement de l'application
    dispatch(initializeProfil())
  }, [dispatch]);

  // récuperer l'id de l'user connecté pour charger ses notifications
  const { notifications, markAsRead } = useNotificationViewModel(1);

  const markAllAsRead = () => {
    notifications.forEach((notif) => {
      if (!notif.read) {
        markAsRead(notif.id);
      }
    });
  };

  return (
    <NavigationContainer>
      <Header  notifications={notifications} onMarkAsRead={markAsRead}/>
      <Navbar />
      <Toast />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});