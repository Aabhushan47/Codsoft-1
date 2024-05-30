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
  console.log(products);
  return (
    <>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products && products.map((item, i) => <Card key={i} data={item} />)}
        </div>
      </div>
    </>
  );
};

export default CardContainer;
