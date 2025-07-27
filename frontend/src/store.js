import { combineReducers, applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk"; // ✅ Correct import
import { composeWithDevTools } from "redux-devtools-extension";
import { userRegisterReducer, userLoginReducer, userReducer, updateuserReducer, userDetailsReducer } from "./reducers/userReducer";
import { menuReducer } from "./reducers/menuReducer";
import categoryReducer from "./reducers/categoryReducer";
import { cartReducer } from "./reducers/cartReducer";

import { resetMenuSuccess } from "./actions/menuAction";
import { orderReducer } from "./reducers/orderReducer";
import { offerReducer } from "./reducers/offerReducer";
import { storeReducer } from "./reducers/storeReducer";

const rootReducer = combineReducers({
  menu: menuReducer,
  category: categoryReducer,
  cart: cartReducer,
  userLogin: userLoginReducer, // ✅ Correct structure
  userRegister: userRegisterReducer,
  user: userReducer,
  userDetails: userDetailsReducer, 
  order: orderReducer,
  reset: resetMenuSuccess,
  update: updateuserReducer,
  offer: offerReducer,
  store: storeReducer,
});

const currentUserFromStorage = JSON.parse(localStorage.getItem("currentUser")) || null;

const initialState = {
  user: { currentUser: currentUserFromStorage }, // ✅ Matches reducer state structure
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
