import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderStatus } from "../actions/orderAction";
import { clearCart } from "../actions/cartAction"; // Import cart clearing action

const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lastOrder, error } = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lastOrder || !lastOrder._id) {
      navigate("/menu");
      return;
    }
    dispatch(fetchOrderStatus(lastOrder._id));
  }, [dispatch, lastOrder, navigate]);

  const handleRefresh = () => {
    setLoading(true);
    dispatch(fetchOrderStatus(lastOrder._id)).finally(() => setLoading(false));
  };

  const handleNewOrder = () => {
    dispatch(clearCart()); // ✅ Clear the cart
    navigate("/menu"); // ✅ Redirect to the menu
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Cooking Pending":
        return "text-orange-600";
      case "Cooking":
        return "text-yellow-600";
      case "Out for Delivery":
        return "text-blue-600";
      case "Delivered":
        return "text-green-600";
      default:
        return "text-red-600";
    }
  };

  if (!lastOrder) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Order Confirmed! ✅</h2>
        <p className="text-gray-700 text-center">Thank you for your order.</p>

        {loading && <p className="text-blue-600 text-center animate-pulse">Updating order status...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <table className="w-full border-collapse border border-gray-300 text-sm mt-6">
          <thead>
            <tr className="bg-gray-200">
            <th className="border p-1">Items</th>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
            <td className="border p-1">
            {lastOrder?.items?.map((item) => `${item.name} (x${item.quantity})`).join(", ") || "N/A"}
            </td>
              <td className="border p-2">{lastOrder?._id || "N/A"}</td>
              <td className="border p-2">{lastOrder?.name || "Unknown"}</td>
              <td className="border p-2">{lastOrder?.email || "Unknown"}</td>
             
              <td className="border p-2">${lastOrder?.orderAmount?.toFixed(2) || "0.00"}</td>
              <td className="border p-2">{lastOrder?.createdAt?.substring(0, 10) || "N/A"}</td>
              <td className={`border p-2 font-semibold ${getStatusClass(lastOrder?.orderStatus || "Cooking Pending")}`}>
                {lastOrder?.orderStatus || "Cooking Pending"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Buttons */}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh Order Status 🔄"}
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleNewOrder}
          >
            Place Another Order 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
