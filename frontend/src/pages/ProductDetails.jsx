import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "../auth";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    const id = params.productId;
    axios
      .get(`${API}/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [params.productId]);

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
      quantity: 1,
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="shadow-sm p-3 mb-5 bg-white rounded">
              <img
                src={`${API}/${product.image}`}
                alt={product.product_name}
                className="img-fluid rounded"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow-sm p-4 mb-5 bg-white rounded">
              <h2 className="mb-3">{product.product_name}</h2>
              <h4 className="text-muted mb-3">Rs. {product.price}</h4>
              <p className="mb-4" style={{ overflowWrap: "break-word" }}>
                {product.description}
              </p>
              {isAuthenticated() && isAuthenticated().user.role === 0 ? (
                <button className="btn btn-success btn-lg" onClick={addToCart}>
                  Add to Cart
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
