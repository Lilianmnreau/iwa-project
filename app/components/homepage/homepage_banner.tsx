import { ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native';

const image = require('../../assets/homepage_banner.webp'); // Importer l'image locale
const HEADER_HEIGHT = 90; // Hauteur du header

export default function HomepageBanner() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Le trek simplifié, l'aventure amplifiée</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200, // Hauteur fixe pour la bannière
    justifyContent: 'flex-start', // Positionner l'image en haut
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'black', // Couleur de l'ombre (contour)
    textShadowOffset: { width: -1, height: 1 }, // Décalage de l'ombre
    textShadowRadius: 10, // Rayon de l'ombre
  },
});