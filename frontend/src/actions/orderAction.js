import axios from "axios";
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
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE

} from "../constants/orderConstants";

const API_URL = "https://dominos-bnqh.onrender.com/api/orders";

// ✅ Save Order
export const saveOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_ORDER_REQUEST });

    // 🛑 Prevent duplicate transactions
    const { order } = getState().order;
    if (order && order.transactionId === orderData.transactionId) {
      throw new Error("Order already exists for this transaction");
    }

    const { data } = await axios.post(API_URL, orderData);

    dispatch({ type: SAVE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SAVE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Fetch All Orders (Admin)
export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDERS_REQUEST });

    const { data } = await axios.get(API_URL);

    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload: error.response?.data?.message || "Error fetching orders",
    });
  }
};

// ✅ Update Order Status (Admin)
export const updateOrderStatus = (orderId, newStatus) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const { data } = await axios.patch(`${API_URL}/${orderId}/update`, {
      orderStatus: newStatus, // ✅ Fix: Send new status in request body
    });

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response?.data?.message || "Error updating order status",
    });
  }
};

// ✅ Fetch Order Status (User)
export const fetchOrderStatus = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDER_STATUS_REQUEST });

    const { data } = await axios.get(`${API_URL}/status/${orderId}`);

    dispatch({
      type: FETCH_ORDER_STATUS_SUCCESS,
      payload: {
        ...data,
        orderStatus: data.orderStatus ?? "Cooking Pending", // ✅ Default to "Cooking Pending"
      },
    });
  } catch (error) {
    console.error("❌ Error fetching order status:", error);

    dispatch({
      type: FETCH_ORDER_STATUS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch order status",
    });
  }
};

// ✅ Approve Order
export const approveOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: APPROVE_ORDER_REQUEST });

    const { data } = await axios.patch(`${API_URL}/${orderId}/approve`);

    dispatch({ type: APPROVE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: APPROVE_ORDER_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};

// ✅ Delete Order
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    await axios.delete(`${API_URL}/${orderId}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
    alert("Delete success")
  } catch (error) {
    dispatch({ 
      type: DELETE_ORDER_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};

// ✅ Fetch Specific Order (for multiple order support)
export const addNewOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDER_STATUS_REQUEST }); // ✅ Fix action type

    const { data } = await axios.get(`${API_URL}/${orderId}`);

    dispatch({ type: FETCH_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_STATUS_FAIL,
      payload: "Failed to fetch order status",
    });
  }
};


// Cancel order
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST, payload: orderId });

    const { data } = await axios.put(`/api/orders/${orderId}/cancel`);

    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.response?.data?.message || "Error cancelling order" });
  }
};


