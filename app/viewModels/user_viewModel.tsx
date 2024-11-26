import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { User } from '../models/user.model';
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
} from '../store/slices/profilSlice';

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

  const updateUser = async (id: string, updatedUser: Partial<User>) => {
    dispatch(updateUserStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id}`, {
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
      dispatch(updateUserSuccess({ id: id, updatedUser: updated }));
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

  const deleteUser = async (id: string) => {
    dispatch(deleteUserStart());
    try {
      const response = await fetch(`${apiBaseUrl}/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch(deleteUserSuccess(id));
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

  const getUserById = (id: string) => {
    return users.find(user => user.id === id) || null;
  };

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById,  
  };
};

export default useUserViewModel;