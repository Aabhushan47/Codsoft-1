import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { API } from "../config";
import { isAuthenticated } from "../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Product = () => {
  const { jwtToken } = isAuthenticated();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${API}/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to fetch products");
      });
  };

  //delete product
  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this product ?"
    );
    if (confirmed) {
      axios
        .delete(`${API}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          toast.success("Product deleted");
          setProducts(products.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          toast.error("Failed to delete product");
        });
    }
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock Quantity</th>
                    <th scope="col">Product Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((p, i) => (
                      <tr key={i}>
                        <td>{p.product_name}</td>
                        <td>{p.price}</td>
                        <td>{p.stock}</td>
                        <td
                          style={{
                            wordWrap: "break-word",
                            maxWidth: "300px",
                            whiteSpace: "normal",
                          }}
                        >
                          {p.description}
                        </td>
                        <td>
                          <img
                            src={`${API}/${p.image}`}
                            width="100"
                            height="auto"
                            alt={p.product_name}
                          />
                        </td>
                        <td>{p.category.category_name}</td>
                        <td>
                          <div className="d-flex flex-column align-items-center">
                            <Link
                              className="btn btn-primary mb-2"
                              to={`/admin/updateproduct/${p._id}`}
                            >
                              <FaEdit />
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteProduct(p._id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
