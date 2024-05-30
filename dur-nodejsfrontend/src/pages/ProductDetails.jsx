import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  useEffect(() => {
    const id = params.productId;
    axios
      .get(`${API}/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const productItem = {
      id: product._id,
      name: product.product_name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      countInStock: product.stock,
      quantity: 3,
    };
    const existingItem = cartItems.find((item) => item.id === product._id);
    if (existingItem) {
      toast.error("Product already in cart");
    } else {
      cartItems.push(productItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast.success(`${productItem.name} is added to cart`);
    }
  };
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <div className="container shadow p-5 my-5">
        <div className="row d-flex justify-content-between">
          <div className="col-md-5">
            <img
              src={`${API}/${product.image}`}
              alt={product.product_name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h5>{product.product_name}</h5>
            <h5>Rs.{product.price}</h5>
            <p>{product.description}</p>
            <br />
            <br />
            <button className="btn btn-success" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
