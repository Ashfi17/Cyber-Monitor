import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import toastr from "toastr";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import moment from "moment";
import totalViolations1 from "../assets/images/Notification/01.svg";
import totalViolations2 from "../assets/images/Notification/02.svg";
import totalViolations3 from "../assets/images/Notification/03.svg";
import totalViolations4 from "../assets/images/Notification/04.svg";
import searchImg from "../assets/images/Notification/search.svg";
import addExceptionImg from "../assets/images/Notification/addException.svg";
import dateImg from "../assets/images/Notification/date.svg";
import sendImg from "../assets/images/Notification/send.svg";
import AddExceptionModal from "../components/AddExceptionModal";
import IssueEmailSendModal from "../components/IssueEmailSendModal";
import {
  getAllNotificationsCount,
  fetchAllNotifications,
} from "../actions/NotificationsActions";

const useStyles = makeStyles((theme) => ({
  searchInputForm: {
    "& > *": {
      width: "100%",
      background: "#fff",
    },
  },
}));

const initialState = {
  category: "",
  severity: "",
  searchTxt: "",
};

export default function Notification(props) {
  const classes = useStyles();
  const [searchAssetList, setSearchAssetList] = React.useState([]);
  const [issueCategoriesObj, setIssueCategoriesObj] = React.useState({});
  const [issueCategoriesArr, setIssueCategoriesArr] = React.useState([]);
  const [state, setState] = React.useState({ right: false });
  const [selectedNotifiObj, setSelectedNotifiObj] = useState({});
  const [viewIssuesList, setViewIssuesList] = useState([]);
  const [frFilterViewIssuesList, setFrFilterViewIssuesList] = useState([]);
  const [addExceptionModalOpenIs, setAddExceptionModalOpenIs] = useState(false);
  const [emailIssueModalOpenIs, setEmailIssueModalOpenIs] = useState(false);
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

  useEffect(() => {
    getCountOfAllNotification();
    getAllNotificationsList();
  }, []);

  const afterSuccessCloseModal = () => {
    getCountOfAllNotification();
    getAllNotificationsList();
    setAddExceptionModalOpenIs(false);
    setEmailIssueModalOpenIs(false);
  };

  const getCountOfAllNotification = () => {
    getAllNotificationsCount()
      .then((response) => {
        setIssueCategoriesObj(response.response);
        if (response.response.issue_categories.length > 0) {
          setIssueCategoriesArr(response.response.issue_categories);
        } else {
          toastr.error("No data found!");
        }
      })
      .catch((error) => {
        if (error) {
          if (error.status == 401) {
            toastr.error(error.data.error);
          } else {
            toastr.error(error.statusText);
          }
        } else {
          toastr.error(
            "Something went wrong, please try again after some time!"
          );
        }
      });
  };

  const getAllNotificationsList = () => {
    fetchAllNotifications()
      .then((response) => {
        if (response.response.issues.length > 0) {
          setViewIssuesList(response.response.issues);
          setFrFilterViewIssuesList(response.response.issues);
        } else {
          setViewIssuesList([]);
          setFrFilterViewIssuesList([]);
        }
      })
      .catch((error) => {
        if (error) {
          if (error.status == 401) {
            toastr.error(error.data.error);
          } else {
            toastr.error(error.statusText);
          }
        } else {
          toastr.error(
            "Something went wrong, please try again after some time!"
          );
        }
      });
  };

  const toggleDrawer = (anchor, open, dataObj) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setSelectedNotifiObj(dataObj);
  };

  const list = (anchor) => (
    <div
      style={{ width: 455, padding: 15 }}
      role="presentation"
      className="notificationSwipeableDrawer"
    >
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Typography className="notifictionSwipeablTitle">
            Policy Details
          </Typography>
          <Typography className="notifictionSwipeablTitleBold">
            {selectedNotifiObj.desc || "--"}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            style={{
              cursor: "pointer",
              float: "right",
              padding: "7px",
              fontWeight: "bold",
            }}
            onClick={toggleDrawer(anchor, false, {})}
          >
            X
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className="notifictionSwipeablTitle">Issue ID</Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            {selectedNotifiObj._id || "--"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="notifictionSwipeablTitle">
            Resource ID
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            {selectedNotifiObj._resourceid || "--"}
            {/* arn:aws:iam::791152816081:role/pacbot_lambda_basic_execution */}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className="notifictionSwipeablTitle">
            Violation Reason
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            Unapproved IAM role has [lambda:*]
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">
            Account Name
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            No Data
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">
            Account ID
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            {selectedNotifiObj.accountid || "--"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">Region</Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            No Data
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">
            Application
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            No Data
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">
            Environment
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            No Data
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">Status</Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            <span className="statusOpne">
              {selectedNotifiObj.issueStatus || "--"}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="notifictionSwipeablTitle">
            Description
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            {selectedNotifiObj.desc || "--"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">
            Rule Category
          </Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            <span className="tagsSpan">
              {selectedNotifiObj.ruleCategory || "--"}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">Severity</Typography>
          <Typography className="notifictionSwipeablTitleBold" noWrap>
            {selectedNotifiObj.severity && (
              <span
                className={`stautsBtn ${selectedNotifiObj.severity.toLowerCase() == "high"
                  ? "highClass"
                  : ""
                  } ${selectedNotifiObj.severity.toLowerCase() == "low" ? "lOW" : ""
                  } ${selectedNotifiObj.severity.toLowerCase() == "critical"
                    ? "cRITICAL"
                    : ""
                  }`}
              >
                {selectedNotifiObj.severity || "--"}
              </span>
            )}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">
            Created Date
          </Typography>
          <Typography
            className="notifictionSwipeablTitleBold"
            noWrap
            style={{ display: "flex" }}
          >
            <img src={dateImg} style={{ paddingRight: "5px" }} />
            {selectedNotifiObj.createdDate
              ? moment(selectedNotifiObj.createdDate).format("DD MMM YYYY")
              : "--"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className="notifictionSwipeablTitle">
            Modified Date
          </Typography>
          <Typography
            className="notifictionSwipeablTitleBold"
            noWrap
            style={{ display: "flex" }}
          >
            <img src={dateImg} style={{ paddingRight: "5px" }} />
            {selectedNotifiObj.modifiedDate
              ? moment(selectedNotifiObj.modifiedDate).format("DD MMM YYYY")
              : "--"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            className="comanBtn"
            onClick={() => setAddExceptionModalOpenIs(true)}
          >
            <img src={addExceptionImg} style={{ paddingRight: "5px" }} />
            Add Exception
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            className="comanBtn"
            onClick={() => setEmailIssueModalOpenIs(true)}
          >
            <img src={sendImg} style={{ paddingRight: "5px" }} />
            Email Issue
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  const handleChange = (event) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const catHandleChange = (event) => {
    var newArray = frFilterViewIssuesList.filter(function (el) {
      if (event.target.value) {
        return el.ruleCategory.toLowerCase() == event.target.value.toLowerCase();
      } else {
        return el;
      }
    });
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
      severity: "",
      searchTxt: "",
    }));
    setViewIssuesList(newArray);
  };

  const sevHandleChange = (event) => {
    var newArray = frFilterViewIssuesList.filter(function (el) {
      if (event.target.value) {
        return el.severity.toLowerCase() == event.target.value.toLowerCase();
      } else {
        return el;
      }
    });
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
      category: "",
      searchTxt: "",
    }));
    setViewIssuesList(newArray);
  };

  const searchHandleChange = (event) => {
    var newArray = frFilterViewIssuesList.filter(function (el) {
      var pattern = /^[a-z0-9]+$/i;
      if (pattern.test(event.target.value)) {
        return el.desc.toLowerCase().match(event.target.value.toLowerCase())
      } else {
        return el;
      }
    });
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
      category: "",
      severity: "",
    }));
    setViewIssuesList(newArray);
  };



  return (
    <div>
      <LayoutContainer pageName="Notification">
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <Grid className="totalViolationsNotif">
              {issueCategoriesObj?.ag && (
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Grid className="cuntoNoti">
                      <Typography variant="h3" component="h3" noWrap>
                        {issueCategoriesObj.total_issue_count}
                      </Typography>
                      <Typography className="overall" noWrap>
                        Overall
                      </Typography>
                      <Typography className="total" noWrap>
                        Total Violations
                      </Typography>
                    </Grid>
                  </Grid>
                  {issueCategoriesArr.map((element, i) => (
                    <Grid item xs key={i}>
                      <Grid className="cuntoNotiOtr">
                        <Grid className="imgTagNoti">
                          {element.issue_category.toLowerCase() ==
                            "security" && <img src={totalViolations1} />}
                          {element.issue_category.toLowerCase() ==
                            "cost optimization" && (
                              <img src={totalViolations2} />
                            )}
                          {element.issue_category.toLowerCase() ==
                            "governance" && <img src={totalViolations3} />}
                          {element.issue_category.toLowerCase() ==
                            "tagging" && <img src={totalViolations4} />}
                        </Grid>
                        <Typography variant="h3" component="h3" noWrap>
                          {element.issue_count}
                        </Typography>
                        <Typography className="overall" noWrap>
                          {element.issue_category}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                  {/* <Grid item xs>
                    <Grid className="cuntoNotiOtr">
                      <Grid className="imgTagNoti">
                        <img src={totalViolations2} />
                      </Grid>

                      <Typography variant="h3" component="h3" noWrap>
                        546
                      </Typography>
                      <Typography className="overall" noWrap>
                        Cost Optimization
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid className="cuntoNotiOtr">
                      <Grid className="imgTagNoti">
                        <img src={totalViolations3} />
                      </Grid>
                      <Typography variant="h3" component="h3" noWrap>
                        784
                      </Typography>
                      <Typography className="overall" noWrap>
                        Governance
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid className="cuntoNotiOtr">
                      <Grid className="imgTagNoti">
                        <img src={totalViolations4} />
                      </Grid>
                      <Typography variant="h3" component="h3" noWrap>
                        98
                      </Typography>
                      <Typography className="overall" noWrap>
                        Tagging
                      </Typography>
                    </Grid>
                  </Grid> */}
                </Grid>
              )}
            </Grid>
            <Grid className="listOfViolation">
              <Grid container spacing={3} alignItems="center">
                <Grid item xs>
                  <Typography variant="h5" component="h5" noWrap>
                    List of Violation
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Grid className="selecBoxItem">
                    <label htmlFor="category">Category:</label>
                    <select name="category" id="category" value={values.category} onChange={(e) => catHandleChange(e)}>
                      <option value="">All</option>
                      <option value="governance">Governance</option>
                      <option value="tagging">Tagging</option>
                      <option value="cost optimization">Cost Optimization</option>
                      <option value="security">Security</option>
                    </select>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid className="selecBoxItem">
                    <label htmlFor="severity">Severity:</label>
                    <select name="severity" id="severity" value={values.severity} onChange={(e) => sevHandleChange(e)}>
                      <option value="">All</option>
                      <option value="high">High</option>
                      <option value="low">Low</option>
                      <option value="critical">Critical</option>
                    </select>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Grid className="selecBoxItem inputItem">
                    <img src={searchImg} />
                    <input type="Search" placeholder="Search" name="searchTxt" value={values.searchTxt} onChange={(e) => searchHandleChange(e)} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="listOfViolationCardView">
              <Grid container spacing={3}>
                {viewIssuesList.map((element, i) => (
                  <Grid item xs={4} key={i}>
                    <Grid
                      className="cardViewNotification"
                      onClick={toggleDrawer("right", true, element)}
                    >
                      <Typography>{element.desc || "--"}</Typography>
                      <Grid className="cardFooterSec">
                        <Grid>
                          <span className="tagsSpan">
                            {element.ruleCategory || "--"}
                          </span>
                        </Grid>
                        <Grid>
                          <span
                            className={`stautsBtn ${element.severity.toLowerCase() == "high"
                              ? "highClass"
                              : ""
                              } ${element.severity.toLowerCase() == "low"
                                ? "lOW"
                                : ""
                              } ${element.severity.toLowerCase() == "critical"
                                ? "cRITICAL"
                                : ""
                              }`}
                          >
                            {element.severity || "--"}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                {/* <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      All AWS accounts should follow the IAM password policy
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Tagging</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn cRITICAL">CRITICAL</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      All Cloud watch events from all accounts should be sent to
                      DEDICATED ACCOUNTID default event bus
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Governance</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn lOW">LOW</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid> */}
              </Grid>
              {/* <Grid container spacing={3}>
                <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      Amazon EBS volumes should not be underutilized
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Tagging</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn highClass">HIGH</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      Amazon EC2 instances should not have low utilization
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Cost Optimization</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn lOW">LOW</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      Amazon RDS DB instances should not be idle
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Security</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn cRITICAL">CRITICAL</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      Amazon Redshift clusters should not be underutilized
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Security</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn lOW">LOW</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      An Ec2 instance with remotely exploitable vulnerability
                      (S5) should not be open to internet
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Security</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn highClass">HIGH</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs="4">
                  <Grid
                    className="cardViewNotification"
                    onClick={toggleDrawer("right", true, {})}
                  >
                    <Typography>
                      Any Ec2 instance should not have S3 vulnerability
                    </Typography>
                    <Grid className="cardFooterSec">
                      <Grid>
                        <span className="tagsSpan">Tagging</span>
                      </Grid>
                      <Grid>
                        <span className="stautsBtn cRITICAL">CRITICAL</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </LayoutContainer>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false, {})}
        onOpen={toggleDrawer("right", true, {})}
      >
        {list("right")}
      </SwipeableDrawer>
      <AddExceptionModal
        openModalIs={addExceptionModalOpenIs}
        onCloseModal={setAddExceptionModalOpenIs}
        afterSuccessCloseModal={afterSuccessCloseModal}
        selectedNotifiObj={selectedNotifiObj}
      />
      <IssueEmailSendModal
        openModalIs={emailIssueModalOpenIs}
        onCloseModal={setEmailIssueModalOpenIs}
        afterSuccessCloseModal={afterSuccessCloseModal}
        selectedNotifiObj={selectedNotifiObj}
      />
    </div>
  );
}
