import { 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
  USER_LOGOUT, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_ROLE,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL
} from "../constants/userConstants";

// REGISTER REDUCER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// LOGIN REDUCER
export const userLoginReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { userInfo: null };
    default:
      return state;
  }
};

// USER MANAGEMENT REDUCER (for fetching and deleting users)
const initialState = { users: [], loading: false, error: null };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true };

      case GET_USERS_SUCCESS:
        console.log("GET_USERS_SUCCESS payload:", action.payload); // 🔍 Debugging
        return { ...state, loading: false, users: action.payload };

        case GET_USERS_FAIL:
          return { ...state, loading: false, error: action.payload };

    case DELETE_USER_REQUEST:
      return { ...state, loading: true };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user._id !== action.payload),
      };

    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};



export const updateuserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ROLE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? { ...user, role: action.payload.role } : user
        ),
      };
    default:
      return state;
  }
};


export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

