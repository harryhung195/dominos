import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../actions/menuAction";
import { addToCart } from "../actions/cartAction";

const SnacksSides = () => {
  const dispatch = useDispatch();
  const snacksidesMenu = useSelector((state) => state.menu.snacksidesMenu || []);
  const selectedSubCategory = useSelector((state) => state.category.selectedSubCategory);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const items = snacksidesMenu.filter((item) => item.category === selectedSubCategory);

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold mb-4">{selectedSubCategory}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <h3 className="fw-bold">{item.desc}</h3>
            <p className="text-red-600 font-bold">${item.price}</p>
            <button
              className="mt-2 bg-red-600 text-white px-2 py-2 rounded-lg w-full"
              onClick={() => dispatch(addToCart(item))}
            >
              ORDER NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnacksSides;
