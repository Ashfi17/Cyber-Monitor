import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import toastr from "toastr";
import OtpInput from "react-otp-input";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logoH from "../assets/images/CyMonitor_logo.svg";
import {
  getOtpForForgotPassword,
  userChangePassword,
} from "../actions/UserActions";
const initialState = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};
export default function ForgotPassword(props) {
  const [values, setValues] = useState(initialState);
  const [otpInputIs, setOtpInputIs] = React.useState(false);
  const [oneTimePassword, setOneTimePassword] = React.useState("");

  useEffect(() => {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }, []);

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };
  const submitEmail = (e) => {
    e.preventDefault();
    if (values.email) {
      var sendObj = {
        userId: values.email,
      };
      getOtpForForgotPassword(sendObj)
        .then((response) => {
          console.log("response", response.status);
          if (response.status === 200) {
            toastr.success("Otp sent Successfully!");
            setOtpInputIs(true);
          } else {
            toastr.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            if (error.status == 404) {
              toastr.error(error.data.message);
            } else {
              toastr.error(error.statusText);
            }
          } else {
            toastr.error(
              "Something went wrong, please try again after some time!"
            );
          }
        });
    } else {
      toastr.error("Email is required");
    }
  };

  const otpInputHandleChange = (value) => {
    setOneTimePassword(value);
  };

  const submitOTP = (e) => {
    e.preventDefault();
    if (oneTimePassword && values.confirmPassword && values.newPassword) {
      if (values.confirmPassword == values.newPassword) {
        var sendObj = {
          userId: values.email,
          otp: oneTimePassword,
          newPassword: values.confirmPassword,
        };

        userChangePassword(sendObj)
          .then((response) => {
            console.log("response", response.status);
            if (response.status === 200) {
              toastr.success("Password Changed Successfully!");
              setOtpInputIs(true);
            } else {
              toastr.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error) {
              if (error.status == 400) {
                toastr.error(error.data.message);
              } else {
                toastr.error(error.statusText);
              }
            } else {
              toastr.error(
                "Something went wrong, please try again after some time!"
              );
            }
          });
      } else {
        toastr.error("Password and Confirm Password must be match.");
      }
    } else {
      toastr.error("All Fields are Mandatory.");
    }
  };
  return (
    <div className="forgPassMainCom">
      <AppBar position="static" style={{ background: "#262C49" }}>
        <Toolbar variant="dense">
          <IconButton>
            <img src={logoH} style={{ width: "200px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid className="forgPassMain">
        <Typography gutterBottom>Forgot Password?</Typography>
        <form onSubmit={(e) => submitEmail(e)}>
          <Typography gutterBottom>
            <input
              type="email"
              placeholder="Enter email here"
              style={{
                margin: "25px 0",
                width: "100%",
                height: "40px",
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "1px solid rgb(236 236 236)",
                "border-radius": "8px",
                opacity: 1,
                padding: "0 7px",
              }}
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </Typography>
          {!otpInputIs && (
            <Typography gutterBottom className="getOtpBtn">
              <Button type="submit">Get OTP</Button>
            </Typography>
          )}
        </form>
        {otpInputIs && (
          <form onSubmit={(e) => submitOTP(e)}>
            <Grid className="getOtpMain">
              <OtpInput
                onChange={otpInputHandleChange}
                numInputs={6}
                separator={<span></span>}
                shouldAutoFocus
                value={oneTimePassword}
                isInputNum={true}
                className="getOtpNum"
              />
            </Grid>
            <Typography gutterBottom>
              <input
                type="password"
                placeholder="New Password"
                style={{
                  marginTop: "23px",
                  width: "100%",
                  height: "40px",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid rgb(236 236 236)",
                  "border-radius": "8px",
                  opacity: 1,
                  padding: "0 7px",
                }}
                name="newPassword"
                onChange={(e) => handleChange(e)}
              />
            </Typography>
            <Typography gutterBottom>
              <input
                type="password"
                placeholder="Confirm Password"
                style={{
                  margin: "25px 0",
                  width: "100%",
                  height: "40px",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid rgb(236 236 236)",
                  "border-radius": "8px",
                  opacity: 1,
                  padding: "0 7px",
                }}
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
              />
            </Typography>
            <Typography gutterBottom className="getOtpBtn">
              <Button type="submit">Change Password</Button>
            </Typography>
          </form>
        )}
      </Grid>
    </div>
  );
}
