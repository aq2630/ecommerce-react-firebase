import React, { useState } from "react";
import * as classes from "./Header.module.css";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Hidden,
  Toolbar,
  IconButton,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../images/ht-logo.png";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: 2,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = (props) => {
  const [open, setOpen] = useState(false);
  const styles = useStyles(); // material ui Styles

  const handleDrawer = () => {
    setOpen(!open);
  };

  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/category/toys">Toys</Link>
      </li>
      <li>
        <Link to="/category/kitchen">Kitchen Appliances</Link>
      </li>
    </>
  );

  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          color="inherit"
          className={[classes.appBar, styles.appBar].join(" ")}
        >
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar_wrapper}>
              <Box component="div" className={classes.logo}>
                <Link to="/">
                  <img src={logo} alt="hashtag store pk" />
                </Link>
              </Box>
              <Box component="div">
                <ul className={classes.mainMenu}>
                  <Hidden smDown>{navLinks}</Hidden>
                  <Hidden mdUp>
                    <li>
                      <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="menu"
                        onClick={handleDrawer}
                      >
                        <MenuIcon />
                      </IconButton>
                    </li>
                  </Hidden>
                </ul>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <IconButton
            className={classes.drawerCloseIcon}
            onClick={handleDrawer}
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
          <div className={classes.drawerMenu}  onClick={handleDrawer}>
            <ul>{navLinks}</ul>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));
