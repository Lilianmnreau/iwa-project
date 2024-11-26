import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../utils/api"; 
import {
  fetchProfilStart,
  fetchProfilSuccess,
  fetchProfilFailure,
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  loginSuccess,
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
    console.log("Request to API");

    // First API call: Authenticate and get JWT token
    API.post("/auth/login", { email, password })
      .then((loginResponse) => {
        const { token, userId } = loginResponse.data;

        // Save token to AsyncStorage
        return AsyncStorage.setItem("jwt", token).then(() => {
          // Dispatch successful login state
          dispatch(fetchProfilSuccess({ profil_notifications: 0, isLoggedIn: true }));
          dispatch(fetchUsersStart());

          // Second API call: Fetch user details
          return API.get(`/users/${userId}`);
        });
      })
      .then((userResponse) => {
        const userDetails = userResponse.data;

        // Store user details in the state
        dispatch(fetchUsersSuccess([userDetails])); // Assuming we store user details as an array
        dispatch(loginSuccess());
      })
      .catch((error : AxiosError) => {
        // Handle errors
        console.log(error.response)
        const errorMessage = error.message || "An error occurred";
        dispatch(fetchProfilFailure(errorMessage));
        dispatch(fetchUsersFailure(errorMessage));
        console.error("Error during login or fetching user details:", error);
      });
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

      dispatch(
        fetchProfilSuccess({ profil_notifications: 0, isLoggedIn: false })
      );
    } catch (error: any) {
      dispatch(fetchProfilFailure(error.message || "Logout failed"));
      throw error;
    }
  }
);
