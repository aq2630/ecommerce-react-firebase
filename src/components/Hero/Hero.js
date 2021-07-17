import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Lottie from "react-lottie";
import banner from "../../images/banner-ht.png";
import animation from "../../assets/hashtag-lottie.json";
import * as classes from "./Hero.module.css";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Hero = () => {
  const mdUp = useMediaQuery("(min-width:960px)");
  return (
    <Box className={classes.HeroRoot}>
      <Container maxWidth="lg">
        <Grid
          container
          className={classes.root}
          direction={mdUp ? "row" : "column-reverse"}
        >
          <img className={classes.banner} src={banner} alt="Banner" />
          {/* <Grid item md={6} className={classes.HeroText}>
            <h3 className={classes.HeroTitle}>Welcome to Hashtag Store PK</h3>
            <h5 className={classes.HeroDescription}>
              Best Products in Best Prices
            </h5>
          </Grid>
          <Grid item md={6} className={classes.HeroLottie}>
            <Lottie options={defaultOptions} width={"100%"} />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
