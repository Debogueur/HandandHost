import { configureStore } from "@reduxjs/toolkit";
import Reducer from './Redux/Reducers/Index';

const store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;