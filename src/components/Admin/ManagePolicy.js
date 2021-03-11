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
import DateRangeIcon from '@material-ui/icons/DateRange';

import {
  policyknowledgeApi,
  policyKnowledgeDescription,
} from "../../actions/complianceActions";

import { getPolicyList } from "../../actions/AdminActions";
import AddPolicy from "./AddPolicy";

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
    padding: theme.spacing(2),
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
    width: 261,
    height: 40,
    top: 63,
    left: 1055,
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

export default function ManagePolicy() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  const [policyKnowledgeData, setPolicyKnowledgeData] = useState([]);
  const [policyDetails, setPolicyDetails] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [policyListData, setPolicyListData] = useState([]);
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    const searchKey = "";
    policyknowledgeApi(searchKey)
      .then((resp) => {
        setPolicyKnowledgeData(resp.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const arryData = [];
    getPolicyList()
      .then((result) => {
        if (result && result.content) {
          result.content.map((data) => {
            const json = Object.assign({}, data);
            arryData.push(json);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(arryData, "arrayData");
    setPolicyListData(arryData);
  }, []);

  const handleChangeGrid = (data) => {
    if (data) {
      setPolicyDetails(data);
    }
  };

  const handleChangeSeverity = (event) => {
    const searchKey = event.target.value;
    policyknowledgeApi(searchKey)
      .then((resp) => {
        setPolicyKnowledgeData(resp.response);
      })
      .catch((error) => {
        console.log(error);
      });
    setSeverity(event.target.value);
  };
  const handleChangeCategory = (event) => {
    console.log(event.target.value);
    const searchKey = event.target.value;
    policyknowledgeApi(searchKey)
      .then((resp) => {
        setPolicyKnowledgeData(resp.response);
      })
      .catch((error) => {
        console.log(error);
      });
    setCategory(event.target.value);
  };

  const handleSearchResults = (e) => {
    setSearchKey(e.target.value);
    policyknowledgeApi(searchKey)
      .then((resp) => {
        setPolicyKnowledgeData(resp.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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
      {console.log(policyDetails, "policyDetails")}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "7px",
              fontWeight: "bold",
            }}
          >
            Policy Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
      </Grid>
      <Typography style={{ 'margin-top': '30px' }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Policy Id
        </Typography>
        <Typography
          style={{ color: "black", fontWeight: "bold", fontSize: "14px", 'margin-left': '10px' }}
        >
          {policyDetails && policyDetails[7]}
        </Typography>
      </Typography>
      <Typography style={{ 'margin-top': '30px' }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Policy Name
        </Typography>
        <Typography
          style={{ color: "black", fontWeight: "bold", fontSize: "14px", 'margin-left': '10px' }}
        >
          {policyDetails && policyDetails[4]}
        </Typography>
      </Typography>
      <Typography style={{ 'margin-top': '30px' }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Description
        </Typography>
        <Typography style={{ 'margin-left': '10px' }}>{policyDetails && policyDetails[3]}</Typography>
      </Typography>
      <Typography style={{ 'margin-top': '30px' }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Resolution
        </Typography>
        <Typography style={{ 'margin-left': '10px' }}>{policyDetails && policyDetails[2]}</Typography>
      </Typography>
      <Typography style={{ 'margin-top': '30px' }}>
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
              Rule{" "}
            </Typography>
            <Paper
              className={classes.paper1}
              style={{
                // background: "#D40A25",
                width: "130px",
                height: "35px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#7569EE", 'margin-left': '10px' }}>
							{policyDetails && policyDetails[8]}
              </span>
            </Paper>
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
              Version
            </Typography>
            <Paper
              className={classes.paper2}
              style={{
                background: "#26C76E",
                width: "130px",
                height: "35px",
                fontWeight: "bold",
              }}
            >
              <span style={{ color: "white", 'margin-left': '10px' }}>
                {policyDetails && policyDetails[6]}
              </span>
            </Paper>
          </Grid>
        </Grid>
      </Typography>
      <Typography style={{ 'margin-top': '30px' }}>
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
              Created Date {/* #7569EE */}
            </Typography>
            <span
              style={{ color: "black", padding: "10px", fontSize: "14px", 'margin-left': '10px' }}
            >
              <DateRangeIcon />{' '}{policyDetails && policyDetails[0]}
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
              style={{ color: "black", padding: "10px",fontSize: "14px", 'margin-left': '10px' }}
            >
              <DateRangeIcon />{' '} <span style={{ 'margin-bottom': '-6px' }}>{policyDetails && policyDetails[1]}</span>
            </span>
          </Grid>
        </Grid>
      </Typography>
			<div style={{ align: 'right' }} onClick={handleClickOpen}>
				<img  src={require("../../assets/images/Group 515.svg")} />
			</div>
    </div>
  );

  return (
    <div className={classes.root}>
      <LayoutContainer>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button className={classes.addNewButton} onClick={handleClickOpen}>
              Add New
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.paper3}>
              <Paper component="form" className={classes.root1}>
                <Typography style={{ color: "#b2bbbf", fontSize: 14 }}>
                  Category :{"  "}
                  <FormControl style={{ width: "164px", height: 0 }}>
                    <Select
                      native
                      value={category}
                      onChange={handleChangeCategory}
                    >
                      <option value={""}>All</option>
                      <option value={"Tagging"}>Tagging</option>
                      <option value={"Governance"}>Governance</option>
                      <option value={"Security"}>Security</option>
                      <option value={"Cost Optimization"}>
                        Cost Optimization
                      </option>
                    </Select>
                  </FormControl>
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.paper3}>
              <Paper component="form" className={classes.root1}>
                <Typography style={{ color: "#b2bbbf", fontSize: 14 }}>
                  Severity :{"  "}
                  <FormControl style={{ width: "164px", height: 0 }}>
                    <Select
                      native
                      value={severity}
                      onChange={handleChangeSeverity}
                    >
                      <option value={""}>All</option>
                      <option value={"Critical"}>Critical</option>
                      <option value={"High"}>High</option>
                      <option value={"Low"}>Low</option>
                    </Select>
                  </FormControl>
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.paper3}>
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
            </Typography>
          </Grid>
        </Grid>
        <React.Fragment key={"right"}>
          <Grid
            style={{ marginTop: "30px" }}
            container
            justify="center"
            spacing={3}
            onClick={toggleDrawer("right", true)}
          >
            {policyListData &&
              policyListData.map((data, index) => (
                <Grid
                  key={index}
                  item
                  onClick={() => handleChangeGrid(data)}
                  style={{ cursor: "pointer" }}
                >
                  {console.log(data[7], "datadatadata")}
                  <Paper className={classes.paper}>
                    <div style={{ color: "black", fontWeight: "bold" }}>
                      {data[7]}
                    </div>
                    <br />
                    <div>{data[4]}</div>
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <Paper
                          // className={classes.paper2}
                          style={{
                            textAlign: "center",
                            width: "43px",
                            height: "30px",
                            background: "#262C49 0% 0% no-repeat padding-box",
                            "border-radius": "6px",
                          }}
                        >
                          <span style={{ color: "#ffffff" }}>
                            {data[8]}
                            {/* {'01'} */}
                          </span>
                        </Paper>
                      </Grid>
                      <Grid item xs>
                        <Paper
                          style={{
                            textAlign: "center",
                            width: "87px",
                            height: "30px",
                            background: "#26C76E 0% 0% no-repeat padding-box",
                            "border-radius": "6px",
                          }}
                        >
                          <span
                            style={{
                              font: "normal normal medium 14px/18px Poppins",
                              color: "#ffffff",
                            }}
                          >
                            {data[6]}
                          </span>
                        </Paper>
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
      <AddPolicy openPopUp={open} onCloseModal={(e) => setOpen(false)} />
    </div>
  );
}
