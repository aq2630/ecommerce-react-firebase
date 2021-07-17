import React, { useEffect, useState } from "react";
import * as classes from "./CategoryScreen.module.css";
import { Box, Container, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../../config/firebase";
import Hero from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";

const CategoryScreen = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();
  const productRef = db.collection("products");
  const categorySorting = productRef.where(
    `category`,
    "array-contains",
    `${match.params.category}`
  );
  const getProducts = async () => {
    const items = [];
    const snapshot = await categorySorting.get();
    snapshot.forEach((doc) => {
      const oneDoc = { ...doc.data(), id: doc.id };
      items.push(oneDoc);
    });
    setProducts(items);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <div>
      <Hero />
      <Container maxWidth="lg" className={classes.productsContainer}>
        <div className={classes.productsCards}>
          <Grid container>
            <Grid className={classes.topProducts} xs={12}>
              Categories
            </Grid>
            {loading ? (
              <Box className={classes.loading} justifyContent="center">
                <CircularProgress size={60} />
              </Box>
            ) : (
              <>
                {products.map((product) => (
                  <Grid item md={3} xs={6}>
                    <ProductCard key={product.id} product={product} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default CategoryScreen;
