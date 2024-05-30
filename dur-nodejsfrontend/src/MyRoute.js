import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layouts from "./components/Layouts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import EmailVerify from "./auth/EmailVerify";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./admin/Dashboard";
import AddCategory from "./admin/AddCategory";

const MyRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<HomePage />} />
            <Route
              path="productdetails/:productId"
              element={<ProductDetails />}
            />
            <Route path="cart" element={<Cart />} />
            <Route path="register" element={<Register />} />
            <Route path="email/confirmation/:token" element={<EmailVerify />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="admin/" element={<AdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addcategory" element={<AddCategory />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MyRoute;
