import { FETCH_STORES_SUCCESS, FETCH_STORES_FAILURE, ADD_STORE_SUCCESS, DELETE_STORE_SUCCESS } from "../actions/storeAction";

const initialState = {
  stores: [],
  error: null,
};

export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORES_SUCCESS:
      return { ...state, stores: action.payload, error: null };
    case FETCH_STORES_FAILURE:
      return { ...state, error: action.payload };
      case ADD_STORE_SUCCESS:
      return { ...state, stores: [...state.stores, action.payload] };
      case DELETE_STORE_SUCCESS:
        return { ...state, stores: state.stores.filter((store) => store._id !== action.payload) };
    default:
      return state;
  }
};
