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
  // return (
  //   <>
  //     <div className="container-fluid">
  //       <div className="row bg-secondary align-items-center">
  //         <div className="col-lg-2">
  //           <Link className="navbar-brand text-white" to="/">
  //             Ecommerce
  //           </Link>
  //         </div>
  //         <div className="col-lg-7">
  //           <form className="d-flex">
  //             <input
  //               className="form-control me-2"
  //               type="search"
  //               placeholder="Search"
  //               aria-label="Search"
  //             />
  //             <button className="btn btn-warning" type="submit">
  //               <i className="far fa-search"></i>
  //             </button>
  //           </form>
  //         </div>
  //         <div className="col-lg-3">
  //           <div className="d-flex justify-content-evenly">
  //             {isAuthenticated() && user.role === 1 && (
  //               <>
  //                 <Link
  //                   to="/admin/dashboard"
  //                   className="text-decoration-none text-white"
  //                   title="admin"
  //                 >
  //                   <i class="fas fa-user fs-3 my-3"></i>
  //                 </Link>
  //                 <div className="fs-5 my-3 text-white">{user.name}</div>
  //               </>
  //             )}
  //             {isAuthenticated() && user.role === 0 ? (
  //               <>
  //                 <Link
  //                   to="/profile"
  //                   className="text-decoration-none text-white"
  //                   title="profile"
  //                 >
  //                   <i class="fas fa-user fs-3 my-3"></i>
  //                 </Link>
  //                 <div className="fs-5 my-3 text-white">{user.name}</div>

  //                 <div className="col-sm-3 col-lg-3 text-white">
  //                   <i
  //                     onClick={() =>
  //                       logout(() => {
  //                         navigate("/login");
  //                       })
  //                     }
  //                     className="fas fa-sign-out-alt fs-3 my-3"
  //                   ></i>
  //                 </div>
  //                 <div className="col-sm-3 col-lg-3">
  //                   <Link
  //                     to="/cart"
  //                     className="text-decoration-none text-white"
  //                     title="cart"
  //                   >
  //                     <i className="fas fa-cart-plus fs-3 my-3 position-relative">
  //                       <span
  //                         className="position-absolute top-0 start-100 bg-warning badge rounded-pill translate-middle text-dark"
  //                         style={{ fontSize: "12px" }}
  //                       >
  //                         <span>{products && products.length}</span>
  //                       </span>
  //                     </i>
  //                   </Link>
  //                 </div>
  //               </>
  //             ) : (
  //               <>
  //                 <div className="offset-sm-2 col-sm-3 col-lg-3">
  //                   <Link
  //                     to="/login"
  //                     className="text-decoration-none text-white"
  //                     title="login"
  //                   >
  //                     <i className="fas fa-sign-in-alt fs-3 my-3"></i>
  //                   </Link>
  //                 </div>
  //                 <div className="col-sm-3 col-lg-3">
  //                   <Link
  //                     to="/register"
  //                     className="text-decoration-none text-white"
  //                     title="register"
  //                   >
  //                     <i className="fas fa-user-plus fs-3 my-3"></i>
  //                   </Link>
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <nav className="navbar navbar-expand-lg navbar-light bg-secondary custom-nav">
  //       <div className="container-fluid">
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-bs-toggle="collapse"
  //           data-bs-target="#navbarSupportedContent"
  //           aria-controls="navbarSupportedContent"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //             <li className="nav-item">
  //               <Link className="nav-link active" aria-current="page" to="/">
  //                 Home
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/products">
  //                 Products
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="#">
  //                 Customer Service
  //               </Link>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   </>
  // );
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary align-items-center">
          <div className="col-lg-2">
            <Link className="navbar-brand text-white" to="/">
              Ecommerce
            </Link>
          </div>
          <div className="col-lg-7">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-warning" type="submit">
                <i className="far fa-search"></i>
              </button>
            </form>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-evenly">
              {isAuthenticated() && user.role === 1 && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="text-decoration-none text-white"
                    title="admin"
                  >
                    <i className="fas fa-user fs-3 my-3"></i>
                  </Link>
                  <div className="fs-5 my-3 text-white">{user.name}</div>
                </>
              )}
              {isAuthenticated() && user.role === 0 && (
                <>
                  <Link
                    to="/profile"
                    className="text-decoration-none text-white"
                    title="profile"
                  >
                    <i className="fas fa-user fs-3 my-3"></i>
                  </Link>
                  <div className="fs-5 my-3 text-white">{user.name}</div>

                  <div className="col-sm-3 col-lg-3 text-white">
                    <i
                      onClick={() =>
                        logout(() => {
                          navigate("/login");
                        })
                      }
                      className="fas fa-sign-out-alt fs-3 my-3"
                    ></i>
                  </div>
                  <div className="col-sm-3 col-lg-3">
                    <Link
                      to="/cart"
                      className="text-decoration-none text-white"
                      title="cart"
                    >
                      <i className="fas fa-cart-plus fs-3 my-3 position-relative">
                        <span
                          className="position-absolute top-0 start-100 bg-warning badge rounded-pill translate-middle text-dark"
                          style={{ fontSize: "12px" }}
                        >
                          <span>{products && products.length}</span>
                        </span>
                      </i>
                    </Link>
                  </div>
                </>
              )}
              {!isAuthenticated() && (
                <>
                  <div className="offset-sm-2 col-sm-3 col-lg-3">
                    <Link
                      to="/login"
                      className="text-decoration-none text-white"
                      title="login"
                    >
                      <i className="fas fa-sign-in-alt fs-3 my-3"></i>
                    </Link>
                  </div>
                  <div className="col-sm-3 col-lg-3">
                    <Link
                      to="/register"
                      className="text-decoration-none text-white"
                      title="register"
                    >
                      <i className="fas fa-user-plus fs-3 my-3"></i>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary custom-nav">
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Customer Service
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
