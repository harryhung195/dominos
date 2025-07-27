import {
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  FETCH_ORDER_STATUS_REQUEST,
  FETCH_ORDER_STATUS_SUCCESS,
  FETCH_ORDER_STATUS_FAIL,
  APPROVE_ORDER_REQUEST,
  APPROVE_ORDER_SUCCESS,
  APPROVE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ADD_NEW_ORDER, // ✅ Added this to constants
  ORDER_ERROR,
   CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE
} from "../constants/orderConstants";

const initialState = {
  orders: [],
  lastOrder: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ORDER_REQUEST:
    case FETCH_ORDERS_REQUEST:
    case UPDATE_ORDER_REQUEST:
    case FETCH_ORDER_STATUS_REQUEST:
    case APPROVE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      case CANCEL_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case SAVE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        lastOrder: action.payload,
        orders: [...state.orders, action.payload], // ✅ Append new order
        error: null,
      };

    case FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case UPDATE_ORDER_SUCCESS:
    case APPROVE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case FETCH_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        lastOrder:
          state.lastOrder && state.lastOrder._id === action.payload._id
            ? { ...state.lastOrder, orderStatus: action.payload.orderStatus }
            : state.lastOrder, // ✅ Preserve last order if it's a different one
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
      case CANCEL_ORDER_SUCCESS:
        return {
          ...state,
          updatingOrderId: null,
          orders: state.orders.map(order =>
            order._id === action.payload._id ? action.payload : order
          )
        };

    case ADD_NEW_ORDER: // ✅ Combined from addReducer
      return {
        ...state,
        orders: [...state.orders, action.payload], // ✅ Append new order
      };

    case ORDER_ERROR:
    case SAVE_ORDER_FAIL:
    case FETCH_ORDERS_FAIL:
    case UPDATE_ORDER_FAIL:
    case FETCH_ORDER_STATUS_FAIL:
    case APPROVE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
      case CANCEL_ORDER_FAILURE:
        return { ...state, updatingOrderId: null, error: action.payload };
    default:
      return state;
  }
};
