import axios from "axios";
import {
  FETCH_MENU_REQUEST,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  ADD_MENU_FAIL,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  DELETE_MENU_FAIL,
  RESET_MENU_SUCCESS,
} from "../constants/menuConstants";

// Fetch menu items
export const fetchMenu = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MENU_REQUEST });

    const { data } = await axios.get("/api/menu"); // Change this to your actual API endpoint

    dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MENU_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// Add a menu item
export const addMenuItem = (menuItem) => async (dispatch) => {
  try {
    dispatch({ type: ADD_MENU_REQUEST });

    const { data } = await axios.post("http://localhost:5000/api/menu", menuItem, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: ADD_MENU_SUCCESS, payload: data });
    alert("ADD MENU SUCCESS")
  } catch (error) {
    dispatch({ type: ADD_MENU_FAIL, payload: error.response?.data?.message || error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MENU_REQUEST });

    await axios.delete(`http://localhost:5000/api/menu/${id}`);// ✅ Correct DELETE request

    dispatch({ type: DELETE_MENU_SUCCESS, payload: { id } });
    alert("DELETE MENU SUCCESS")
  } catch (error) {
    dispatch({
      type: DELETE_MENU_FAIL,
      payload: error.response?.data?.message || "Error deleting menu item",
    });
  }
};


// Reset success message
export const resetMenuSuccess = () => (dispatch) => {
  dispatch({ type: RESET_MENU_SUCCESS });
};

