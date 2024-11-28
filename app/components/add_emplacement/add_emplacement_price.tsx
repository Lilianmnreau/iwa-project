import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setTarif } from "../../store/slices/addEmplacementSlice"; // Utilisation du nouveau slice
import { RootState } from "../../store"; // Assurez-vous que le chemin est correct

export default function AddEmplacementPrice() {
  const dispatch = useDispatch();
  const price = useSelector((state: RootState) => state.addEmplacement.tarif); // Récupération du tarif via Redux
  const maxLength = 4;

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Ne garder que les chiffres
    if (numericValue === "") {
      dispatch(setTarif(0)); // Si le champ est vide, définir à 0
    } else {
      const numericPrice = Math.max(
        1,
        Math.min(1000, parseInt(numericValue, 10))
      ); // Limite entre 1 et 1000
      dispatch(setTarif(numericPrice));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prix de l'emplacement</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Entrez le prix en euros"
        placeholderTextColor="gray"
        value={price ? price.toString() : ""}
        onChangeText={handlePriceChange}
        maxLength={maxLength}
      />
      <Text style={styles.instructions}>
        Le prix doit être compris entre 1 et 1000 euros.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    color: "#00796B",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F9F9F9", // Ajout d'une couleur de fond douce
  },
  instructions: {
    marginTop: 5,
    fontSize: 12,
    color: "gray",
  },
});
