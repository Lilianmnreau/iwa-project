import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from '@kolking/react-native-rating';

export default function Reservation_details({ route, navigation }) {
  const { reservation } = route.params;

  const currentDate = new Date(); // Date actuelle
  const endDate = new Date(reservation.date_fin); // Date de fin de la réservation

  const [showReviewForm, setShowReviewForm] = useState(false); // État pour gérer l'affichage du formulaire
  const [review, setReview] = useState({ note: '', commentaire: '' }); // État pour gérer l'avis
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(parseFloat(review.note) || 0);
  }, [review.note]);

  const handleCancel = () => {
    Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir annuler cette réservation ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => { /* Logique pour annuler la réservation */ } },
    ]);
  };

  const handleChangeRating = useCallback(
    (value: number) => {
      const roundedValue = Math.round(value);
      setRating(roundedValue);
      setReview((prevReview) => ({ ...prevReview, note: roundedValue.toString() }));
    },
    []
  );

  const handleGiveReview = () => {
    setShowReviewForm(true); // Afficher le formulaire d'avis
  };

  const handleSubmitReview = () => {
    // Logique pour soumettre l'avis (API ou stockage local par exemple)
    Alert.alert('Avis envoyé', 'Merci pour votre avis.');
    setShowReviewForm(false); // Masquer le formulaire après soumission
    Keyboard.dismiss(); // Fermer le clavier
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#37474F" />
            </TouchableOpacity>
            <Text style={styles.title}>Détails de la Réservation</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.detailText}>{reservation.date_debut} / {reservation.date_fin}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Statut:</Text>
            <Text style={styles.detailText}>{reservation.statut}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Message:</Text>
            <Text style={styles.detailText}>{reservation.message_voyageur}</Text>
          </View>

          {endDate < currentDate ? (
            <TouchableOpacity style={[styles.button, styles.reviewButton]} onPress={handleGiveReview}>
              <Text style={styles.buttonText}>Donner un avis</Text>
              <Ionicons name="star" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Annuler</Text>
              <Ionicons name="close-circle" size={20} color="#fff" />
            </TouchableOpacity>
          )}

          {showReviewForm && (
            <View style={styles.reviewForm}>
              <Text style={styles.formTitle}>Donner un avis</Text>
              <View style={styles.ratingContainer}>
                <Rating size={40} rating={rating} onChange={handleChangeRating} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Commentaire"
                multiline
                value={review.commentaire}
                onChangeText={(text) => setReview({ ...review, commentaire: text })}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
              <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmitReview}>
                <Text style={styles.buttonText}>Soumettre</Text>
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    borderRadius: 8,
    elevation: 3,
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
    fontWeight: '600',
    textAlign: 'center',
    color: '#37474F',
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
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
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  reviewButton: {
    backgroundColor: '#00796B',
  },
  submitButton: {
    backgroundColor: '#00796B',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  reviewForm: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ratingContainer: {
    paddingBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
  },
});
