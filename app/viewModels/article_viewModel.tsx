import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Article } from '../models/article.model';
import { RootState } from '../store';
import {
  fetchArticlesStart,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  addArticleStart,
  addArticleSuccess,
  addArticleFailure,
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailure,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailure,
} from '../store/articleSlice';

const useArticleViewModel = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.article.articles);
  const loading = useSelector((state: RootState) => state.article.loading);
  const adding = useSelector((state: RootState) => state.article.adding);
  const updating = useSelector((state: RootState) => state.article.updating);
  const deleting = useSelector((state: RootState) => state.article.deleting);
  const error = useSelector((state: RootState) => state.article.error);
  const apiBaseUrl = process.env.REACT_APP_ARTICLE_API_BASE_URL;

  useEffect(() => {
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
      }
    };

    fetchArticles();
  }, [dispatch, apiBaseUrl]);

  const addNewArticle = async (newArticle: Article) => {
    dispatch(addArticleStart());
    try {
      const response = await fetch(`${apiBaseUrl}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const addedArticle = await response.json();
      dispatch(addArticleSuccess(addedArticle));
    } catch (error) {
      console.error('Failed to add article:', error);
      dispatch(addArticleFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de l\'ajout de l\'article',
        text2: (error as Error).message,
      });
    }
  };

  const updateExistingArticle = async (id_article: string, updatedArticle: Partial<Article>) => {
    dispatch(updateArticleStart());
    try {
      const response = await fetch(`${apiBaseUrl}/articles/${id_article}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArticle),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updated = await response.json();
      dispatch(updateArticleSuccess({ id: id_article, updatedArticle: updated }));
    } catch (error) {
      console.error('Failed to update article:', error);
      dispatch(updateArticleFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la mise à jour de l\'article',
        text2: (error as Error).message,
      });
    }
  };

  const deleteExistingArticle = async (id_article: string) => {
    dispatch(deleteArticleStart());
    try {
      const response = await fetch(`${apiBaseUrl}/articles/${id_article}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch(deleteArticleSuccess(id_article));
    } catch (error) {
      console.error('Failed to delete article:', error);
      dispatch(deleteArticleFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la suppression de l\'article',
        text2: (error as Error).message,
      });
    }
  };

  const getArticleById = (id_article: string) => {
    return articles.find(article => article.id_article === id_article) || null;
  };

  return {
    articles,
    loading,
    adding,
    updating,
    deleting,
    error,
    addNewArticle,
    updateExistingArticle,
    deleteExistingArticle,
    getArticleById,
  };
};

export default useArticleViewModel;