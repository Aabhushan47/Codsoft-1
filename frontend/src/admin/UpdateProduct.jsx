import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../config";
import { isAuthenticated } from "../auth";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const id = params.productId;
  const [categories, setCategory] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const { jwtToken } = isAuthenticated();

  const [product_name, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [stock, setCountInStock] = useState("");
  const [sales, setSales] = useState("");

  const [description, setProductDescription] = useState("");
  const [image, setProductImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/category`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API}/product/${id}`)
      .then((res) => {
        console.log(res.data);
        setInitialValues(res.data);
        setProductName(res.data.product_name);
        setProductPrice(res.data.price);
        setCountInStock(res.data.stock);
        setSales(res.data.sales);
        setProductDescription(res.data.description);
        setCategoryId(res.data.category._id);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("sales", sales);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", categoryId);
    try {
      await axios.put(`${API}/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setSuccess(true);
      setError("");
    } catch (err) {
      setError(err.response.data.error);
      setSuccess("");
    }
  };

  //to show error msg
  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  // to show success msg
  const showSuccess = () =>
    success && <div className="alert alert-success">Product updated</div>;

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <form className="shadow p-3">
              <h3 className="text-center text-muted">Update Product</h3>
              {showError()}
              {showSuccess()}
              <div className="mb-2">
                <label htmlFor="pname">Product Name</label>
                <input
                  type="text"
                  id="pname"
                  className="form-control"
                  onChange={(e) => setProductName(e.target.value)}
                  value={product_name}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  onChange={(e) => setProductPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="qty">Stock Quantity</label>
                <input
                  type="number"
                  id="qty"
                  className="form-control"
                  onChange={(e) => setCountInStock(e.target.value)}
                  value={stock}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="sales">Sales</label>
                <input
                  type="number"
                  id="sales"
                  className="form-control"
                  onChange={(e) => setSales(e.target.value)}
                  value={sales}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="desc">product Description</label>
                <textarea
                  className="form-control"
                  id="desc"
                  onChange={(e) => setProductDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value={categoryId}>
                    {initialValues.category &&
                      initialValues.category.category_name}
                  </option>
                  {categories &&
                    categories.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
