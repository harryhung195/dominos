import React, { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import { fetchMenu } from "../actions/menuAction";
import { fetchOrders } from "../actions/orderAction"; // ✅ Changed getOrders to fetchOrders
import { fetchStores } from "../actions/storeAction";

import { Link, Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import MenuList from "./MenuList";
import AddMenuItem from "./AddMenuItem";
import OrdersList from "./OrdersList";
import Offer from "./Offer";
import Store from "./Store";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(fetchMenu());
    dispatch(fetchOrders()); 
    // ✅ Changed getOrders to fetchOrders
    dispatch(fetchStores());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h1>
      <nav className="flex justify-center space-x-4 mb-6">
        <Link to="/admin/users" className="bg-blue-500 text-white px-4 py-2 rounded">Users</Link>
        <Link to="/admin/menu" className="bg-blue-500 text-white px-4 py-2 rounded">Menu</Link>
        <Link to="/admin/add-menu" className="bg-green-500 text-white px-4 py-2 rounded">Add Item</Link>
        <Link to="/admin/orders" className="bg-blue-500 text-white px-4 py-2 rounded">Orders</Link>
        <Link to="/admin/offer" className="bg-blue-500 text-white px-4 py-2 rounded">Offer</Link>
        <Link to="/admin/store" className="bg-blue-500 text-white px-4 py-2 rounded">Store</Link>
      </nav>

      <Routes>
        <Route path="users" element={<UsersList />} />
        <Route path="menu" element={<MenuList />} />
        <Route path="add-menu" element={<AddMenuItem />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="offer" element={<Offer />} />
        <Route path="store" element={<Store user={userInfo} />} /> 
      </Routes>
    </div>
  );
};

export default AdminDashboard;
