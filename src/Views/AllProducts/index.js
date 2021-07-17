import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import firebase from "../../config/firebase";
import * as classes from "./AllProducts.module.css";
import DeleteIcon from "@material-ui/icons/Delete";

const AllProducts = () => {
  const [products, setProducts] = useState(null);
  const db = firebase.firestore();
  const productsRef = db.collection("products");
  const sorting = productsRef.orderBy("created", "desc");

  const getProducts = async () => {
    const items = [];
    const snapshot = await sorting.get();
    snapshot.forEach((doc) => {
      const oneDoc = { ...doc.data(), id: doc.id };
      items.push(oneDoc);
    });
    setProducts(items);
  };

  const productDeleteHandler = (product) => {
    productsRef
      .doc(product.id)
      .delete()
      .then(() => {
        setProducts(products.filter((x) => x.id !== product.id));
      });
  };

  useEffect(() => {
    // getUser();
    getProducts();
  }, []);

  return (
    <Box>
      <Container maxWidth="lg" className={classes.mainContainer}>
        <Box className={classes.backLink}>
          <Link to="/dashboard">
            <ArrowBackIosIcon />
            Back to Dashboard
          </Link>
        </Box>
        {!products ? (
          <CircularProgress size={60} color="secondary" />
        ) : (
          <Box className={classes.productGrid}>
            {products.map((product, index) => (
              <React.Fragment key={`product-${index}`}>
                <Box className={classes.productImage}>
                  <img src={product.image} alt={product.title} />
                </Box>
                <Box>{product.title}</Box>
                <Box>{product.price}</Box>
                <Box className={classes.iconBox}>
                  <IconButton
                    onClick={() => productDeleteHandler(product)}
                    className={classes.productRemoveIcon}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AllProducts;
