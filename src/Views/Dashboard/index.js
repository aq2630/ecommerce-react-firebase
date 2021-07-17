import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Drawer,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import firebase from "../../config/firebase";
import { Link } from "react-router-dom";
import * as classes from "./Dashboard.module.css";

const Dashboard = ({ history }) => {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    firebase.auth().onAuthStateChanged((u) => {
      setUser(u);
    });
  };
  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <Box className={classes.root}>
      {!user ? (
        <Container maxWidth="lg">go to Login</Container>
      ) : (
        <Box>
          <Hidden smDown>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Box className={classes.spacer} />
              <div className={classes.drawerContainer}>
                <List>
                  <ListItem button>
                    <Link to="/addproduct">Add Product</Link>
                  </ListItem>
                  <ListItem button>
                    <Link to="/orders">All Orders</Link>
                  </ListItem>
                  <ListItem button>
                    <Link to="/allproducts">All Products</Link>
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </Hidden>
          <Hidden mdUp>
            <Box className={classes.drawerContainer}>
              <List>
                <ListItem button>
                  <Link to="/addproduct">Add Product</Link>
                </ListItem>
                <ListItem button>
                  <Link to="/orders">All Orders</Link>
                </ListItem>
                <ListItem button>
                  <Link to="/allproducts">All Products</Link>
                </ListItem>
              </List>
            </Box>
          </Hidden>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
