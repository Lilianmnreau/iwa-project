import 'intl-pluralrules'; // Importer le polyfill
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './layout/navbar';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './layout/header';
import Toast from 'react-native-toast-message';
import './i18n'; // Importer la configuration i18n

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Navbar />
        <Toast />
      </NavigationContainer>
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