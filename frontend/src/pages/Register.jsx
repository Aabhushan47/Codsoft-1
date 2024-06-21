import React, { useState } from "react";
import { signUp } from "../auth/index";
import { Link } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: false,
  });

  const { name, email, password, confirmPassword, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValues({ ...values, error: "Passwords do not match" });
      return;
    }
    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          err: "",
          success: true,
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      New account created, verify your account before login
    </div>
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="col-lg-5 my-4">
        <form className="p-3 shadow-lg" onSubmit={handleSubmit}>
          <h2 className="text-center text-success my-2">Register Form</h2>
          {showError()}
          {showSuccess()}
          <div className="mb-3">
            <label htmlFor="fname">FullName</label>
            <input
              type="text"
              id="fname"
              className="form-control"
              onChange={handleChange("name")}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              onChange={handleChange("email")}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              className="form-control"
              onChange={handleChange("password")}
              value={password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpass">Confirm Password</label>
            <input
              type="password"
              id="cpass"
              className="form-control"
              onChange={handleChange("confirmPassword")}
              value={confirmPassword}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <div>
            Already have a account?&nbsp;
            <Link to="/Login" className="text-decoration-none">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
