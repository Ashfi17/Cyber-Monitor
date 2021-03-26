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
import { createDomain } from "../../actions/AdminActions";

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
  name: "",
  desc: "",
  config: "",
};

export default function AddTargetType(props) {
    const { rowData } = props;
    console.log(props.editData, 'editDataeditDataeditData')
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const saveDetails = () => {
    const obj = { ...values };
    createDomain(obj).then((resp) => {
        props.onCloseModal()
    }).catch((error) => {
        console.log(error)
    })
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
            fontWeight: 900,
          }}
        >
          Create Domain
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            <Typography
              style={{
                top: "111px",
                left: "650px",
                width: "57px",
                height: "16px",
                "text-align": "left",
                font: " normal normal bold 14px/51px Raleway",
                "letter-spacing": "0px",
                color: "#262C49",
                opacity: 0.5,
              }}
            >
              Domine
            </Typography>
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
              defaultValue={
                values.name
                ? values.name
                : rowData && rowData.lastName
            }
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </Typography>
          <Typography gutterBottom>
            <Typography
              style={{
                top: "111px",
                left: "650px",
                width: "57px",
                height: "16px",
                "text-align": "left",
                font: " normal normal bold 14px/51px Raleway",
                "letter-spacing": "0px",
                color: "#262C49",
                opacity: 0.5,
              }}
            >
              Description
            </Typography>
            <textarea
              type="text"
              rows="6"
              cols="41"
              style={{
                marginTop: "23px",
                // width: '318px',
                // height: '40px',
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "1px solid #262C49",
                "border-radius": "8px",
                opacity: 1,
              }}
              // value={values.username}
              name="desc"
              onChange={(e) => handleChange(e)}
            />
          </Typography>
          <Typography gutterBottom>
            <Typography
              style={{
                top: "111px",
                left: "650px",
                width: "57px",
                height: "16px",
                "text-align": "left",
                font: " normal normal bold 14px/51px Raleway",
                "letter-spacing": "0px",
                color: "#262C49",
                opacity: 0.5,
              }}
            >
              Config
            </Typography>
            <textarea
              type="text"
              rows="6"
              cols="41"
              style={{
                marginTop: "23px",
                // width: '318px',
                // height: '40px',
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "1px solid #262C49",
                "border-radius": "8px",
                opacity: 1,
              }}
              name="config"
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
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
