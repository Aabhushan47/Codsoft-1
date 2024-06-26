import React, { useState, useEffect } from "react";
import { API } from "../config";
import { isAuthenticated } from "../auth";
import axios from "axios";

const AddProduct = () => {
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/category`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { jwtToken } = isAuthenticated();

  const [productData, setProductData] = useState({
    product_name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    sales: "",
    category: "",
  });
  const { product_name, price, stock, description, sales, category, image } =
    productData;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name) => (event) => {
    setProductData({
      ...productData,
      error: false,
      [name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setProductData({ ...productData, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("sales", sales);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("category", category);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      await axios.post(`${API}/product`, formData, config);
      setSuccess(true);
      setError(false);
      setProductData({
        product_name: "",
        price: "",
        stock: "",
        sales: "",
        description: "",
        image: "",
        category: "",
      });
    } catch (err) {
      setError(err.response.data.error);
      setSuccess(false);
    }
  };

  //to show error msg
  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  // to show success msg
  const showSuccess = () =>
    success && <div className="alert alert-success">new product added</div>;

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <form className="shadow p-3">
              <h3 className="text-center text-muted">Add Product</h3>
              {showError()}
              {showSuccess()}
              <div className="mb-2">
                <label htmlFor="pname">Product Name</label>
                <input
                  type="text"
                  id="pname"
                  className="form-control"
                  onChange={handleChange("product_name")}
                  value={product_name}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  onChange={handleChange("price")}
                  value={price}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="qty">Stock Quantity</label>
                <input
                  type="number"
                  id="qty"
                  className="form-control"
                  onChange={handleChange("stock")}
                  value={stock}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="sales">Sales</label>{" "}
                <input
                  type="number"
                  id="sales"
                  className="form-control"
                  onChange={handleChange("sales")}
                  value={sales}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="desc">Product Description</label>
                <textarea
                  className="form-control"
                  id="desc"
                  onChange={handleChange("description")}
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
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  onChange={handleChange("category")}
                  // value={category}
                >
                  <option></option>
                  {categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
