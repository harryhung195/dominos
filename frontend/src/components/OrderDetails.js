import React from "react";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close order details"
        >
          &times;
        </button>
        <h4 className="font-bold mb-4 text-lg text-red-600 border-b pb-2">Order Details</h4>
        <div className="mb-2 text-xs text-gray-500">Order ID: <span className="font-mono">{order._id}</span></div>
        <div className="mb-2 text-sm">Placed: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span></div>
        <div className="mb-2 text-sm">Status: <span className="font-semibold text-blue-600">{order.orderStatus || "Pending"}</span></div>
        <div className="mb-2 text-sm">Total: <span className="font-semibold text-green-600">${order.totalPrice?.toFixed(2) || "-"}</span></div>
        <div className="mb-2 text-sm font-semibold">Items:</div>
        <ul className="list-disc list-inside ml-4 mb-2 max-h-32 overflow-y-auto">
          {order.cartItems?.map((item, idx) => (
            <li key={idx} className="mb-1 flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <span className="text-xs text-gray-500">x{item.quantity}</span>
              <span className="text-xs text-gray-700">${item.price?.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        {order.address && (
          <div className="mt-2 text-xs text-gray-500 border-t pt-2">Delivery: {order.address}</div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
