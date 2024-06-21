import React, { useState } from "react";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();
  const countriesList = Object.values(countries);
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};

  const [shippingAddress1, setShippingAddress1] = useState(
    shippingInfo.shippingAddress1 || ""
  );
  const [shippingAddress2, setShippingAddress2] = useState(
    shippingInfo.shippingAddress2 || ""
  );
  const [city, setCity] = useState(shippingInfo.city || "");
  const [zip, setZip] = useState(shippingInfo.zip || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [phone, setPhone] = useState(shippingInfo.phone || "");

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingInfo = {
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    navigate("/confirm");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 shadow p-3 my-5">
          <form onSubmit={submitHandler}>
            <h2 className="mb-3 text-muted">Shipping Information</h2>
            <div className="mb-3">
              <label htmlFor="address1" className="form-label">
                Address Line 1
              </label>
              <input
                type="text"
                className="form-control"
                id="address1"
                onChange={(e) => setShippingAddress1(e.target.value)}
                value={shippingAddress1}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address2" className="form-label">
                Address Line 2
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                onChange={(e) => setShippingAddress2(e.target.value)}
                value={shippingAddress2}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="zip" className="form-label">
                Zip Code
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                className="form-select"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                required
              >
                <option value="">Select Country</option>
                {countriesList.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-warning">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
