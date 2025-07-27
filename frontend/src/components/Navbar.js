import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMainCategory } from "../actions/categoryActions";
import { logoutUser } from "../actions/userAction"; // Import logout action

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedMainCategory = useSelector((state) => state.category.selectedMainCategory);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user) || JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action
  };

  const mainCategories = [
    "Pizza",
    "My Domino's Box",
    "Meltzz",
    "Snacks & Sides",
    "Chicken",
    "Drinks",
    "Desserts",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className={`bg-white text-black py-3 px-6 flex justify-between items-center transition-all ${
        scrolled ? "shadow-lg sticky top-0 z-50" : "shadow-md"
      }`}>
        <div className="text-2xl font-bold">
          <Link to="/">Domino's</Link>
        </div>

        <div className="flex space-x-6">
          <Link to="/menu" className="hover:text-red-600">Menu</Link>
          <Link to="/offers" className="hover:text-red-600">Offers</Link>
          <Link to="/stores" className="hover:text-red-600">Stores</Link>
          <Link to="/get-the-app" className="hover:text-red-600">Get the App</Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Cart Display */}
          <Link to="/cart" className="relative hover:text-red-600">
            Cart 🛒
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/account" className="hover:text-red-600">My Account</Link>
          )}
        </div>
      </nav>

      {/* Main Category Navigation */}
      <div className="bg-red-600 text-white py-2 flex justify-center gap-4">
        {mainCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedMainCategory === category ? "bg-white text-red-600" : "bg-red-500 hover:bg-red-400"
            }`}
            onClick={() => dispatch(setSelectedMainCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
