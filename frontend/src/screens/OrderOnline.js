import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../actions/menuAction";
import { addToCart } from "../actions/cartAction";
import CategoryNav from "../components/CategoryNav";
import Navbar from "../components/Navbar";

const OrderOnline = () => {
  const dispatch = useDispatch();
  const { menuItems, loading, error } = useSelector((state) => state.menu);
  
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <CategoryNav />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Order Online</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="bg-white p-4 shadow rounded-lg">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
              <h2 className="text-xl font-semibold mt-2">{item.desc}</h2>
              <p className="text-gray-700">${item.price.toFixed(2)}</p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleAddToCart(item)}
              >
              Order Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderOnline;
