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

import { policyknowledgeApi, policyKnowledgeDescription } from '../../actions/complianceActions'

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
    height: 140,
    width: 370,
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
}));

export default function PolicyKnowledge() {
  
  const classes = useStyles();
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  const [policyKnowledgeData, setPolicyKnowledgeData] = useState([]);
  const [ policyKnowledgeDes, setPolicyKnowledgeDes ] = useState({})
  const [searchKey, setSearchKey] = useState('')
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    const searchKey = ''
    policyknowledgeApi(searchKey).then((resp) => {
      setPolicyKnowledgeData(resp.response)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const handleChangeGrid = (data) => {
    if (data) {
      policyKnowledgeDescription(data.ruleId).then((resp) => {
        setPolicyKnowledgeDes(resp)
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const handleChangeSeverity = (event) => {
    const searchKey = event.target.value
    policyknowledgeApi(searchKey).then((resp) => {
      setPolicyKnowledgeData(resp.response)
    }).catch((error) => {
      console.log(error)
    })
    setSeverity(event.target.value);
  };
  const handleChangeCategory = (event) => {
    console.log(event.target.value)
    const searchKey = event.target.value
    policyknowledgeApi(searchKey).then((resp) => {
      setPolicyKnowledgeData(resp.response)
    }).catch((error) => {
      console.log(error)
    })
    setCategory(event.target.value);
  };

  const handleSearchResults = (e) => {
    setSearchKey(e.target.value)
    policyknowledgeApi(searchKey).then((resp) => {
      setPolicyKnowledgeData(resp.response)
    }).catch((error) => {
      console.log(error)
    })
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
      {/* {console.log(policyKnowledgeDes.filter(data => data)), 'policyKnowledgeDes')} */}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "15px",
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
              padding: "15px",
              fontWeight: "bold",
            }}
          >
            X
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: "bold", padding: "15px" }}>
           {policyKnowledgeDes && policyKnowledgeDes.displayName}
          </Typography>
        </Grid>
      </Grid>
      <Typography style={{ padding: "15px", color: '#b3b0af' }}>Description</Typography>
      <Typography style={{ padding: "15px" }}>
        {policyKnowledgeDes && policyKnowledgeDes.ruleDescription}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "15px",
							color: '#b3b0af',
            }}
          >
            Category{" "}
          </Typography>
          <Paper className={classes.paper1}
						style={{
              // background: "#D40A25",
              width: "130px",
              height: "35px",
            }}
					>
            <span style={{ color: "#7569EE" }}>
              {policyKnowledgeDes && policyKnowledgeDes.ruleCategory}
            </span>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "15px",
							color: '#b3b0af',
            }}
          >
            Severity
          </Typography>
          <Paper
            className={classes.paper2}
            style={{
              background: "#D40A25",
              width: "130px",
              height: "35px",
            }}
          >
            <span style={{ color: "white" }}>{policyKnowledgeDes && policyKnowledgeDes.severity}</span>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        style={{
					color: '#b3b0af',
          padding: "15px",
        }}
      >
        Version
      </Typography>
      <Paper className={classes.paper1}
				style={{
					width: "130px",
					height: "35px",
				}}
			>
        <span style={{ color: "#7569EE" }}>{policyKnowledgeDes && policyKnowledgeDes.policyVersion}</span>
      </Paper>
      <Typography
        style={{
          padding: "15px",
					color: '#b3b0af'
        }}
      >
        Resolution
      </Typography>
      <Typography
        style={{
          padding: "15px",
        }}
      >
        {/* {console.log(policyKnowledgeDes.resolution, 'policyKnowledgeDes.resolution.length')} */}
        {`Add the mandatory tags to the assets
        Follow the Cloud Asset Tagging guidelines.`}
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      <LayoutContainer>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography
              className={classes.paper3}
              style={{ "margin-left": "12px", fontWeight: 600 }}
              variant='subtitle2'
            >
              Total of {policyKnowledgeData.length} policies
            </Typography>
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
            container
            justify="center"
            spacing={3}
            onClick={toggleDrawer("right", true)}
          >
            {policyKnowledgeData.map((data, index) => (
              <Grid key={index} item onClick={() => handleChangeGrid(data)} style={{ cursor: 'pointer' }}>
                <Paper className={classes.paper}>
                  {data.name}
                  <Grid container spacing={3} >
                    <Grid item xs>
                      <Typography style={{ height: '29px' }}>
                      <Paper className={classes.paper1}>
                        <span style={{ color: "#7569EE", height: '29px' }}>{(data.ruleCategory).toUpperCase()}</span>
                      </Paper>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Paper
                        className={classes.paper2}
                        style={{
                          background:
                            data.severity === "critical"
                              ? "#D40A25"
                              : data.severity === "high"
                              ? "#F75C1B"
                              : "#FFC96D",
                        }}
                      >
                        <span style={{ height: '29px' }}>
                          <Typography style={{ color: "white", height: '29px' }}>
                            {(data.severity).toUpperCase()}
                          </Typography>
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
    </div>
  );
}
