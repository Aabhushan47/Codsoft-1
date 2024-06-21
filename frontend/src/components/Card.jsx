import React from "react";
import { API } from "../config";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { _id, product_name, price, image, description } = props.data;
  return (
    <>
      <div className="col">
        <div className="card">
          <img src={`${API}/${image}`} className="card-img-top" alt="name" />
          <div className="card-body">
            <h5 className="card-title">{product_name}</h5>
            <h5>Rs.{price}</h5>
            <p>{description.slice(0, 20)}...</p>
            <Link to={`/productdetails/${_id}`} className="btn btn-success">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
