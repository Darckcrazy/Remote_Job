import {
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CLEAR_JOBS,
} from "./actionTypes";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_JOBS:
      return {
        ...state,
        jobs: [],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default searchResultsReducer;
