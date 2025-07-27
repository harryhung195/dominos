import axios from "axios";

export const FETCH_STORES_SUCCESS = "FETCH_STORES_SUCCESS";
export const FETCH_STORES_FAILURE = "FETCH_STORES_FAILURE";
export const ADD_STORE_SUCCESS = "ADD_STORE_SUCCESS";
export const DELETE_STORE_SUCCESS = "DELETE_STORE_SUCCESS";

const API_URL = "http://localhost:5000/api/stores";

// ✅ Fetch stores
export const fetchStores = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_STORES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_STORES_FAILURE, payload: error.message });
  }
};

// ✅ Add store
export const addStore = (storeData) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, storeData);
    dispatch({ type: ADD_STORE_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error adding store:", error.response?.data?.error || error.message);
  }
};

// ✅ Delete store
export const deleteStore = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_STORE_SUCCESS, payload: id });
  } catch (error) {
    console.error("Error deleting store:", error.response?.data?.error || error.message);
  }
};

