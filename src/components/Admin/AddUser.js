import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { addNewUser } from "../../actions/AdminActions";
import toastr from "toastr";

const styles = (theme) => ({
  fieldName: {
    // marginLeft: "303px",
    width: "83px",
    height: "19px",
    textAlign: "left",
    font: "normal normal normal 16px/36px Raleway",
    letterSpacing: "0px",
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
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const initialState = {
  emailId: "",
  firstName: "",
  lastName: "",
  password: "",
};

export default function AddUser(props) {
  const [values, setValues] = useState(initialState);
  const [userId, setUserId] = useState("");
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

  useEffect(() => {
    var userData = JSON.parse(localStorage.getItem("currentUserLoginDetails"));
    if (userData) {
      setUserId(userData.userInfo.userId);
    }
    setValues(initialState);
  }, []);

  useEffect(() => {
    setValues(initialState);
  }, [props.openPopUp]);

  const handleClose = () => {
    props.onCloseModal();
  };

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const saveNewUserDetails = (e) => {
    e.preventDefault();
    if (
      values.emailId &&
      values.firstName &&
      values.lastName &&
      values.password
    ) {
      var sendObj = {
        userId: values.emailId,
        userName: values.emailId,
        email: values.emailId,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      };
      addNewUser(sendObj)
        .then((response) => {
          if (response.status === 200) {
            toastr.success("User Added Successfully!");
            handleClose();
          } else {
            toastr.error(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.status && error.status == 400) {
            toastr.error(error.data.message);
          } else {
            toastr.error(error.statusText);
          }
        });
    } else {
      toastr.error("All Fields are Mandatory.");
    }
  };

  return (
    <div>
      <Dialog
        className="changePassModalBox"
        onClose={props.onCloseModal}
        aria-labelledby="customized-dialog-title"
        open={props.openPopUp}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={props.onCloseModal}
          style={{
            "text-align": "center",
            font: "normal normal bold 18px/51px Raleway",
            "letter-spacing": "0px",
            color: "#262C49",
            opacity: 1,
            fontWeight: 900,
          }}
        >
          Add User
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => saveNewUserDetails(e)}>
            <Typography gutterBottom>
              <Typography
                style={{
                  top: "111px",
                  left: "650px",
                  height: "16px",
                  "text-align": "left",
                  font: " normal normal bold 14px/51px Raleway",
                  "letter-spacing": "0px",
                  color: "#262C49",
                  opacity: 0.5,
                }}
              >
                Email
              </Typography>
              <input
                type="email"
                style={{
                  marginTop: "23px",
                  width: "100%",
                  height: "40px",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid #262C49",
                  "border-radius": "8px",
                  opacity: 1,
                }}
                // value={values.username}
                name="emailId"
                onChange={(e) => handleChange(e)}
              />
            </Typography>
            <Typography gutterBottom>
              <Typography
                style={{
                  top: "111px",
                  left: "650px",
                  height: "16px",
                  "text-align": "left",
                  font: " normal normal bold 14px/51px Raleway",
                  "letter-spacing": "0px",
                  color: "#262C49",
                  opacity: 0.5,
                }}
              >
                First Name
              </Typography>
              <input
                type="text"
                style={{
                  marginTop: "23px",
                  width: "100%",
                  height: "40px",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid #262C49",
                  "border-radius": "8px",
                  opacity: 1,
                }}
                // value={values.username}
                name="firstName"
                onChange={(e) => handleChange(e)}
              />
            </Typography>

            <Typography gutterBottom>
              <Typography
                style={{
                  top: "111px",
                  left: "650px",
                  height: "16px",
                  "text-align": "left",
                  font: " normal normal bold 14px/51px Raleway",
                  "letter-spacing": "0px",
                  color: "#262C49",
                  opacity: 0.5,
                }}
              >
                Last Name
              </Typography>
              <input
                type="text"
                style={{
                  marginTop: "23px",
                  width: "100%",
                  height: "40px",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid #262C49",
                  "border-radius": "8px",
                  opacity: 1,
                }}
                // value={values.username}
                name="lastName"
                onChange={(e) => handleChange(e)}
              />
            </Typography>
            <Typography gutterBottom>
              <Typography
                style={{
                  top: "111px",
                  left: "650px",
                  height: "16px",
                  "text-align": "left",
                  font: " normal normal bold 14px/51px Raleway",
                  "letter-spacing": "0px",
                  color: "#262C49",
                  opacity: 0.5,
                }}
              >
                Password
              </Typography>
              <input
                type="password"
                style={{
                  marginTop: "23px",
                  width: "100%",
                  height: "40px",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",
                  border: "1px solid #262C49",
                  "border-radius": "8px",
                  opacity: 1,
                }}
                // value={values.username}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </Typography>

            <Button
              type="submit"
              style={{
                marginTop: "35px",
                width: "100%",
                height: "40px",
                background:
                  "transparent linear-gradient(270deg, #827BDF 0%, #5D55C8 100%) 0% 0% no-repeat padding-box",
                "box-shadow": "0px 0px 10px #7C69E966",
                "border-radius": "10px",
                opacity: 1,
                color: "white",
              }}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
