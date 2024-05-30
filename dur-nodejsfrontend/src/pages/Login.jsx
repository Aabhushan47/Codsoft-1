import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, authenticate, isAuthenticated } from "../auth";

const Login = () => {
  const navigate = useNavigate();
  const { user } = isAuthenticated();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToPage: false,
  });
  const { email, password, error, redirectToPage } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //call login function
    login({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        authenticate(data, () => {
          setValues({ ...values, redirectToPage: true });
        });
      }
    });
  };
  //to show error message
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //to redirect user
  const redirectUser = () => {
    if (redirectToPage) {
      if (user && user.role === 1) {
        return navigate("/admin/dashboard");
      } else {
        return navigate("/");
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-lg-5 my-4">
          <form className="p-3 shadow-lg">
            <h2 className="text-center text-success my-2">Login Form</h2>
            {showError()}
            {redirectUser()}
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <Link to="#" className="text-decoration-none">
                Forgot Password?
              </Link>
              <div>
                Do not have a account?&nbsp;
                <Link to="/register" className="text-decoration-none">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
