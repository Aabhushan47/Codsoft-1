import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "./../config";
import Card from "./Card";

const CardContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/product`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid my-4">
      <div className="row p-2">
        {products &&
          products.map((item, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <Card data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardContainer;
