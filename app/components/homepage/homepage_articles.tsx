import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Article } from "../../models/article.model";
import { fetchArticlesStart, fetchArticlesSuccess, fetchArticlesFailure } from "../../store/articleSlice";
import Toast from 'react-native-toast-message';
import SkeletonArticle from './skeleton_article'; // Assurez-vous d'importer le composant SkeletonArticle

export default function HomepageArticles() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.article.articles);
  const loading = useSelector((state: RootState) => state.article.loading);
  const error = useSelector((state: RootState) => state.article.error);
  const ARTICLE_LIMIT = 3;
  const apiBaseUrl = process.env.REACT_APP_ARTICLE_API_BASE_URL;

  const fetchArticles = async () => {
    dispatch(fetchArticlesStart());
    try {
      const response = await fetch(`${apiBaseUrl}/articles`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Article[] = await response.json();
      dispatch(fetchArticlesSuccess(data));
    } catch (error) {
      dispatch(fetchArticlesFailure((error as Error).message));
        Toast.show({
          type: 'error',
          text1: 'Échec de la récupération des articles',
        });
    }
  };

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [dispatch, articles.length, apiBaseUrl]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() => handleArticlePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{item.titre}</Text>
        <Text style={styles.articleExcerpt}>{item.extrait_description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleArticlePress = (article) => {
    navigation.navigate("ArticleDetails", { article });
  };

  const handleSeeAllPress = () => {
    navigation.navigate("ArticlesPage", { articlesData: articles });
  };

  const handleAddPress = () => {
    navigation.navigate("AddArticle");
  };

  const handleReloadPress = () => {
    fetchArticles();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Articles & Blogs</Text>
        {Array.from({ length: ARTICLE_LIMIT }).map((_, index) => (
          <SkeletonArticle key={index} />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Articles & Blogs</Text>
        <TouchableOpacity style={styles.reloadButton} onPress={handleReloadPress}>
          <Ionicons name="reload" size={50} color="#00796B" />
          <Text style={styles.reloadText}>Recharger</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Articles & Blogs</Text>
      <FlatList
        data={articles.slice(0, ARTICLE_LIMIT)} // Affichez seulement les 2 premiers articles ici
        renderItem={renderItem}
        keyExtractor={(item) => item.id_article}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={handleSeeAllPress}
        >
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-down" size={30} color="white" />
          </View>
          <Text style={styles.arrowText}>Voir tous les articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.seeAllButton} onPress={handleAddPress}>
          <View style={styles.arrowCircle}>
            <FontAwesome6 name="add" size={24} color="white" />
          </View>
          <Text style={styles.arrowText}>Ajouter un article</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF", // Fond doux et neutre
    flex: 1, // Assurez-vous que le conteneur prend toute la hauteur de l'écran
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Aligne les boutons horizontalement
    justifyContent: 'center',
    marginTop: 20,
  },
  articleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF", // Fond blanc pour chaque article
    padding: 15, // Espace autour du contenu
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Ombre pour Android
  },
  articleImage: {
    width: 90,
    height: 90,
    borderRadius: 8, // Images arrondies
  },
  articleContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00796B",
  },
  articleExcerpt: {
    fontSize: 14,
    color: "#757575",
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796B", // Couleur naturelle
    marginBottom: 20,
  },
  seeAllButton: {
    alignItems: "center",
    marginTop: 20,
  },
  arrowCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00796B", // Couleur élégante et naturelle pour le bouton
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  arrowText: {
    fontSize: 16,
    color: "#333333", // Texte sobre
    padding: 5,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  reloadButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  reloadText: {
    fontSize: 16,
    color: "#00796B",
    marginTop: 10,
  },
});