import React from "react";
import * as classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className={classes.productRoot}>
        <div className={classes.productImage}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={classes.productTextArea}>
          <h5 className={classes.productTitle}>{product.title}</h5>
          <p className={classes.productPrice}>Rs. {product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
