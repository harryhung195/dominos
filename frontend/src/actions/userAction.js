import axios from "axios";
import { 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
  USER_LOGOUT,  GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
  UPDATE_USER_ROLE,  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL 
} from "../constants/userConstants";

// ✅ REGISTER USER
export const registerUser = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post("/api/users/register", { name, email, password });

    if (data.message === "User already registered") {
      dispatch({ type: USER_REGISTER_FAIL, payload: "User already registered" });
    } else {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      alert("Registration successful! You can now login."); 
      // Store user in localStorage only if registration is successful
      localStorage.setItem("currentUser", JSON.stringify(data));
      window.location.href = "/signin";
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });
    alert("Registration failed!"); 
  } 
};




export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    console.log("Sending login request with:", user); // Debugging

    const { data } = await axios.post("/api/users/login", user, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Login response:", data); // Debugging

    if (data && data._id) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      alert("Login successful!"); 
      localStorage.setItem("currentUser", JSON.stringify(data));
      window.location.href = "/menu";
    } else {
      dispatch({ type: USER_LOGIN_FAIL, payload: "Invalid login response" });
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message); // Debugging
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message || "Login failed",
    });
  }
};

// ✅ LOGOUT USER
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  dispatch({ type: USER_LOGOUT });
  window.location.href = "/signin";
};



export const getAllUsers = () => async dispatch => {
  try {
    dispatch({ type: GET_USERS_REQUEST }); // Notify request started

    const { data } = await axios.get("/api/users/getallusers"); // Fetch data
    console.log("Users received from API:", data); // Debugging

    dispatch({ type: GET_USERS_SUCCESS, payload: data });

  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    
    dispatch({
      type: GET_USERS_FAIL,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


// Delete user
export const deleteUser = (userId) => async (dispatch) => {
  try {
      dispatch({ type: DELETE_USER_REQUEST });

      await axios.post("/api/users/deleteuser", { userid: userId });

      dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
      dispatch({
          type: DELETE_USER_FAIL,
          payload: error.response?.data?.message || "Failed to delete user",
      });
  }
};

export const updateUserRole = (userId, newRole) => async (dispatch) => {
  try {
    // Make an API call to update user role (assuming you have this endpoint)
    const response = await fetch(`/api/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role: newRole }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to update role');

    const updatedUser = await response.json();
    dispatch({
      type: UPDATE_USER_ROLE,
      payload: updatedUser,
    });
  } catch (error) {
    console.error(error);
  }
};


// ✅ GET USER DETAILS ACTION
export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/users/${userId}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch user details",
    });
  }
};
