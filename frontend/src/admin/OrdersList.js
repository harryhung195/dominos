import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus, approveOrder, deleteOrder, cancelOrder } from "../actions/orderAction";

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, updatingOrderId } = useSelector((state) => state.order);
const [selectedOrders, setSelectedOrders]= useState([])
  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders once when component mounts
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchOrders()); // Manually refresh orders
  };

const handleSelectOrder = (orderId)=> {
  setSelectedOrders((prev)=> 
  prev.includes(orderId) ? prev.filter((id)=> id !== orderId) : [...prev, orderId]
  )
}

const handleSelectAll = () => {
  setSelectedOrders(selectedOrders.length === orders.length ? [] : orders.map((order)=> order._id));
}

const handleBulkUpdate = () => {
  selectedOrders.forEach((orderId) => {
    const order = orders.find((o) => o._id === orderId);
    if (order) dispatch(updateOrderStatus(orderId, getNextStatus(order.orderStatus)));
  });
  setSelectedOrders([]); // Clear selection after updating
};
const handleBulkApprove = () => {
  selectedOrders.forEach((orderId) => dispatch(approveOrder(orderId)));
  setSelectedOrders([]);
};

const handleBulkCancel = async () => {
  await Promise.all(selectedOrders.map(async (orderId) => {
    await dispatch(cancelOrder(orderId));
  }));
  setSelectedOrders([]);
  dispatch(fetchOrders()); // Refresh orders after updating
};
const handleBulkDelete = () => {
  selectedOrders.forEach((orderId) => dispatch(deleteOrder(orderId)));
  setSelectedOrders([]);
};

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Cooking Pending": return "Cooking";
      case "Cooking": return "Out for Delivery";
      case "Out for Delivery": return "Delivered";
      default: return "Cooking Pending"; 
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Cooking Pending": return "text-orange-600";
      case "Approved": return "text-green-600";
      case "Cancelled": return "text-red-600";
      case "Cooking": return "text-yellow-600";
      case "Out for Delivery": return "text-blue-600";
      case "Delivered": return "text-green-600";
      default: return "text-red-600";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Order List</h2>

      <div className="flex justify-end mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Orders 🔄"}

        </button>
        {selectedOrders.length > 0 && (
          <div className="space-x-2">
            <button 
              className="px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={handleBulkUpdate}
              disabled={loading}
            >
              Update Status
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleBulkCancel}
              disabled={loading}
            >
              Cancel Selected ❌
            </button>
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleBulkApprove}
              disabled={loading}
            >
              Approve Selected
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleBulkDelete}
              disabled={loading}
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200">
              <th className="border p-2">
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.length === orders.length}
                    onChange={handleSelectAll}
                  />
                </th>
              <th className="border p-2">Items</th>

                <th className="border p-2">Order ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                   <td className="border p-2">
                    <input 
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleSelectOrder(order._id)}
                    />
                  </td>
                   <td className="border p-2">
                  
            {order.items?.map((item) => `${item.name} (x${item.quantity})`).join(", ") || "N/A"}

                    </td>
                  
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">{order.name}</td>
                  <td className="border p-2">{order.email}</td>
                 
                  <td className="border p-2">${order.orderAmount.toFixed(2)}</td>
                  <td className="border p-2">{order.createdAt.substring(0, 10)}</td>
                  <td className={`border p-2 font-semibold ${getStatusClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </td>
                  <td className="border p-2">
                    <div className="flex flex-col space-y-2">
                      {order.orderStatus !== "Delivered" && (
                        <button 
                          className="px-4 py-2 bg-blue-500 text-white rounded"
                          onClick={() => dispatch(updateOrderStatus(order._id, getNextStatus(order.orderStatus)))}
                          disabled={updatingOrderId === order._id}
                        >
                          {updatingOrderId === order._id ? "Updating..." : `Set to ${getNextStatus(order.orderStatus)}`}
                        </button>
                      )}
                      <button 
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => dispatch(approveOrder(order._id))}
                        disabled={loading}
                      >
                        {loading ? "Approving..." : "Approve"}
                      </button>
                      <button 
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => dispatch(deleteOrder(order._id))}
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
