import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import CategoryNav from "../components/CategoryNav";
import MenuPizza from "./Menupizza";
import MenuMyDominosBox from "./MenuMydominosBox";
import Meltzz from "./Meltzz";
import SnacksSides from "./SnacksSides";
import ChickenSides from "./ChickenSides";
import Drinks from "./Drinks";
import Dessert from "./Dessert";
import MenuFooter from "../components/MenuFooter"; // Import the MenuFooter component

const MenuScreen = () => {
  const selectedMainCategory = useSelector(
    (state) => state.category.selectedMainCategory
  ) || "Pizza"; // ✅ Fallback to "Pizza" if undefined

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <CategoryNav />

      {/* 🔥 Render the correct category */}
      {selectedMainCategory === "Pizza" && <MenuPizza />}
      {selectedMainCategory === "My Domino's Box" && <MenuMyDominosBox />}
      {selectedMainCategory === "Meltzz" && <Meltzz />}
      {selectedMainCategory === "Snacks & Sides" && <SnacksSides />}
      {selectedMainCategory === "Chicken" && <ChickenSides />}
      {selectedMainCategory === "Drinks" && <Drinks />}
      {selectedMainCategory === "Desserts" && <Dessert />}

      {/* ✅ Optional: Show a message if category is missing */}
      {!selectedMainCategory && (
        <p className="text-center text-red-500">No category selected.</p>
      )}
      {/* Footer */}
      <MenuFooter />
    </div>
  );
};

export default MenuScreen;
