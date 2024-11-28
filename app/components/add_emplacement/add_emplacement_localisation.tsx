import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLocalisation } from "../../store/slices/addEmplacementSlice"; // Action pour mettre à jour la localisation
import { RootState } from "../../store"; // Importez le type RootState

export default function AddEmplacementLocation() {
  const dispatch = useDispatch();
  const localisation = useSelector(
    (state: RootState) => state.addEmplacement.localisation
  );
  const maxLength = 200;

  const handleLocalisationChange = (text: string) => {
    dispatch(setLocalisation(text));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Localisation</Text>
      <Text style={styles.instructions}>
        Entrez l'adresse ou la localisation de l'emplacement
      </Text>
      <TextInput
        style={styles.input}
        multiline
        maxLength={maxLength}
        placeholder="Entrez la localisation ici..."
        placeholderTextColor="#B0BEC5"
        value={localisation}
        onChangeText={handleLocalisationChange}
      />
      <Text style={styles.charCount}>
        {localisation.length}/{maxLength} caractères
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 5,
  },
  instructions: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 10,
  },
  input: {
    height: 60,
    borderColor: "#B0BEC5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#F9F9F9",
  },
  charCount: {
    marginTop: 5,
    fontSize: 12,
    color: "#757575",
    textAlign: "right",
  },
});
