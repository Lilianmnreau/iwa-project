import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/header_logo.jpeg')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end', // Aligner le contenu en bas
    paddingLeft: 10, // Ajouter un padding à gauche
    paddingBottom: 10, // Ajouter un padding en bas
  },
  logo: {
    width: 120, // Ajustez la largeur selon vos besoins
    height: 120, // Ajustez la hauteur selon vos besoins
    resizeMode: 'contain', // Pour s'assurer que l'image est contenue dans les dimensions spécifiées
    marginBottom: -40, // Ajustez cette valeur pour descendre le logo
  },
});