import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setEquipements } from "../../store/slices/addEmplacementSlice"; // Action mise à jour
import { RootState } from "../../store"; // Assurez-vous que le chemin est correct

const iconMap = {
  "Wi-Fi": "wifi",
  Piscine: "water",
  Parking: "car",
  "Animaux acceptés": "paw",
  Terrasse: "home",
  Électricité: "flash",
  "Eau potable": "water",
  Poubelles: "trash",
  Toit: "home",
  "Feu de camp": "campfire",
};

export default function AddEmplacementFacilities() {
  const dispatch = useDispatch();
  const selectedFacilities = useSelector(
    (state: RootState) => state.addEmplacement.equipements
  );

  const handleSelection = (facility: string) => {
    const updatedFacilities = selectedFacilities.includes(facility)
      ? selectedFacilities.filter((item) => item !== facility)
      : [...selectedFacilities, facility];
    dispatch(setEquipements(updatedFacilities));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sélectionner les équipements</Text>
      {Object.keys(iconMap).map((facility) => (
        <TouchableOpacity
          key={facility}
          style={[
            styles.item,
            selectedFacilities.includes(facility) && styles.itemSelected,
          ]}
          onPress={() => handleSelection(facility)}
        >
          <View style={styles.iconContainer}>
            {iconMap[facility] === "campfire" ? (
              <MaterialCommunityIcons
                name="campfire"
                size={24}
                color="#6D4C41"
              />
            ) : iconMap[facility] === "trash" ? (
              <Ionicons name="trash" size={24} color="#B0BEC5" />
            ) : (
              <Ionicons name={iconMap[facility]} size={24} color="#00796B" />
            )}
          </View>
          <Text
            style={[
              styles.text,
              selectedFacilities.includes(facility) && styles.textSelected,
            ]}
          >
            {facility}
          </Text>
          {selectedFacilities.includes(facility) && (
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00796B",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1,
  },
  itemSelected: {
    backgroundColor: "#E0F7FA",
    borderWidth: 1,
    borderColor: "#00796B",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#424242",
  },
  textSelected: {
    fontWeight: "bold",
    color: "#00796B",
  },
  iconContainer: {
    marginRight: 10,
  },
});
