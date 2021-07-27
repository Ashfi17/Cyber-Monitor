import React, { useContext, useEffect, useState } from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";
import { loginDetails } from "../../actions/authActions";
import Container from "@material-ui/core/Container";
import { appContext } from "../../App";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChangePassword from "../ChangePassword";
// const [ForgPassModalOpen, setChangeForgModalOpen] = React.useState(false);

const useStyles = makeStyles((theme) => ({
  heading: {
    // top: '0px',
    // left: '0px',
    width: "8px",
    height: "40px",
    "text-align": "left",
    font: "normal normal bold 34px/51px Raleway",
    "letter-spacing": "0px",
    color: " #7569EE",
  },
  headingWelcome: {
    font: "normal normal bold 34px/51px Raleway",
    "letter-spacing": "0px",
    opacity: 1,
    color: " #FFFFFF",
  },
  fieldName: {
    // marginLeft: "303px",
    height: "19px",
    "text-align": "left",
    font: "normal normal normal 16px/36px Raleway",
    "letter-spacing": "0px",
    color: "#FFFFFF",
    opacity: 1,
  },
  inputField: {
    "margin-top": "16px",
    // marginLeft: "303px",
    width: "270px",
    height: "50px",
    background: " #FFFFFF00 0% 0% no-repeat padding-box",
    border: "1px solid #FFFFFF",
    "border-radius": "5px",
    color: "#FFFFFF",
    opacity: 1,
  },
  loginButton: {
    top: "89px",
    width: "270px",
    height: "53px",
    background: "#7569EE 0% 0% no-repeat padding-box",
    "box-shadow": "0px 10px 20px #7569EE33",
    border: "1px solid #7569EE",
    "border-radius": "23px",
    color: "#FFFFFF",
    opacity: 1,
  },
  forgotPassword: {
    "font-size": "13px",
    font: "normal normal normal 16px/36px Raleway",
    "letter-spacing": "0px",
    color: "#FFFFFF",
    cursor: "pointer",
  },
}));

const initialState = {
  username: "admin@pacbot.org",
  password: "pacman",
};

const Login = (props) => {
  const classes = useStyles();
  const { authUser, setAuthUser } = useContext(appContext);

  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEnterClick = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      saveLoginDetails(event);
    }
  };

  // const callForgotPasswordModalBox = () => {
  //   setChangeForgModalOpen(true);
  // };

  const saveLoginDetails = (e) => {
    e.preventDefault();
    loginDetails(values)
      .then((response) => {
        if (response.data.success === true) {
          setAuthUser(response.data);
          props.history.push("/home-page");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      component="div"
      bgcolor="#262c49"
      minHeight="100vh"
      style={{ overflow: "hidden" }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <img
                style={{
                  float: "left",
                  padding: "20px",
                  cursor: "pointer",
                  marginLeft: "-110px",
                }}
                src={require("../../assets/images/cymonitorlogo.PNG")}
                alt="Dashboard"
              />
            </Grid>
            <Grid item md={6}>
              <div
                style={{
                  color: "white",
                  float: "right",
                  padding: "30px",
                  cursor: "pointer",
                }}
                onClick={(e) => props.history.push("/")}
              >
                <ArrowBackOutlinedIcon style={{ "margin-bottom": "-7px" }} />{" "}
                <span>Back Home</span>
              </div>
            </Grid>
          </Grid>
          <Grid item md={5} sm={6} xs={12}>
            <Box
              display="grid"
              placeContent="center"
              style={{ marginLeft: "81px", marginTop: "88px" }}
            >
              <Box component="h2">
                <span className={classes.headingWelcome}>Welcome to</span>
                <br />
                <span className={classes.heading}>cyMonitor</span>
              </Box>
              <Box component="div">
                <Typography className={classes.fieldName}>User Name</Typography>
                <input
                  type="text"
                  className={classes.inputField}
                  value={values.username}
                  name="username"
                  onKeyPress={(e) => handleEnterClick(e)}
                  onChange={(e) => handleChange(e)}
                />
                <Typography className={classes.fieldName}>Password</Typography>
                <input
                  type="password"
                  className={classes.inputField}
                  value={values.password}
                  name="password"
                  onKeyPress={(e) => handleEnterClick(e)}
                  onChange={(e) => handleChange(e)}
                />
                <Typography
                  className={classes.forgotPassword}
                  // onClick={callForgotPasswordModalBox}
                >
                  Forgot Password
                </Typography>
                <Button
                  className={classes.loginButton}
                  onClick={saveLoginDetails}
                >
                  LOGIN
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={7} sm={6} xs={12}>
            <img
              style={{ width: "855px", height: "618px" }}
              src={require("../../assets/images/logindashboardImg.PNG")}
              alt="Dashboard"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "89px" }}>
          <Grid item md={3} xs={4}>
            <img
              style={{ float: "left", padding: "20px", cursor: "pointer" }}
              src={require("../../assets/images/cymonitorlogo.PNG")}
              alt="Dashboard"
            />
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <div style={{ color: "white" }}>
                  <FacebookIcon />
                </div>
              </Grid>
              <Grid item xs={3}>
                <div style={{ color: "white" }}>
                  <InstagramIcon />
                </div>
              </Grid>
              <Grid item xs={3}>
                <div style={{ color: "white" }}>
                  <LinkedInIcon />
                </div>
              </Grid>
              <Grid item xs={3}>
                <div style={{ color: "white" }}>
                  <TwitterIcon />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={4}>
            <div
              style={{
                color: "white",
                padding: "25px",
                fontWeight: "bold",
              }}
            >
              Explore
            </div>
            <List
              component="nav"
              style={{
                color: "white",
                fontSize: "10px",
                "margin-left": "26px",
              }}
            >
              <ListItemText primary="Home" />
              <ListItemText primary="Feature" />
              <ListItemText primary="Why Us" />
              <ListItemText primary="Highlight" />
              <ListItemText primary="Login" />
            </List>
          </Grid>
          <Grid item md={3} xs={4}>
            <div
              style={{
                color: "white",
                padding: "25px",
                fontWeight: "bold",
              }}
            >
              Company
            </div>
            <List
              component="div"
              style={{
                color: "#FFFFFF",
                fontSize: "10px",
                "margin-left": "26px",
              }}
            >
              <ListItemText primary="About Us" />
              <ListItemText primary="Jobs" />
              <ListItemText primary="Blogs" />
              <ListItemText primary="Terms and Conditions" />
              <ListItemText primary="Privacy Policy" />
            </List>
          </Grid>
          <Grid item md={3} xs={4}>
            <div
              style={{
                color: "white",
                padding: "25px",
                fontWeight: "bold",
              }}
            >
              Join the Newsletter
            </div>
            <input
              type="text"
              placeholder="Email Id"
              className={classes.inputField}
              value={values.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <Button
              style={{
                top: "-45px",
                width: "99px",
                height: "42px",
                left: "168px",
                background: "#7569EE 0% 0% no-repeat padding-box",
                "box-shadow": "0px 10px 20px #7569EE33",
                border: "1px solid #7569EE",
                "border-radius": "23px",
                color: "#FFFFFF",
                opacity: 1,
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* <ChangePassword
        openPopUp01={ForgPassModalOpen}
        onCloseModal={(e) => setChangeForgModalOpen(false)}
      /> */}
    </Box>
  );
};

export default Login;
