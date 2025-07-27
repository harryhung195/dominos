const initialState = {
  selectedMainCategory: "Pizza",
  selectedSubCategory: null, // Subcategory starts as null
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_MAIN_CATEGORY":
      return { ...state, selectedMainCategory: action.payload, selectedSubCategory: null }; // Reset subcategory when main changes

    case "SET_SUB_CATEGORY":
      return { ...state, selectedSubCategory: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;


