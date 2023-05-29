import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slice/formSlice';
import tableFormSlice from './slice/tableFormSlice';

// const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
//   const result = next(action);
//   localStorage.setItem('swiftDynamicState', JSON.stringify(store.getState()));
//   return result;
// };

// const cacheState = localStorage.getItem('swiftDynamicState')
//   ? JSON.parse(localStorage.getItem('swiftDynamicState')!)
//   : {};

export const store = configureStore({
  reducer: {
    form: formSlice,
    tableForm: tableFormSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  // preloadedState: cacheState,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
