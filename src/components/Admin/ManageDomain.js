import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LayoutContainer from "../reusableComponent/LayoutContainer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, Typography, Button } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AddDomain from "./AddDomain";
import { getAdminDomains } from "../../actions/AdminActions";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "10px",
    textAlign: "left",
    color: "black",
    height: 191,
    maxWidth: 266,
    "border-radius": "10px",
  },
  paper1: {
    textAlign: "center",
    background: "#F1F3F9 0% 0% no-repeat padding-box",
    "border-radius": "4px",
  },
  paper2: {
    textAlign: "center",
    background: "#F1F3F9 0% 0% no-repeat padding-box",
    "border-radius": "4px",
  },
  paper3: {
    top: "63px",
    left: "563px",
    width: "241px",
    height: "40px",
  },
  iconButton: {
    padding: 10,
  },
  root1: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 261,
    height: 40,
    // top: 63,
    // left: 1055,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  addNewButton: {
    "margin-left": "16px",
    width: "144px",
    height: "40px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    "box-shadow": "0px 6px 10px #7569EE26",
    border: "1px solid #7569EE",
    "border-radius": "8px",
    opacity: 1,
  },
}));

const arrayData = [
  {
    name: "AmazonRDSIdleDBInstancesRule",
    ruleId: "PacMan_ACMCertificate_version-1",
    Severity: "Low",
    status: "Enable",
  },
  {
    name: "AmazonRDSIdleDBInstancesRule",
    ruleId: "PacMan_ACMCertificate_version-1",
    Severity: "High",
    status: "Enable",
  },
  {
    name: "AmazonRDSIdleDBInstancesRule",
    ruleId: "PacMan_ACMCertificate_version-1",
    Severity: "High",
    status: "Disable",
  },
  {
    name: "AmazonRDSIdleDBInstancesRule",
    ruleId: "PacMan_ACMCertificate_version-1",
    Severity: "Low",
    status: "Disable",
  },
  {
    name: "AmazonRDSIdleDBInstancesRule",
    ruleId: "PacMan_ACMCertificate_version-1",
    Severity: "Low",
    status: "Enable",
  },
  {
    name: "AmazonRDSIdleDBInstancesRule",
    ruleId: "PacMan_ACMCertificate_version-1",
    Severity: "High",
    status: "Enable",
  },
  {
    name: "AmazonRDSIdleDBInstancesRule",
    ruleId: "PacMan_ACMCertificate_version-1",
    Severity: "Low",
    status: "Disable",
  },
];

export default function ManageDomain() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  //   const [policyKnowledgeData, setPolicyKnowledgeData] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [domainList, setDomainList] = useState([]);
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    const searchKey = "";
    let arryData = [];
    getAdminDomains(searchKey)
      .then((result) => { 
        arryData = [];
        if (result && result.content) {
            result.content.map((data) => {
              const json = Object.assign({}, data);
              arryData.push(json);
            });
          }
        setDomainList(arryData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeGrid = (data) => {
    if (data) {
      setSelectedDomain(data);
    }
  };

  //   const handleChangeSeverity = (event) => {
  //     const searchKey = event.target.value;
  //     policyknowledgeApi(searchKey)
  //       .then((resp) => {
  //         setPolicyKnowledgeData(resp.response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     setSeverity(event.target.value);
  //   };
  //   const handleChangeCategory = (event) => {
  //     const searchKey = event.target.value;
  //     policyknowledgeApi(searchKey)
  //       .then((resp) => {
  //         setPolicyKnowledgeData(resp.response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     setCategory(event.target.value);
  //   };

  //   const handleSearchResults = (e) => {
  //     setSearchKey(e.target.value);
  //     policyknowledgeApi(searchKey)
  //       .then((resp) => {
  //         setPolicyKnowledgeData(resp.response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosePopUp = () => {
    setOpen(false)
    let arryData = [];
    getAdminDomains(searchKey)
      .then((result) => { 
        arryData = [];
        if (result && result.content) {
            result.content.map((data) => {
              const json = Object.assign({}, data);
              arryData.push(json);
            });
          }
        setDomainList(arryData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{ width: 455 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        style={{
          cursor: "pointer",
          float: "right",
          padding: "7px",
          fontWeight: "bold",
        }}
      >
        X
      </Typography>
      <Typography style={{ "margin-top": "30px" }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Domain Name
        </Typography>
        <Typography
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "14px",
            "margin-left": "10px",
          }}
        >
          {selectedDomain && selectedDomain[1]}
        </Typography>
      </Typography>
      {/* <Typography style={{ "margin-top": "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Configuration
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                "margin-left": "10px",
              }}
            >
              {selectedDomain && selectedDomain.targetDesc}
            </span>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Category
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                "margin-left": "10px",
              }}
            >
              {selectedDomain && selectedDomain.category}
            </span>
          </Grid>
        </Grid>
      </Typography> */}
        <Typography style={{ "margin-top": "30px" }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
         Configuration
        </Typography>
        <Typography
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "14px",
            "margin-left": "10px",
          }}
        >
          {selectedDomain && selectedDomain[2]}
        </Typography>
      </Typography>
      <Typography style={{ "margin-top": "30px" }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Domain Description{" "}
        </Typography>
        <Typography
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "14px",
            "margin-left": "10px",
          }}
        >
          {selectedDomain && selectedDomain[0]}
        </Typography>
      </Typography>
      <Typography style={{ "margin-top": "30px" }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Asset Type Count
        </Typography>
        <Typography
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "14px",
            "margin-left": "10px",
          }}
        >
          {selectedDomain && selectedDomain[3]}
        </Typography>
      </Typography>
      {/* <Typography style={{ "margin-top": "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "7px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Data Source{" "}
            </Typography>
            <Typography
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
                "margin-left": "10px",
              }}
            >
              {selectedDomain.dataSourceName === "aws" ? (
                <img
                  src={require("../../assets/images/aws_logo.png")}
                  style={{ height: "43px", marginTop: "10px" }}
                />
              ) : (
                <img
                  src={require("../../assets/images/azure.PNG")}
                  style={{ height: "43px", marginTop: "10px" }}
                />
              )}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "7px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Domain
            </Typography>
            <Typography style={{ "margin-left": "10px" }}>
              {selectedDomain && selectedDomain.domain}
            </Typography>
          </Grid>
        </Grid>
      </Typography> */}
      {/* <Typography style={{ "margin-top": "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Created Date
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                "margin-left": "10px",
              }}
            >
              No Data
            </span>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Modified Date
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                "margin-left": "10px",
              }}
            >
              Manage Rule
            </span>
          </Grid>
        </Grid>
      </Typography> */}
      <div style={{ marginLeft: '355px', marginTop: '154px', cursor: 'pointer' }} onClick={handleClickOpen}>
        <img src={require("../../assets/images/Group 515.svg")} />
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <LayoutContainer>
        <Grid container spacing={3}>
          <Grid item xs={5} sm={2}>
            <Button className={classes.addNewButton} onClick={handleClickOpen}>
              Add New
            </Button>
          </Grid>
          {/* <Grid item xs={5} sm={2}>
            <Paper component="form" className={classes.root1}>
              <Typography style={{ color: "#b2bbbf", fontSize: 14 }}>
                <div style={{ marginTop: '32px' }}>Asset Group :{"  "}</div>
                <FormControl>
                  <Select
                    native
                    value={category}
                      onChange={handleChangeCategory}
                  >
                    <option value={""}>AWS</option>
                  </Select>
                </FormControl>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={5} sm={2}>
            <Paper component="form" className={classes.root1}>
              <Typography style={{ color: "#b2bbbf", fontSize: 14, width: '103px',marginLeft: '69px', marginBottom: '38px' }}>
              <span>Status :{"  "}</span>
                <FormControl >
                  <Select
                    native
                    value={category}
                      onChange={handleChangeCategory}
                  >
                    <option value={""}>All</option>
                    <option value={"Enable"}>Enable</option>
                    <option value={"Disable"}>Disable</option>
                  </Select>
                </FormControl>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={5} sm={2}>
            <Paper component="form" className={classes.root1}>
              <Typography style={{ color: "#b2bbbf", fontSize: 14 }}>
              <div style={{ marginTop: '24px' }}>Rule Type :{"  "}</div>
                <FormControl>
                  <Select
                    native
                    value={severity}
                      onChange={handleChangeSeverity}
                  >
                    <option value={""}>Manage Rule</option>
                  </Select>
                </FormControl>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={5} sm={2}>
            <Paper component="form" className={classes.root1}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Search"
                inputProps={{ "aria-label": "search google maps" }}
                  onChange={(e) => handleSearchResults(e)}
              />
            </Paper>
          </Grid> */}
        </Grid>
        <React.Fragment key={"right"}>
          <Grid
            style={{ marginTop: "30px" }}
            container
            justify="center"
            spacing={3}
            onClick={toggleDrawer("right", true)}
          >
            {domainList &&
              domainList.map((data, index) => (
                <Grid
                  key={index}
                  item
                  onClick={() => handleChangeGrid(data)}
                  style={{ cursor: "pointer", width: "290px" }}
                >
                  <Paper className={classes.paper}>
                    <div style={{ color: "black", fontWeight: "bold" }}>
                      {data[1]}
                    </div>
                    <br />
                    <div>{data[0]}</div>
                    <Grid
                      container
                      spacing={3}
                      style={{ marginTop: "28px", marginLeft: "-4px" }}
                    >
                      <Grid item item xs={8}>
                        <div style={{ marginBottom: "12px" }}>Asset Group Count</div>
                        <div
                          style={{
                            marginTop: "-11px",
                            textAlign: "center",
                            width: "120px",
                            height: "30px",
                            background: "#262C49 0% 0% no-repeat padding-box",
                            "border-radius": "6px",
                          }}
                        >
                          <span style={{ color: "#ffffff" }}>
                            {data[3]}
                          </span>
                        </div>
                      </Grid>
                      <Grid item item xs={4}>
                      <div style={{ marginBottom: "5px" }}>Config</div>
                        <div>
                          <span>
                            {data[2]}
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </React.Fragment>
      </LayoutContainer>
      <AddDomain openPopUp={open} editData={selectedDomain} onCloseModal={(e) => handleClosePopUp(e)} />
    </div>
  );
}
