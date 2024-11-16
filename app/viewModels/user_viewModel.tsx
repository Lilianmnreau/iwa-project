import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { User } from '../models/user.model';
import { Emplacement } from '../models/emplacement_model';
import { RootState } from '../store';
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  addEmplacementStart,
  addEmplacementSuccess,
  addEmplacementFailure,
  updateEmplacementStart,
  updateEmplacementSuccess,
  updateEmplacementFailure,
  deleteEmplacementStart,
  deleteEmplacementSuccess,
  deleteEmplacementFailure,
  addFavoriteEmplacementStart,
  addFavoriteEmplacementSuccess,
  addFavoriteEmplacementFailure,
  removeFavoriteEmplacementStart,
  removeFavoriteEmplacementSuccess,
  removeFavoriteEmplacementFailure,
} from '../store/profilSlice';

const useUserViewModel = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.profil.users);
  const loading = useSelector((state: RootState) => state.profil.loading);
  const error = useSelector((state: RootState) => state.profil.error);
  const apiBaseUrl = process.env.REACT_APP_USER_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersStart());
      try {
        const response = await fetch(`${apiBaseUrl}/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        dispatch(fetchUsersSuccess(data));
      } catch (error) {
        dispatch(fetchUsersFailure((error as Error).message));
      }
    };

    fetchUsers();
  }, [dispatch, apiBaseUrl]);

  const addUser = async (newUser: User) => {
    dispatch(addUserStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const addedUser = await response.json();
      dispatch(addUserSuccess(addedUser));
    } catch (error) {
      console.error('Failed to add user:', error);
      dispatch(addUserFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de l\'ajout de l\'utilisateur',
        text2: (error as Error).message,
      });
    }
  };

  const updateUser = async (id_user: string, updatedUser: Partial<User>) => {
    dispatch(updateUserStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id_user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updated = await response.json();
      dispatch(updateUserSuccess({ id: id_user, updatedUser: updated }));
    } catch (error) {
      console.error('Failed to update user:', error);
      dispatch(updateUserFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la mise à jour de l\'utilisateur',
        text2: (error as Error).message,
      });
    }
  };

  const deleteUser = async (id_user: string) => {
    dispatch(deleteUserStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id_user}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch(deleteUserSuccess(id_user));
    } catch (error) {
      console.error('Failed to delete user:', error);
      dispatch(deleteUserFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la suppression de l\'utilisateur',
        text2: (error as Error).message,
      });
    }
  };

  const addEmplacement = async (id_user: string, newEmplacement: Emplacement) => {
    dispatch(addEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id_user}/emplacements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmplacement),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const addedEmplacement = await response.json();
      dispatch(addEmplacementSuccess({ id_user, emplacement: addedEmplacement }));
    } catch (error) {
      console.error('Failed to add emplacement:', error);
      dispatch(addEmplacementFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de l\'ajout de l\'emplacement',
        text2: (error as Error).message,
      });
    }
  };

  const updateEmplacement = async (id_user: string, id_emplacement: string, updatedEmplacement: Partial<Emplacement>) => {
    dispatch(updateEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id_user}/emplacements/${id_emplacement}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmplacement),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updated = await response.json();
      dispatch(updateEmplacementSuccess({ id_user, id_emplacement, updatedEmplacement: updated }));
    } catch (error) {
      console.error('Failed to update emplacement:', error);
      dispatch(updateEmplacementFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la mise à jour de l\'emplacement',
        text2: (error as Error).message,
      });
    }
  };

  const deleteEmplacement = async (id_user: string, id_emplacement: string) => {
    dispatch(deleteEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id_user}/emplacements/${id_emplacement}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch(deleteEmplacementSuccess({ id_user, id_emplacement }));
    } catch (error) {
      console.error('Failed to delete emplacement:', error);
      dispatch(deleteEmplacementFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la suppression de l\'emplacement',
        text2: (error as Error).message,
      });
    }
  };

  const addFavoriteEmplacement = async (id_user: string, newEmplacement: Emplacement) => {
    dispatch(addFavoriteEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id_user}/favorite-emplacements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmplacement),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const addedFavorite = await response.json();
      dispatch(addFavoriteEmplacementSuccess({ id_user, emplacement: addedFavorite }));
    } catch (error) {
      console.error('Failed to add favorite emplacement:', error);
      dispatch(addFavoriteEmplacementFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de l\'ajout de l\'emplacement favori',
        text2: (error as Error).message,
      });
    }
  };

  const removeFavoriteEmplacement = async (id_user: string, id_emplacement: string) => {
    dispatch(removeFavoriteEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id_user}/favorite-emplacements/${id_emplacement}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch(removeFavoriteEmplacementSuccess({ id_user, id_emplacement }));
    } catch (error) {
      console.error('Failed to remove favorite emplacement:', error);
      dispatch(removeFavoriteEmplacementFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la suppression de l\'emplacement favori',
        text2: (error as Error).message,
      });
    }
  };

  const getUserById = (id_user: string) => {
    return users.find(user => user.id_user === id_user) || null;
  };

  const getEmplacementsByUser = (id_user: string) => {
    const user = getUserById(id_user);
    return user?.emplacements || [];
  };

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    addEmplacement,
    updateEmplacement,
    deleteEmplacement,
    getEmplacementsByUser,
    addFavoriteEmplacement,
    removeFavoriteEmplacement,
  };
};

export default useUserViewModel;