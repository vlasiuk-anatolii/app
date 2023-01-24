import {
  configureStore,
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import {
  getUsers,
  getPosts,
  getAlbums,
} from '../api/api';

const initialState = {
  users: [],
  posts: [],
  albums: [],
  isLoading: false,
  currentUserId: null,
  isOpenModal: false,
};

export const loadUsers = createAsyncThunk('SET_USERS', async () => {
  const usersFromServer = await getUsers();
  return usersFromServer;
});

export const loadPosts = createAsyncThunk('SET_POSTS', async () => {
  const postsFromServer = await getPosts();
  return postsFromServer;
});

export const loadAlbums = createAsyncThunk('SET_ALBUMS', async () => {
  const albumsFromServer = await getAlbums();
  return albumsFromServer;
});

export const setCurrentUserId = createAction('SET_CURRENT_USER_ID');
export const setIsOpenModal = createAction('SET_IS_OPEN_MODAL');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadUsers.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(loadUsers.fulfilled, (state, action) => {
    state.users = action.payload;
    state.isLoading = false;
  });

  builder.addCase(loadPosts.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(loadPosts.fulfilled, (state, action) => {
    state.posts = action.payload;
    state.isLoading = false;
  });

  builder.addCase(loadAlbums.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(loadAlbums.fulfilled, (state, action) => {
    state.albums = action.payload;
    state.isLoading = false;
  });

  builder.addCase(setCurrentUserId, (state, action) => {
    state.currentUserId = action.payload;
  });

  builder.addCase(setIsOpenModal, (state, action) => {
    state.isOpenModal = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
