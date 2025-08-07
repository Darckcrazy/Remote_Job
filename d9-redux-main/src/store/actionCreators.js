import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FETCH_JOBS_START,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CLEAR_JOBS,
} from "./actionTypes";

// Favorites Action Creators
export const addToFavorites = (company) => ({
  type: ADD_TO_FAVORITES,
  payload: company,
});

export const removeFromFavorites = (companyName) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: companyName,
});

// Search Results Action Creators
export const fetchJobsStart = () => ({
  type: FETCH_JOBS_START,
});

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchJobsFailure = (error) => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});

export const clearJobs = () => ({
  type: CLEAR_JOBS,
});

// Async Action Creator for fetching jobs
export const fetchJobs = (searchParams) => {
  return async (dispatch) => {
    dispatch(fetchJobsStart());

    try {
      const { query, category, searchType } = searchParams;
      const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs";

      let url;
      if (searchType === "search") {
        url = `${baseEndpoint}?search=${query}&limit=20`;
      } else {
        url = `${baseEndpoint}?category=${category}&limit=20`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const { data } = await response.json();
        dispatch(fetchJobsSuccess(data));
      } else {
        dispatch(fetchJobsFailure("Error fetching results"));
      }
    } catch (error) {
      dispatch(fetchJobsFailure(error.message || "Network error"));
    }
  };
};
