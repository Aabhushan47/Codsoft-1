import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth";

const Header = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems && cartItems.length > 0) {
      setProducts(cartItems);
    } else {
      setProducts([]);
    }
  }, []);

  const { user } = isAuthenticated();

  return (
    <>
      <div className="container-fluid bg-secondary text-white">
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-2 mb-lg-0">
            <Link className="navbar-brand text-white fs-3" to="/">
              Ecommerce
            </Link>
          </div>
          <form className="d-flex w-100 w-lg-50 mb-2 mb-lg-0">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-warning" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="d-flex align-items-center">
            {isAuthenticated() && user.role === 1 && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-decoration-none text-white"
                  title="Admin Dashboard"
                >
                  <i className="fas fa-user fs-4 mx-3"></i>
                </Link>
                <div className="fs-5 mx-3">{user.name}</div>
              </>
            )}
            {isAuthenticated() && user.role === 0 && (
              <>
                <Link
                  to="/profile"
                  className="text-decoration-none text-white"
                  title="Profile"
                >
                  <i className="fas fa-user fs-4 mx-3"></i>
                </Link>
                <div className="fs-5 mx-3">{user.name}</div>
                <i
                  onClick={() =>
                    logout(() => {
                      navigate("/login");
                    })
                  }
                  className="fas fa-sign-out-alt fs-4 mx-3 cursor-pointer text-white"
                  title="Logout"
                ></i>
                <Link
                  to="/cart"
                  className="text-decoration-none text-white position-relative"
                  title="Cart"
                >
                  <i className="fas fa-cart-plus fs-4 mx-3">
                    <span
                      className="position-absolute top-0 start-100 bg-warning badge rounded-pill translate-middle text-dark"
                      style={{ fontSize: "12px" }}
                    >
                      {products && products.length}
                    </span>
                  </i>
                </Link>
              </>
            )}
            {!isAuthenticated() && (
              <>
                <Link
                  to="/login"
                  className="text-decoration-none text-white mx-3"
                  title="Login"
                >
                  <i className="fas fa-sign-in-alt fs-4"></i>
                </Link>
                <Link
                  to="/register"
                  className="text-decoration-none text-white mx-3"
                  title="Register"
                >
                  <i className="fas fa-user-plus fs-4"></i>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
