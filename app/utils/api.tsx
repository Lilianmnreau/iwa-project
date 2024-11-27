import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Créer une instance Axios
const API = axios.create({
  baseURL: "http://172.20.10.2:8083/api/v1", // Remplacez par l'URL de votre back-end
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // En-tête pour spécifier le type de contenu
  },
});

// Intercepteur pour ajouter le JWT dans les requêtes
API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwt");
    if (token ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirection ou notification en cas d'authentification échouée
      console.error("Unauthorized. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default API;
