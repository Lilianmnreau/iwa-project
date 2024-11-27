import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../utils/api"; 
import {
  fetchProfilStart,
  fetchProfilSuccess,
  fetchProfilFailure,
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
  loginSuccess,
  logoutSuccess,
} from "../slices/profilSlice";
import { User } from "../../models/user.model";
import { AxiosError } from "axios";

// ** Fetch Profile Notifications **
export const fetchProfileNotifications = createAsyncThunk(
  "profil/fetchNotifications",
  async (_, { dispatch }) => {
    dispatch(fetchProfilStart());
    try {
      const response = await API.get("/profile/notifications");
      const { profil_notifications, isLoggedIn } = response.data;

      dispatch(fetchProfilSuccess({ profil_notifications, isLoggedIn }));
    } catch (error: any) {
      dispatch(
        fetchProfilFailure(
          error.message || "Failed to fetch profile notifications"
        )
      );
    }
  }
);

export const initializeProfil = (): AppThunk => async (dispatch) => {
  try {
    const jwt = await AsyncStorage.getItem("jwt");
    const userId = await AsyncStorage.getItem("userId");

    if (jwt && userId) {
      dispatch(
        loginSuccess({
          userId: parseInt(userId, 10),
        })
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation du profil :", error);
    dispatch(logoutSuccess());
  }
};

// ** Fetch User Details **
export const fetchUserDetails = createAsyncThunk(
  "profil/fetchUserDetails",
  async (userId: string, { dispatch }) => {
    dispatch(fetchProfilStart());
    try {
      const response = await API.get(`/users/${userId}`);
      const user: User = response.data;

      dispatch(
        fetchProfilSuccess({ profil_notifications: 0, isLoggedIn: true })
      ); // Update as needed
      return user;
    } catch (error: any) {
      dispatch(
        fetchProfilFailure(error.message || "Failed to fetch user details")
      );
      throw error;
    }
  }
);

// ** Login User **
export const loginUser = createAsyncThunk(
  "profil/login",
  ({ email, password }: { email: string; password: string }, { dispatch }) => {
    dispatch(fetchProfilStart());
    // First API call: Authenticate and get JWT token
    API.post("/auth/login", { email, password })
      .then((loginResponse) => {
        const token = loginResponse.data.token;
        const userId = loginResponse.data.userId;
        // Save token to AsyncStorage
        AsyncStorage.setItem("jwt", token).then(() => {
          // Dispatch successful login state
          dispatch(
            fetchProfilSuccess({ profil_notifications: 0, isLoggedIn: true })
          );
          dispatch(fetchUserStart());
        });
        AsyncStorage.setItem("userId",String(userId)).then(() => {
          dispatch(loginSuccess({userId:userId}))
        })
        API.get("/users/" + userId)
          .then((userResponse) => {
            console.log(userResponse.data);
            // Extract the data safely
            const userData = userResponse.data;
            const user: User = {
              id: userId,
              nom: userData.nom,
              prenom: userData.prenom,
              telephone: userData.telephone,
              email: userData.email,
              adresse: userData.adresse,
              password: null,
              photo: userData.photo,
            }
            // Store user details in the state
            dispatch(fetchUserSuccess(user));
            dispatch(loginSuccess(userId));
          })
          .catch((error: AxiosError) => {
            // Handle errors
            console.log(error.message);
            const errorMessage = error.message || "An error occurred";
            dispatch(fetchProfilFailure(errorMessage));
            dispatch(fetchUserFailure(errorMessage));
            console.error(
              "Error during login or fetching user details:",
              error
            );
          });
      })
      
  }
);

// ** Logout User **
export const logoutUser = createAsyncThunk(
  "profil/logout",
  async (_, { dispatch }) => {
    dispatch(fetchProfilStart());
    try {
      // Clear JWT from AsyncStorage
      await AsyncStorage.removeItem("jwt");
      await AsyncStorage.removeItem("userId");

      dispatch(
        fetchProfilSuccess({ profil_notifications: 0, isLoggedIn: false })
      );
      dispatch(logoutSuccess());
    } catch (error: any) {
      dispatch(fetchProfilFailure(error.message || "Logout failed"));
      throw error;
    }
  }
);
