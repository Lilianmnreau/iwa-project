// articleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../models/article.model';

interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  adding: boolean;
  updating: boolean;
  deleting: boolean;
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
  adding: false,
  updating: false,
  deleting: false,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    fetchArticlesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArticlesSuccess(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
      state.loading = false;
    },
    fetchArticlesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addArticleStart(state) {
      state.adding = true;
      state.error = null;
    },
    addArticleSuccess(state, action: PayloadAction<Article>) {
      state.articles.push(action.payload);
      state.adding = false;
    },
    addArticleFailure(state, action: PayloadAction<string>) {
      state.adding = false;
      state.error = action.payload;
    },
    updateArticleStart(state) {
      state.updating = true;
      state.error = null;
    },
    updateArticleSuccess(state, action: PayloadAction<{ id: string; updatedArticle: Article }>) {
      const index = state.articles.findIndex(article => article.id_article === action.payload.id);
      if (index !== -1) {
        state.articles[index] = action.payload.updatedArticle;
      }
      state.updating = false;
    },
    updateArticleFailure(state, action: PayloadAction<string>) {
      state.updating = false;
      state.error = action.payload;
    },
    deleteArticleStart(state) {
      state.deleting = true;
      state.error = null;
    },
    deleteArticleSuccess(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter(article => article.id_article !== action.payload);
      state.deleting = false;
    },
    deleteArticleFailure(state, action: PayloadAction<string>) {
      state.deleting = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = articleSlice.actions;

export default articleSlice.reducer;