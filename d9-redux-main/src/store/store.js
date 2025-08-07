import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesReducer";
import searchResultsReducer from "./searchResultsReducer";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    searchResults: searchResultsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "FETCH_JOBS_START",
          "FETCH_JOBS_SUCCESS",
          "FETCH_JOBS_FAILURE",
        ],
      },
    }),
});
