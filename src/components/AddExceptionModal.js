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
import TextField from "@material-ui/core/TextField";
import toastr from "toastr";
import { Grid } from "@material-ui/core";
import moment from "moment";
import { sendUserException } from "../actions/NotificationsActions";

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
  reason: "",
  currentDate: new Date(),
};

export default function AddExceptionModal(props) {
  const { openModalIs, onCloseModal, selectedNotifiObj, afterSuccessCloseModal } = props;
  const [values, setValues] = useState(initialState);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    var userData = localStorage.getItem("currentUserLoginDetails");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

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

  const handleClose = () => {
    props.onCloseModal();
  };

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const addExcSubmitFun = () => {
    console.log("values", values);
    // e.preventDefault();
    if (values.reason) {
      var sendObj = {
        "createdBy": userData.userInfo.userId,
        "exceptionEndDate": moment(values.currentDate).format("YYYY-MM-DD"),
        "exceptionGrantedDate": moment(values.currentDate).format("YYYY-MM-DD"),
        "exceptionReason": values.reason,
        "issueIds": [selectedNotifiObj._id]
      };
      sendUserException(sendObj)
        .then((response) => {
          console.log("response", response);
          if (response.status === "Success") {
            toastr.success("Added Successfully!");
            afterSuccessCloseModal();
          } else {
            toastr.error(response.data.message);
          }
        })
        .catch((error) => {
          if (error) {
            if (error.status == 417) {
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
      toastr.error("All Fields are Mandatory.");
    }
  };

  return (
    <div>
      <Dialog
        className="addExceptionModalBox"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModalIs}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{
            textAlign: "center",
            font: "normal normal bold 18px/51px Raleway",
            letterSpacing: 0,
            color: "#262C49",
          }}
        >
          {/* AddExceptionModal <br />(<span>{userId}</span>) */}
          Add Exception
        </DialogTitle>
        <DialogContent>
          {/* <form onSubmit={(e) => saveNewPassword(e)}> */}
          <TextField
            id="outlined-multiline-static"
            label="Reason"
            multiline
            rows={4}
            variant="outlined"
            name="reason"
            onChange={(e) => handleChange(e)}
          />
          <Grid className="selectDateInput">
            <TextField
              id="date"
              label="End Date"
              type="date"
              name="currentDate"
              defaultValue={moment(new Date()).format("YYYY-MM-DD")}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChange(e)}
              disabled
            />
            <Grid className="addExceptionBtn">
              <Button onClick={() => addExcSubmitFun()}>Add Exception</Button>
            </Grid>
          </Grid>

          {/* </form> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
