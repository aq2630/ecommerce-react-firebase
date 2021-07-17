import React, { useState, useEffect } from "react";
import { Box, Container, Grid, LinearProgress } from "@material-ui/core";
import * as classes from "./AddProductScreen.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import firebase from "../../config/firebase";
import DraftEditor from "../../components/DraftEditor/DraftEditor";
import { Link } from "react-router-dom";

const AddProductScreen = ({ history }) => {
  const [progress, setProgress] = React.useState(0);
  const [user, setUser] = useState(null);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const db = firebase.firestore();
  const productsRef = db.collection("products");

  const getUser = async () => {
    firebase.auth().onAuthStateChanged((u) => {
      setUser(u);
    });
  };

  const changeHandlerGallery = async (e) => {
    // const file = e.target.files[0];
    const { files } = e.target;
    Array.from(files).forEach(async (file) => {
      const storageRef = firebase.storage().ref(`uploads/${file.name}`);
      const task = storageRef.put(file);
      task.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => console.log(err),
        () => {
          storageRef.getDownloadURL().then((url) => {
            setDownloadUrls((prevValue) => [...prevValue, url]);
            setError(false);
          });
        }
      );
    });
  };

  const handleCallBack = (childData) => {
    setDescription(childData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    productsRef.add({
      title,
      category,
      description,
      price,
      delivery,
      image: downloadUrls,
      created: firebase.firestore.Timestamp.now(),
    });
    history.push("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!user ? (
        <div className=" my-8 text-center">
          <p>Please Login</p>
          <div className="my-4">
            <Link to="/login" className={classes.loginButton}>
              Login
            </Link>
          </div>
        </div>
      ) : (
        <div className={classes.root}>
          <form onSubmit={submitHandler} className={classes.addProductForm}>
            <Box className={classes.backLink}>
              <Link to="/dashboard">
                <ArrowBackIosIcon />
                Back to Dashboard
              </Link>
            </Box>
            <h3 className="mb-4 font-bold">Add New Product</h3>
            <div>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                maxLength="25"
                placeholder="Product Title"
              />
            </div>
            <div>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option disabled selected value="">
                  Select Category
                </option>
                <option value="toys">Toys</option>
                <option value="kitchen">Kitchen Appliances</option>
              </select>
            </div>
            <div>
              <DraftEditor parentCallBack={handleCallBack} />
            </div>
            <div>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="Price"
              />
            </div>
            <div>
              <input
                onChange={(e) => setDelivery(e.target.value)}
                type="text"
                placeholder="Delivery Charges or 0 for Free Delivery"
              />
            </div>
            <div class="my-2">
              <input
                type="file"
                onChange={changeHandlerGallery}
                placeholder="Product Image"
                multiple
              />
              <LinearProgress
                className={classes.progress}
                variant="determinate"
                value={progress}
              />
            </div>
            <button disabled={progress !== 100}>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProductScreen;
