import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { editRole } from "../../actions/AdminActions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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
  roleName: "",
  description: "",
  writePermission: false,
};

export default function EditRole(props) {
  const [values, setValues] = useState(props.data);

  const handleClose = () => {
    props.onCloseModal();
  };

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const saveDetails = () => {
    console.log(values, "setofValues");
    if (values.roleName && values.description) {
      const obj = values;
      editRole(obj).then((resp) => {
        props.onCloseModal();
        props.getRolesDataAfterEdt();
      })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please Fill All Required Fields.");
    }
  };

  const handleToggle = () => () => {
    setValues((previousValues) => ({
      ...previousValues,
      writePermission: !values.writePermission,
    }));
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
          Edit Role
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
              Name *
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
              }}
              value={values.roleName}
              name="roleName"
              onChange={(e) => handleChange(e)}
              readOnly
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
              Description *
            </Typography>
            <TextareaAutosize
              rows={5}
              style={{
                margin: "23px 0 200px 0",
                width: "318px",
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "1px solid #262C49",
                "border-radius": "8px",
                padding: "6px",
              }}
              value={values.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </Typography>
          <Typography className="writeTitle" gutterBottom>
            <Checkbox
              checked={values.writePermission}
              tabIndex={-1}
              onClick={handleToggle()}
              name="writePermission"
            />
            <span>Write Permission</span>
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
              color: "white",
            }}
            onClick={() => saveDetails()}
          >
            Update
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
