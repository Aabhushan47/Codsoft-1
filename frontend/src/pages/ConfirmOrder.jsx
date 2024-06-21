import React from "react";
import { isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
  const { user } = isAuthenticated();
  const totalPrice = cartItems.reduce(
    (ac, item) => ac + item.quantity * item.price,
    0
  );

  const proceessToPayment = () => {
    const data = { totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 shadow p-4 mb-5">
          <h2 className="text-center mb-4">Shipping Information</h2>
          <div className="mb-3">
            <b>Name:</b> <span className="text-muted">{user.name}</span>
          </div>
          <div className="mb-3">
            <b>Email:</b> <span className="text-muted">{user.email}</span>
          </div>
          <div className="mb-3">
            <b>City:</b> <span className="text-muted">{shippingInfo.city}</span>
          </div>
          <div className="mb-3">
            <b>Phone Number:</b>{" "}
            <span className="text-muted">{shippingInfo.phone}</span>
          </div>
          <div className="mb-3">
            <b>Country:</b>{" "}
            <span className="text-muted">{shippingInfo.country}</span>
          </div>
          <div className="mb-3">
            <b>Shipping Address:</b>{" "}
            <span className="text-muted">
              {shippingInfo.shippingAddress1}, {shippingInfo.shippingAddress2}
            </span>
          </div>
          <div className="mb-3">
            <b>Zip:</b> <span className="text-muted">{shippingInfo.zip}</span>
          </div>
          <hr />
          <h2 className="text-center mb-4">Your Cart Items</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="row mb-3">
              <div className="col-3">
                <img
                  src={`${API}/${item.image}`}
                  alt={item.name}
                  className="img-fluid"
                />
              </div>
              <div className="col-6">
                <p className="text-muted mb-0">{item.name}</p>
                <p className="text-warning mb-0">
                  Rs.{item.price} x {item.quantity} ={" "}
                  <b>Rs.{item.price * item.quantity}</b>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-3">
          <div className="shadow p-4 mb-5">
            <h4 className="mb-3">Order Summary</h4>
            <hr />
            <p>
              SubTotal:{" "}
              <span>
                {cartItems.reduce((ac, item) => ac + item.quantity, 0)} (Units)
              </span>
            </p>
            <p>
              Total Price: Rs. <span>{totalPrice.toFixed(2)}</span>
            </p>
            <hr />
            <button
              className="btn btn-warning btn-block"
              onClick={proceessToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
