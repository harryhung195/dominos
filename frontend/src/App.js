import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"; // Import Redux store


import Navbar from "./components/Navbar"; // Import Navbar if it’s shared across pages
import Homescreen from "./screens/Homescreen";
import MenuScreen from "./screens/Menuscreen";
import CartScreen from "./screens/Cartscreen";
import CheckoutScreen from "./screens/CheckoutScren";
import ConfirmationScreen from "./screens/ConfirmationScreen";

import Account from "./screens/Account";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import AdminDashboard from "./admin/AdminDashboard";
import OfferScreen from "./screens/Offer";
import Store from "./screens/Store";
import Gettheapp from "./screens/Gettheapp";
import OrderOnline from "./screens/OrderOnline";




function App() {
  return (
    <Provider store={store}> {/* Wrap the app in Redux Provider */}
      <Router>
        <div className="App">
          {/* Navbar should be inside Router to handle links */}
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/menu" element={<MenuScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen/>} />
            <Route path="/confirmation" element={<ConfirmationScreen/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/admin/*" element={<AdminDashboard/>} />
            <Route path="/offers" element={<OfferScreen />} /> {/* Add this route */}
            <Route path="/stores" element={<Store />} /> 
            <Route path="/get-the-app" element={<Gettheapp />} /> 
            <Route path="/order-online" element={<OrderOnline/>}/>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
