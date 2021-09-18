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
import toastr from "toastr";
import { Grid } from "@material-ui/core";
import moment from "moment";
import { sendEmailForIssue } from "../actions/NotificationsActions";

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
  fromEmail: "violations.support@pacbot.org",
  toEmail: "",
};

export default function IssueEmailSendModal(props) {
  const { openModalIs, onCloseModal, afterSuccessCloseModal, selectedNotifiObj } = props;
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
    onCloseModal();
  };

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const sendIssueEmailFun = (e) => {
    e.preventDefault();
    if (values.fromEmail && values.toEmail) {
      var sendObj = {
        "attachmentUrl": "https://s3.us-east-2.amazonaws.com/pacbot-data-us-east-2-791152816081/pacman-v2-email-template/html.handlebars",
        "from": values.fromEmail,
        "mailTemplateUrl": "https://s3.us-east-2.amazonaws.com/pacbot-data-us-east-2-791152816081/pacman-v2-email-template/html.handlebars",
        "placeholderValues": {
          "link": "http://pacbot-2030676945.us-east-2.elb.amazonaws.com/pl/(compliance/issue-details/92c08994aa426d0e7ef60fc94ad32dbc)?ag=aws&domain=Infra%20%26%20Platforms?ag=aws",
          "name": "",
          "statusName": "Status",
          "statusFooter": selectedNotifiObj.issueStatus,
          "severityName": "Severity",
          "severityFooter": selectedNotifiObj.severity,
          "targetTypeName": "Target Type",
          "targetTypeFooter": "iamrole",
          "ruleCategoryName": "Rule Category",
          "ruleCategoryFooter": selectedNotifiObj.ruleCategory,
          "policyViolated": "Non-white listed  IAM Role Should not have Lambda  privilege",
          "policyDescription": selectedNotifiObj.desc,
          "violationReason": "Unapproved IAM role has [lambda:*]",
          "resourceId": selectedNotifiObj._resourceid,
          "createdOn": selectedNotifiObj.createdDate,//moment(new Date()).format("MM-DD-YYYY"),
          "lastModifiedDate": selectedNotifiObj.modifiedDate, //moment(new Date()).format("MM-DD-YYYY"),
          "templatePath": "https://s3.us-east-2.amazonaws.com/pacbot-data-us-east-2-791152816081/pacman-v2-email-template"
        },
        "subject": "Issue Details",
        "to": [values.toEmail]
      };
      sendEmailForIssue(sendObj)
        .then((response) => {
          toastr.success("Email Sent Successfully!");
          // afterSuccessCloseModal();
          handleClose();
          /* if (response.status === "Success") {
          } else {
            toastr.error(response.data.message);
          } */
        })
        .catch((error) => {
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
      toastr.error("All Fields are Mandatory.");
    }
  };

  return (
    <div>
      <Dialog
        className="addExceptionModalBox emailSend"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModalIs}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{
            "text-align": "center",
            font: "normal normal bold 18px/51px Raleway",
            "letter-spacing": "0px",
            color: "#262C49",
            opacity: 1,
            fontWeight: 900,
          }}
        >
          {/* IssueEmailSendModal <br />(<span>{userId}</span>) */}
          Send Email
        </DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => sendIssueEmailFun(e)}>
            <Grid className="emailSendInfo">
              <label>From</label>
              <input type="text" name="fromEmail" onChange={(e) => handleChange(e)} defaultValue="violations.support@pacbot.org" disabled />
            </Grid>
            <Grid className="emailSendInfo" style={{ marginTop: 20 }}>
              <label>To</label>
              <input type="text" name="toEmail" onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid className="addExceptionBtn">
              <Button type="submit">Send Email</Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
