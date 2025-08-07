import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./actionTypes";

const initialState = {
  companies: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES: {
      const company = action.payload;
      if (!state.companies.find((c) => c.name === company.name)) {
        return {
          ...state,
          companies: [...state.companies, company],
        };
      }
      return state;
    }

    case REMOVE_FROM_FAVORITES: {
      const companyName = action.payload;
      return {
        ...state,
        companies: state.companies.filter((c) => c.name !== companyName),
      };
    }

    default:
      return state;
  }
};

export default favoritesReducer;
