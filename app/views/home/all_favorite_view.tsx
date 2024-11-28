import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useEmplacementViewModel from "../../viewModels/emplacement_viewModel";
import useEmplacementFavoriteViewModel from "../../viewModels/emplacement_favorite_viewModel";

export default function FavoritesPage() {
  const { emplacements, loading, error, getEmplacementById } =
    useEmplacementViewModel();
  const { favorites: favoriteEmplacements } = useEmplacementFavoriteViewModel();
  const [favoritesData, setFavoritesData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setFavoritesData(favoriteEmplacements || []); // Initialisation sécurisée
  }, [favoriteEmplacements, loading, error]);

  const handleItemPress = (item) => {
    const emplacement = getEmplacementById(item.idEmplacement);
    if (emplacement) {
      navigation.navigate("EmplacementDetails", { marker: emplacement });
    }
  };

  const renderItem = ({ item }) => {
    item = getEmplacementById(item.idEmplacement)
    // Vérification de sécurité pour éviter les accès à des données non définies
    const photo = item.photos?.[0] || "https://via.placeholder.com/150"; // Placeholder si aucune photo
    return (
      <TouchableOpacity
        style={styles.favoriteItem}
        onPress={() => handleItemPress(item)}
      >
        <ImageBackground source={{ uri: photo }} style={styles.imageBackground}>
          <View style={styles.textContainer}>
            <Text style={styles.itemText}>
              {item.localisation || "Localisation inconnue"}
            </Text>
            <Text style={styles.itemText}>
              {item.caracteristique || "Description indisponible"}
            </Text>
          </View>
          <View style={styles.heartIcon}>
            <Ionicons name="heart" size={32} color="red" />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>Erreur: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
          testID="go-back-button"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Vos emplacements favoris</Text>
      </View>
      <FlatList
        data={favoritesData}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.idEmplacement?.toString() || Math.random().toString()
        } // Clé sécurisée
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  goBackButton: {
    marginRight: 10,
    color: "black",
    borderRadius: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  favoriteItem: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
  },
  imageBackground: {
    width: "100%",
    height: 150,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  textContainer: {
    padding: 10,
  },
  itemText: {
    fontSize: 20,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingRight: 90,
    paddingLeft: 30,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  flatListContent: {
    alignItems: "center",
  },
});
