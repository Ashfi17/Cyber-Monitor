import React, { useState, useRef, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import toastr from "toastr";
import { updateIssueAssignee } from "../actions/AdminActions";

const initialState = {
  issueType: "",
  assignee: "",
};

const IssueAssigneesEdit = (props) => {
  const { open, setOpen, setClose, selectedIssueObj } = props;
  const [values, setValues] = useState(initialState);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let obj = {
      issueType: selectedIssueObj.code,
      assignee: selectedIssueObj.assignee,
    };
    setValues(obj);
  }, [selectedIssueObj]);

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const submitAssigneeChange = (e) => {
    e.preventDefault();
    let send_data = {
      assignee: values.assignee,
      code: selectedIssueObj.code,
      name: selectedIssueObj.name,
    };
    updateIssueAssignee(send_data)
      .then((response) => {
        if (response.message == "success") {
          toastr.success("Assignee Changed Successfully!");
          setClose();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status == 417) {
          toastr.error(error.data.message);
        } else {
          toastr.error(
            "Something went wrong, please try again after some time!"
          );
        }
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className="AssigneesModel"
    >
      <DialogTitle className="addMoneyNEFT">
        Update Assignee
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {selectedIssueObj?.code && (
          <form onSubmit={(e) => submitAssigneeChange(e)}>
            <Box component="div">
              <Typography>Issue Type</Typography>
              <input
                type="text"
                value={values.issueType}
                name="issueType"
                readOnly
                className="readOnly allowed"
              />
            </Box>
            <Box component="div">
              <Typography>Assignee</Typography>
              <input
                type="text"
                value={values.assignee}
                name="assignee"
                onChange={(e) => handleChange(e)}
                className="readOnly"
              />
            </Box>
            <Box>
              <Button className="upBtn" type="submit">
                Update
              </Button>
            </Box>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default withRouter(IssueAssigneesEdit);
