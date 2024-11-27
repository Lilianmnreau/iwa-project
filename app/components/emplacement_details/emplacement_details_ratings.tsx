import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { renderRating } from "../../utils/renderRating";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { couleur } from "../../color";
import useEmplacementViewModel from "../../viewModels/emplacement_viewModel";

interface EmplacementDetailsRatingsProps {
  emplacementId: number; // ID de l'emplacement pour récupérer les avis
  rating: number; // Note moyenne de l'emplacement
}

const MAX_COMMENT_LENGTH = 200;

const truncateComment = (comment: string) => {
  if (comment.length <= MAX_COMMENT_LENGTH) return comment;
  const truncated = comment.substring(0, MAX_COMMENT_LENGTH);
  return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
};

export default function EmplacementDetailsRatings({
  emplacementId,
  rating,
}: EmplacementDetailsRatingsProps) {
  const { avis, loading, error } = useEmplacementViewModel();

  // Vérifiez que `avis` est bien défini avant d'appeler `filter`
  const emplacementAvis = avis
    ? avis.filter((a) => a.idEmplacement === emplacementId)
    : [];

  const data = [...emplacementAvis, "arrow"]; // Ajouter un élément 'arrow' à la fin pour voir plus d'avis
  const width = Dimensions.get("window").width;
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const navigation = useNavigation();

  const handleArrowPress = () => {
    navigation.navigate("EmplacementDetailsAllRatings", { emplacementId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={couleur} />
        <Text style={styles.loadingText}>Chargement des avis...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {renderRating(rating, true)}
        <Text style={styles.commentsText}>
          {emplacementAvis.length} Commentaires
        </Text>
      </View>
      <Carousel
        ref={carouselRef}
        width={width}
        height={width / 2}
        data={data}
        loop={false}
        onProgressChange={(
          offsetProgress: number,
          absoluteProgress: number
        ) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ index, item }) =>
          item === "arrow" ? (
            <TouchableOpacity
              style={styles.arrowContainer}
              onPress={handleArrowPress}
            >
              <View style={styles.arrowCircle}>
                <Ionicons name="arrow-forward" size={30} color="#fff" />
              </View>
              <Text style={styles.arrowText}>Voir tous les avis</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.itemContainer} key={item.idAvis}>
              <View style={styles.profileContainer}>
                <View style={styles.profileImagePlaceholder} />
                <View style={styles.profileTextContainer}>
                  <View style={styles.userInfo}>
                    <Text style={styles.profileName}>
                      {item.prenom_utilisateur}
                    </Text>
                    <Text style={styles.commentDate}>{item.date}</Text>
                  </View>
                  {renderRating(item.note, false)}
                </View>
              </View>
              <View style={styles.commentContainer}>
                <ScrollView>
                  <Text style={styles.commentText}>
                    {truncateComment(item.commentaire)}
                  </Text>
                </ScrollView>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4B4B4B",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 10,
  },
  commentsText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#4B4B4B",
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C4C4C4",
    marginRight: 10,
  },
  profileTextContainer: {
    flexDirection: "column",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
    color: "#4B4B4B",
  },
  commentDate: {
    fontSize: 12,
    color: "#888888",
  },
  commentContainer: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 14,
    color: "#4B4B4B",
    textAlign: "justify",
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  arrowCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4B8B3B",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    marginTop: 10,
    fontSize: 14,
    color: "#4B8B3B",
    fontWeight: "600",
  },
});
