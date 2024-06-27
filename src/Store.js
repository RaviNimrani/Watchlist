import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "./Redux";

export const store = configureStore({
  reducer: {
    movies: movieReducer, // Add your slice reducer to the store
  },
});
