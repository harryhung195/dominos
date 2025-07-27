import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSubCategory } from "../actions/categoryActions";
import { menuData } from "../components/menuData";

const CategoryNav = () => {
  const dispatch = useDispatch();
  const selectedMainCategory = useSelector((state) => state.category.selectedMainCategory);
  const selectedSubCategory = useSelector((state) => state.category.selectedSubCategory);
  const subCategories = menuData[selectedMainCategory] || [];

  return (
    <div className="bg-gray-200 py-2 flex justify-center gap-4">
      {subCategories.map((subCategory) => (
        <button
          key={subCategory}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
            selectedSubCategory === subCategory ? "bg-red-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => dispatch(setSelectedSubCategory(subCategory))}
        >
          {subCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;
