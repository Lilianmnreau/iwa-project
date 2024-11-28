import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { renderRating } from "../../utils/renderRating";
import API from "../../utils/api";


interface Avis {
  idAvis: string;
  idUser: number;
  rating: number;
  commentaire: string;
  date: string;
}


export default function EmplacementDetailsAllRatings() {
    const route = useRoute();
    const avis = route.params.avis
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const navigation = useNavigation();

  // Récupération des prénoms des utilisateurs
  useEffect(() => {
    const fetchUserNames = async () => {
      setLoadingUsers(true);
      try {
        const userIds = Array.from(
          new Set(avis.map((review) => review.idUser))
        ); // ID uniques
        const userPromises = userIds.map(async (idUser) => {
          try {
            const response = await API.get(`/users/${idUser}/details`);
            return { idUser, prenom: response.data.prenom };
          } catch (err) {
            console.error(
              `Erreur lors de la récupération des détails de l'utilisateur ${idUser}:`,
              err
            );
            return { idUser, prenom: "Utilisateur inconnu" }; // Valeur par défaut
          }
        });

        const users = await Promise.all(userPromises);
        const userMap = users.reduce((acc, user) => {
          acc[user.idUser] = user.prenom;
          return acc;
        }, {} as { [key: number]: string });

        setUserNames(userMap);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUserNames();
  }, [avis]);

  // Filtrage des avis
  const filteredReviews = avis
    .filter((review) => {
      if (filter === "all") return true;
      if (filter === "recent") return true; // Placeholder pour les récents
      if (filter === "oldest") return true; // Placeholder pour les anciens
      if (filter === "best") return review.rating === 5;
      if (filter === "worst") return review.rating === 1;
      return review.rating === parseInt(filter);
    })
    .filter((review) =>
      review.commentaire.toLowerCase().includes(search.toLowerCase())
    );

  const Separator = () => <View style={styles.separator} />;

  if (loadingUsers) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Chargement des utilisateurs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tous les avis</Text>

      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher dans les avis..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Filtres horizontaux */}
      <ScrollView
        horizontal
        style={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableOpacity
          onPress={() => setFilter("all")}
          style={styles.filterButton}
        >
          <Text>Tout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("recent")}
          style={styles.filterButton}
        >
          <Text>Les plus récents</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("oldest")}
          style={styles.filterButton}
        >
          <Text>Les plus anciens</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("best")}
          style={styles.filterButton}
        >
          <Text>Les meilleurs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("worst")}
          style={styles.filterButton}
        >
          <Text>Les pires</Text>
        </TouchableOpacity>
        {[5, 4, 3, 2, 1].map((stars) => (
          <TouchableOpacity
            key={stars}
            onPress={() => setFilter(stars.toString())}
            style={styles.filterButton}
          >
            <View style={styles.starWrapper}>
              <View style={styles.starContainer}>
                {renderRating(stars, false)}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste des avis */}
      <FlatList
        data={filteredReviews}
        keyExtractor={(item) => item.idAvis}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.profileImagePlaceholder} />
              <View style={styles.profileTextContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.profileName}>
                    {userNames[item.idUser] || "Utilisateur inconnu"}
                  </Text>
                  <Text style={styles.commentDate}>{item.date}</Text>
                </View>
                {renderRating(item.rating, false)}
              </View>
            </View>
            <View style={styles.commentContainer}>
              <Text style={styles.commentText}>{item.commentaire}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  filterButton: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  starWrapper: {
    backgroundColor: "#f0f0f0", // Couleur d'arrière-plan des étoiles
    borderRadius: 10,
    padding: 5, // Ajout d'espace autour des étoiles
    alignItems: "center",
    justifyContent: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 12,
    color: "gray",
    marginLeft: 10,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});