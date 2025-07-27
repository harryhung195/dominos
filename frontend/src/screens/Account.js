import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";
import { fetchOrders } from "../actions/orderAction";
import OrderDetails from "../components/OrderDetails";

const Account = () => {
  const { userId, username, email } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    } else {
      dispatch(fetchOrders());
    }
  }, [userId, navigate, dispatch]);

  if (!userId) return null;

  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center py-12 px-2">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-2 text-red-600 tracking-tight">
          My Account
        </h2>
        <p className="mb-1 text-gray-700">
          Email:{" "}
          <span className="font-medium">{email}</span>
        </p>
        <p className="mb-4 text-gray-700">
          Name:{" "}
          <span className="font-medium">{username}</span>
        </p>
        <button
          className="mb-8 bg-red-600 hover:bg-red-700 transition text-white px-6 py-2 rounded-full shadow"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <div className="mt-4 text-left">
          <h3 className="text-2xl font-bold mb-4 text-blue-700">
            Order History
          </h3>
          {loading && <p>Loading orders...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {orders && orders.length === 0 && (
            <p className="text-gray-400">No orders found.</p>
          )}
          {orders && orders.length > 0 && (
            <ul className="divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
              {orders
                .filter((order) => order.user && order.user._id === userId)
                .map((order) => (
                  <li
                    key={order._id}
                    className="py-5 px-4 bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-white cursor-pointer transition flex justify-between items-center"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div>
                      <div className="font-bold text-lg text-gray-800">
                        Order #{order._id.slice(-6)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                      <div className="text-sm mt-1">
                        Status:{" "}
                        <span className="font-medium text-blue-600">
                          {order.orderStatus || "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600 text-lg">
                        ${order.totalPrice?.toFixed(2) || "-"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.cartItems?.length || 0} items
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          {selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
