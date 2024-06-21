import React, { useState, useEffect, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = localStorage.getItem("cartItems");
    const cartItems = JSON.parse(cartData) || [];
    setProducts(cartItems);
  }, []);

  const decreaseQty = (id) => {
    const updateProducts = products.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setProducts(updateProducts);
    localStorage.setItem("cartItems", JSON.stringify(updateProducts));
  };

  const increaseQty = (id) => {
    const updateProducts = products.map((item) =>
      item.id === id && item.quantity < item.countInStock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setProducts(updateProducts);
    localStorage.setItem("cartItems", JSON.stringify(updateProducts));
  };

  const removeCartHandler = (id, name) => {
    if (window.confirm("Are you sure want to delete this product?")) {
      const updatedProducts = products.filter((item) => item.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
      toast.success(`${name} is removed from the cart`);
    }
  };

  const shippingHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <div className="container">
        <div className="row justify-content-between my-5">
          {products && products.length === 0 ? (
            <h2 className="text-center text-danger mt-3">Your Cart is Empty</h2>
          ) : (
            <>
              <h2 className="text-center text-muted mt-3">Your Cart Items</h2>
              <div className="col-md-8">
                <div className="shadow-lg">
                  {products.map((item, index) => (
                    <Fragment key={index}>
                      <hr />
                      <div className="d-flex flex-column flex-md-row align-items-center p-3">
                        <div className="col-4 col-md-3">
                          <img
                            src={`${API}/${item.image}`}
                            alt={item.name}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-8 col-md-3">
                          <span>
                            <b>{item.name}</b>
                          </span>
                        </div>
                        <div className="col-4 col-md-2">
                          <span className="text-warning">Rs.{item.price}</span>
                        </div>
                        <div className="col-8 col-md-3">
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-danger"
                              onClick={() => decreaseQty(item.id)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              name="qty"
                              value={item.quantity}
                              readOnly
                              className="form-control border-0 text-center"
                              style={{
                                width: "50px",
                                backgroundColor: "white",
                                color: "black",
                                paddingLeft: "px",
                              }}
                            />

                            <button
                              className="btn btn-primary"
                              onClick={() => increaseQty(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-12 col-md-1 mt-3 mt-md-0">
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              removeCartHandler(item.id, item.name)
                            }
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <hr />
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="col-md-3">
                <div className="shadow-lg p-3">
                  <h5>Cart Summary</h5>
                  <hr />
                  <div>
                    <span>
                      <b>Units:</b>{" "}
                      {products.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Total:</b> Rs.
                      {products.reduce(
                        (total, item) => total + item.quantity * item.price,
                        0
                      )}
                    </span>
                  </div>
                  <hr />
                  <button
                    className="btn btn-warning btn-block"
                    onClick={shippingHandler}
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
