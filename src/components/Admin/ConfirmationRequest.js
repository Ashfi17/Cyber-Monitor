import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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

export default function AddPolicy(props) {
  const [value, setValue] = useState('');

  // const handleClose = () => {
  //   props.onCloseModal();
  // };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveDetails = () => {
    console.log(value, "setofValues");
  };

  return (
    <div>
      <Dialog
        maxWidth="378px"
        maxHeight="805px"
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
            fontWeight: 'bold',

          }}
        >
          Confirmation Required
        </DialogTitle>
        <DialogContent>
            <Typography style={{ 'text-align': 'center', 'font-size': '14px' }}>This action will stop PacBot compliance </Typography>
            <Typography style={{ 'text-align': 'center', 'font-size': '14px' }}>  evaluation for all cloud resources ( Rules ).</Typography>
            <Typography style={{ 'text-align': 'center', 'font-size': '14px', marginTop: '13px' }}>Type "Confirm" to Authorize.</Typography>
          <Typography gutterBottom>
            <input
              type="text"
              style={{
                marginTop: "23px",
                width: "318px",
                height: "40px",
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "1px solid #262C49",
                "border-radius": "8px",
                opacity: 1,
              }}
              name="confirm"
              onChange={(e) => handleChange(e)}
            />
          </Typography>
          <Button
            style={{
              marginTop: "35px",
              width: "318px",
              height: "40px",
              background:
                "transparent linear-gradient(270deg, #827BDF 0%, #5D55C8 100%) 0% 0% no-repeat padding-box",
              "box-shadow": "0px 0px 10px #7C69E966",
              "border-radius": "10px",
              opacity: 1,
              color: "white",
            }}
            onClick={() => saveDetails()}
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
