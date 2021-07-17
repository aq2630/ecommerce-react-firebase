import React, { useEffect, useState } from "react";
import * as classes from "./HomeScreen.module.css";
import { Box, Container, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../../config/firebase";
import Hero from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();
  const ref = db.collection("products");
  const sorting = ref.orderBy("created", "desc");
  const getProducts = async () => {
    const items = [];
    const snapshot = await sorting.get();
    snapshot.forEach((doc) => {
      const oneDoc = { ...doc.data(), id: doc.id };
      items.push(oneDoc);
    });
    setProducts(items);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Hero />
      <Container maxWidth="lg" className={classes.productsContainer}>
        <div className={classes.productsCards}>
          <Grid container>
            <Grid className={classes.topProducts} xs={12}>
              Top Products
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

export default HomeScreen;
