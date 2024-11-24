import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { Button } from 'react-native-paper'; // Utilisation de Button de react-native-paper
import Toast from 'react-native-toast-message'; // Importer Toast

type ReservationParams = {
  reservation: {
    date: string;
    statut: string;
    message_voyageur: string;
  };
};

export default function EmplacementReservationDetails() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: ReservationParams }, 'params'>>(); 
  const { reservation } = route.params;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const maxLength = 600;

  const handleSubmit = () => {
    if (rating === 0) {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Veuillez sélectionner une note.',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Soumission réussie',
        text2: `Votre avis a été soumis avec la note de ${rating} étoiles.`,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#37474F" />
        </TouchableOpacity>
        <Text style={styles.title}>Détails de la Réservation</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{reservation.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Statut:</Text>
        <Text style={styles.value}>{reservation.statut}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Message:</Text>
        <Text style={styles.value}>{reservation.message_voyageur}</Text>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Laisser un avis</Text>
        <View style={styles.ratingContainer}>
          <Rating rating={rating} onChange={setRating} max={5} iconWidth={30} iconHeight={30} />
        </View>
        <TextInput
          style={styles.commentInput}
          placeholder="Votre commentaire (facultatif)"
          value={comment}
          onChangeText={(text) => setComment(text.slice(0, maxLength))} // Limiter à 600 caractères
          placeholderTextColor="#B0BEC5"
          maxLength={maxLength} // Limite de 600 caractères
          multiline
        />
        <Text style={styles.charCount}>
          {comment.length}/{maxLength} caractères
        </Text>
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Soumettre
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#37474F",
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  reviewContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 3,
    paddingBottom: 30, // Ajouter du padding en bas
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    alignItems: 'flex-start', // Aligner le composant de notation à gauche
    marginBottom: 15,
  },
  commentInput: {
    height: 100, // Augmenter la hauteur pour permettre de visualiser tout le texte
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    textAlignVertical: 'top', // Permettre de visualiser tout le texte
  },
  charCount: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'right',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#00796B',
    borderRadius: 5,
  },
});