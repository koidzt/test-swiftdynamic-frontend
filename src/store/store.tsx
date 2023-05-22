import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slice/formSlice';

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  localStorage.setItem('formState', JSON.stringify(store.getState()));
  return result;
};

const cacheState = localStorage.getItem('formState') ? JSON.parse(localStorage.getItem('formState')!) : {};

export const store = configureStore({
  reducer: {
    form: formSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: cacheState,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
