import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem, resetMenuSuccess } from "../actions/menuAction";

const AddMenuItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    image: "",
    price: "",
    category: "",
  });

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.menu);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMenuItem(formData));
  };

  // Reset form and success message
  useEffect(() => {
    if (success) {
      setFormData({ name: "", desc: "", image: "", price: "", category: "" });

      setTimeout(() => {
        dispatch(resetMenuSuccess());
      }, 2000);
    }
  }, [success, dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Menu Item</h2>
      {loading && <p className="text-blue-500">Adding menu item...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Menu item added successfully!</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" className="border p-2" required />
        <input type="text" name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" className="border p-2" required />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="border p-2" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;
