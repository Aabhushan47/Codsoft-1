// import React, { useState, useEffect } from "react";
// import { API } from "../config";
// import { isAuthenticated } from "../auth";
// import axios from "axios";

// const AddProduct = () => {
//   const [categories, setCategory] = useState([]);
//   useEffect(() => {
//     axios
//       .get(`${API}/category`)
//       .then((res) => {
//         setCategory(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   //destructure token
//   const { jwtToken } = isAuthenticated();

//   const [productData, setProductData] = useState({
//     product_name: "",
//     price: "",
//     stock: "",
//     description: "",
//     sales: "",
//     image: "",
//     category: "",
//   });
//   //destructure
//   const { product_name, price, stock, description, sales, category, image } =
//     productData;
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (name) => (event) => {
//     setProductData({
//       ...productData,
//       error: false,
//       [name]: event.target.value,
//     });
//   };

//   const handleImageChange = (event) => {
//     setProductData({
//       ...productData,
//       error: false,
//       image: event.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       //form data set garna file xa bhane natra application/json gare hunthyo
//       const formData = new FormData();
//       formData.append("product_name", product_name);
//       formData.append("price", price);
//       formData.append("description", description);
//       formData.append("stock", stock);
//       formData.append("sales", sales);
//       formData.append("image", image);
//       formData.append("category", category);

//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       };
//       const response = await axios.post(`${API}/product`, formData, config);
//       setSuccess(true);
//       setError(false);
//       setProductData({
//         product_name: "",
//         price: "",
//         stock: "",
//         description: "",
//         sales: "",
//         image: "",
//         category: "",
//       });
//     } catch (err) {
//       // setError(err.response.data.error);
//       // setSuccess(false);
//       console.log(err);
//       if (err.response) {
//         setError(err.response.data.error || "An error occurred");
//       } else {
//         setError("An error occurred while submitting the form");
//       }
//       setSuccess(false);
//     }
//   };

//   //to show error msg
//   const showError = () => (
//     <div
//       className="alert alert-danger"
//       style={{ display: error ? "" : "none" }}
//     >
//       {error}
//     </div>
//   );

//   // to show success msg
//   const showSuccess = () => (
//     <div
//       className="alert alert-success"
//       style={{ display: success ? "" : "none" }}
//     >
//       new product added
//     </div>
//   );

//   return (
//     <>
//       <div className="container">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-6">
//             <form className="shadow p-3">
//               <h3 className="text-center text-muted">Add Product</h3>
//               {showError()}
//               {showSuccess()}
//               <div className="mb-2">
//                 <label htmlFor="pname">Product Name</label>
//                 <input
//                   type="text"
//                   id="pname"
//                   className="form-control"
//                   onChange={handleChange("product_name")}
//                   value={product_name}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="price">Price</label>
//                 <input
//                   type="number"
//                   id="price"
//                   className="form-control"
//                   onChange={handleChange("price")}
//                   value={price}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="qty">Stock Quantity</label>
//                 <input
//                   type="number"
//                   id="qty"
//                   className="form-control"
//                   onChange={handleChange("stock")}
//                   value={stock}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="sales">Sales</label>
//                 <input
//                   type="number"
//                   id="sales"
//                   className="form-control"
//                   onChange={handleChange("sales")}
//                   value={sales}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="desc">Product Description</label>
//                 <textarea
//                   className="form-control"
//                   id="desc"
//                   onChange={handleChange("description")}
//                   value={description}
//                 ></textarea>
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="image">Image</label>
//                 <input
//                   type="file"
//                   id="image"
//                   className="form-control"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="category">Category</label>
//                 <select
//                   className="form-control"
//                   onChange={handleChange("category")}
//                   value={category}
//                 >
//                   {categories.map((c, i) => (
//                     <option key={i} value={c._id}>
//                       {c.category_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-2">
//                 <button className="btn btn-primary" onClick={handleSubmit}>
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddProduct;
