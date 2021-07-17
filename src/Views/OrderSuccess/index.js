import React, { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import * as classes from "./OrderSuccess.module.css";

const OrderSuccess = ({ match }) => {
  const [order, setOrder] = useState(null);
  const db = firebase.firestore();
  const ordersRef = db.collection("orders");

  const getOrder = async () => {
    const snapshot = await ordersRef.doc(match.params.id).get();
    setOrder(snapshot.data());
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <Container max-width="lg" className={classes.mainContainer}>
      {!order ? (
        <Box justifyContent="center" display="flex">
          <CircularProgress size={60} color="inherit" />
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" paragraph={true}>
            Dear {order.name}
          </Typography>
          <Typography variant="body1" paragraph={true}>
            Thank you for shopping from Hashtagstore.{" "}
          </Typography>
          <Typography variant="body1" paragraph={true}>
            Your order of <b>{order.productTitle}</b> has been placed.
          </Typography>
          <Typography variant="body1">
            Your will receive a confirmation call within 24 hours.
          </Typography>
          <Typography variant="body1">
            Your order will be deliver between 3 to 5 days after confirmation.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default OrderSuccess;
