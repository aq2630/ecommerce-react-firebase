import React from "react";
import * as classes from "./Footer.module.css";
import logo from "../../images/ht-logo.png";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const Footer = () => {
  return (
    <Box>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={12} md={4}>
              <img src={logo} alt="hashtag" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Conatct Us</Typography>
              <Box className={classes.phoneIcon}>
                <Typography variant="body1">
                  <PhoneIcon /> : 0340-8323906
                </Typography>
              </Box>
              <Typography variant="body1">
                <EmailIcon /> : info@hashtagstore.pk
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <ul className={classes.footerLinks}>
                <li>
                  <Link>Terms and Conditions</Link>
                </li>
                <li>
                  <Link>Privacy Policy</Link>
                </li>
                <li>
                  <Link>Return Policy</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Container>

        <Link
          href="https://wa.me/923408323906"
          className={classes.whatsAppLink}
        >
          <IconButton size="medium" className={classes.iconButton}>
            <WhatsAppIcon fontSize="large" className={classes.whatsAppIcon} />
          </IconButton>
        </Link>
      </Box>
      <Box className={classes.copyrights}>
        <Typography variant="body1">
          2021- Copyrights - All Rights Reserved - Hashtag Store
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
