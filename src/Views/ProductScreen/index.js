import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import * as classes from "./ProductScreen.module.css";
import firebase from "../../config/firebase";
import Slider from "react-slick";

const ProductScreen = ({ match, history }) => {
  const [product, setProduct] = useState(null);
  const [editorState, setEditorState] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(1);
  const sliderMain = useRef(null);
  const sliderThumb = useRef(null);
  const db = firebase.firestore();
  const productsRef = db.collection("products");
  const ordersRef = db.collection("orders");

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    asNavFor: sliderThumb.current,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  var settingsNav = {
    dots: false,
    arrows: false,
    infinite: true,
    asNavFor: sliderMain.current,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const getProduct = async () => {
    const snapshot = await productsRef.doc(match.params.id).get();
    setProduct(snapshot.data());
  };
  useEffect(() => {
    getProduct();
    if (product) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(product.description))
        )
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [product]);

  const isDisabled =
    name === "" || email === "" || phone === "" || address === "" || qty === "";

  const submitHandler = (e) => {
    e.preventDefault();
    ordersRef
      .add({
        productTitle: product.title,
        name,
        email,
        phone,
        qty,
        address,
        created: firebase.firestore.Timestamp.now(),
      })
      .then((order) => {
        console.log(order.id);
        history.push(`/ordersuccess/${order.id}`);
      });
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        {product ? (
          <Grid container className={classes.gridRoot}>
            <Grid item md={5} xs={12} className={classes.HeroText}>
              <Box className={classes.productImageContainer}>
                {product.image.length > 1 ? (
                  <div>
                    <Slider {...settings} ref={sliderMain}>
                      {product.image.map((item, index) => (
                        <img
                          key={`image-${index}`}
                          src={item}
                          alt={`${product.title}-${index}`}
                        />
                      ))}
                    </Slider>
                    <Slider
                      {...settingsNav}
                      className={classes.slider2}
                      ref={sliderThumb}
                    >
                      {product.image.map((item, index) => (
                        <img
                          key={`image-${index}`}
                          src={item}
                          alt={`${product.title}-${index}`}
                        />
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <img src={product.image} alt={product.title} />
                )}
              </Box>
            </Grid>
            <Grid
              item
              px={2}
              md={4}
              xs={12}
              className={classes.productTitleContainer}
            >
              <Box className={classes.productTitle}>{product.title}</Box>
              <Box className={classes.price}>Rs. {product.price}</Box>
              <Box className={classes.delivery}>
                {product.delivery > 0
                  ? `Delivery Charges Rs. ${product.delivery}`
                  : "Free Delivery"}
              </Box>
              <Box className={classes.shipment}>
                Shipment will be delivered within 3-5 days
              </Box>
            </Grid>
            <Grid item md={3} xs={12} className={classes.HeroLottie}>
              {!submit ? (
                <form onSubmit={submitHandler} className={classes.productForm}>
                  <div className={classes.formFields}>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className={classes.formFields}>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="abc@example.com"
                    />
                  </div>
                  <div className={classes.formFields}>
                    <input
                      value={phone}
                      type="tel"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div className={classes.formFields}>
                    <div className={classes.qtySection}>
                      <h4>Quantity</h4>
                      <IconButton
                        className={classes.IconButton}
                        onClick={() => (qty === 1 ? 1 : setQty(qty - 1))}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                      {qty}
                      <IconButton
                        className={classes.IconButton}
                        onClick={() => setQty(qty + 1)}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </div>
                  </div>
                  <div className={classes.formFields}>
                    <textarea
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Shipping Address"
                      rows="2"
                    ></textarea>
                  </div>
                  <button
                    className={classes.placeOrderButton}
                    disabled={isDisabled}
                  >
                    Place Order
                  </button>
                </form>
              ) : (
                <h2 className={classes.thankYouMessage}>
                  Thank you for Placing an Order, you will receive a
                  confirmation call soon.
                </h2>
              )}
            </Grid>
            <Grid item md={12} className={classes.descriptionContainer}>
              <Typography variant="h5">Product Description</Typography>
              <Box className={classes.description}>
                <Editor editorState={editorState} readOnly={true} />
              </Box>
            </Grid>
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

export default ProductScreen;
