import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { User } from "../models/user.model";
import { RootState } from "../store";
import API from "../utils/api";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../store/slices/profilSlice";

const useUserViewModel = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profil.user);
  const loading = useSelector((state: RootState) => state.profil.loading);
  const userId = useSelector((state: RootState) =>state.profil.userId)
  const error = useSelector((state: RootState) => state.profil.error);


  useEffect(() => {
    
    dispatch(fetchUserStart());
    API.get(`/users/profile`)
      .then((response) => {
        const updated = response.data;
        updated.password = null;
        dispatch(fetchUserSuccess(updated));
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        dispatch(fetchUserFailure(errorMessage));
        Toast.show({
          type: "error",
          text1: "Échec de la mise à jour de l'utilisateur",
          text2: errorMessage,
        });
      });
  }, [userId]);


  const updateUser = async (id: number) => {
    dispatch(updateUserStart());
    const updatedUser = user
    // Remove all the null fields and the id : 
    delete updatedUser.id;
    if (updatedUser.password === null){
      delete updatedUser.password
    }
      API.put(`/users/${id}`, updatedUser).then((response) => {
        const updated = response.data;
        dispatch(fetchUserSuccess(updated));
      }).catch((error) => {
        console.error("Failed to update user:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        dispatch(updateUserFailure(errorMessage));
        Toast.show({
          type: "error",
          text1: "Échec de la mise à jour de l'utilisateur",
          text2: errorMessage,
        });
      })
  };

  const updateUserFields = (updatedFields: Partial<User>) => {
    // Merge the updated fields with the existing user object.
    const updatedUser = { ...user, ...updatedFields };

    // Dispatch the updated user to the store.x
    dispatch(updateUserSuccess({ id: user.id, updatedUser }));
  };

  const deleteUser = async (id: string) => {
    dispatch(deleteUserStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch(deleteUserSuccess(id));
    } catch (error) {
      console.error("Failed to delete user:", error);
      dispatch(deleteUserFailure((error as Error).message));
      Toast.show({
        type: "error",
        text1: "Échec de la suppression de l'utilisateur",
        text2: (error as Error).message,
      });
    }
  };

  return {
    user,
    loading,
    error,
    updateUserFields,
    updateUser,
    deleteUser,
  };
};

export default useUserViewModel;
