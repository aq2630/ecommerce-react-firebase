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
import DeleteIcon from "@material-ui/icons/Delete";
import * as classes from "./OrderScreen.module.css";
import firebase from "../../config/firebase";

const OrderScreen = ({ history }) => {
  const [orders, setOrders] = useState(null);
  const [user, setUser] = useState(null);
  const db = firebase.firestore();
  const ordersRef = db.collection("orders");
  const sorting = ordersRef.orderBy("created", "desc");

  const getUser = async () => {
    firebase.auth().onAuthStateChanged((u) => {
      setUser(u);
    });
  };

  const getOrders = async () => {
    const items = [];
    const snapshot = await sorting.get();
    snapshot.forEach((doc) => {
      const oneDoc = { ...doc.data(), id: doc.id };
      items.push(oneDoc);
    });
    setOrders(items);
  };

  const orderDeleteHandler = (order) => {
    ordersRef
      .doc(order.id)
      .delete()
      .then(() => {
        setOrders(orders.filter((x) => x.id !== order.id));
      });
  };

  useEffect(() => {
    // getUser();
    getOrders();
  }, [user]);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box className={classes.backLink}>
          <Link to="/dashboard">
            <ArrowBackIosIcon />
            Back to Dashboard
          </Link>
        </Box>
        {orders ? (
          <Grid container className={classes.gridRoot}>
            <div className={classes.orderGrid}>
              {orders.map((order, index) => (
                <>
                  <h2 className={classes.orderHeading}>Order {index + 1}</h2>
                  <div>{order.name}</div>
                  <div>{order.email}</div>
                  <div>{order.phone}</div>
                  <div>{order.qty}</div>
                  <div>{order.address}</div>
                  <div>{order.productTitle}</div>
                  <div>
                    <IconButton
                      onClick={() => orderDeleteHandler(order)}
                      className={classes.orderRemoveIcon}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </>
              ))}
            </div>
          </Grid>
        ) : (
          <div className={classes.spinner}>
            <CircularProgress size={60} />
          </div>
        )}
      </Container>
    </Box>
  );
};

export default OrderScreen;
