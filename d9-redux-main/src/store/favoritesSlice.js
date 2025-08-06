import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    companies: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const company = action.payload;
      if (!state.companies.find((c) => c.name === company.name)) {
        state.companies.push(company);
      }
    },
    removeFromFavorites: (state, action) => {
      const companyName = action.payload;
      state.companies = state.companies.filter((c) => c.name !== companyName);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
