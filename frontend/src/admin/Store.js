import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores, addStore, deleteStore } from "../actions/storeAction";
import MyMap from "../components/MyMap";

const StoreAdmin = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const { userInfo } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleAddStore = useCallback(() => {
    if (!name || !address || !lat || !lng) {
      setNotification({ type: "error", message: "All fields are required!" });
      return;
    }
    if (isNaN(lat) || isNaN(lng)) {
      setNotification({ type: "error", message: "Latitude and Longitude must be numbers!" });
      return;
    }

    setIsAdding(true);
    dispatch(addStore({ name, address, lat: parseFloat(lat), lng: parseFloat(lng) }))
      .then(() => {
        setNotification({ type: "success", message: "Store added successfully!" });
        setName("");
        setAddress("");
        setLat("");
        setLng("");
      })
      .catch(() => setNotification({ type: "error", message: "Failed to add store" }))
      .finally(() => setIsAdding(false));
  }, [dispatch, name, address, lat, lng]);

  const handleDeleteStore = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      dispatch(deleteStore(id))
        .then(() => setNotification({ type: "success", message: "Store deleted successfully!" }))
        .catch(() => setNotification({ type: "error", message: "Failed to delete store" }));
    }
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading stores...</p>;
  if (error) return <p className="text-center text-red-500">Error loading stores!</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Stores</h1>
      {notification && (
        <div className={`mb-4 p-3 rounded text-center font-semibold ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {notification.message}
        </div>
      )}

      {/* ✅ Admin Only: Add Store */}
      {userInfo?.isAdmin && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Add a New Store</h2>
          <input type="text" placeholder="Store Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded w-full mb-2" />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="p-2 border rounded w-full mb-2" />
          <input type="text" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} className="p-2 border rounded w-full mb-2" />
          <input type="text" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} className="p-2 border rounded w-full mb-2" />
          {/* Map Preview */}
          {lat && lng && !isNaN(lat) && !isNaN(lng) && (
            <div className="mb-2">
              <MyMap center={{ lat: parseFloat(lat), lng: parseFloat(lng) }} markers={[{ lat: parseFloat(lat), lng: parseFloat(lng) }]} />
            </div>
          )}
          <button 
            onClick={handleAddStore} 
            className="bg-green-500 text-white p-2 rounded w-full disabled:bg-gray-400"
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add Store"}
          </button>
        </div>
      )}

      {/* ✅ Store List */}
      <h2 className="text-xl font-bold mb-2">Store List</h2>
      <ul>
        {stores.map((store) => (
          <li key={store._id} className="p-2 border-b flex justify-between items-center bg-white rounded shadow mb-2">
            <div>
              <h3 className="font-bold">{store.name}</h3>
              <p>{store.address}</p>
            </div>
            {/* Always show delete button for testing */}
            <button 
              onClick={() => handleDeleteStore(store._id)} 
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreAdmin;
