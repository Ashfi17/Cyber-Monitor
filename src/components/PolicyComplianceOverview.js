import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";

import PolicyOverviewRow from "./reusableComponent/PolicyOverviewRow";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    // display: "flex",

    // height: 180,
  },
  downloadButton: {
    border: "1px solid #7764E4",
    borderRadius: 5,
    color: "#5D55C8",
    fontWeight: 600,
    boxShadow: "0px 3px 6px #2C28281C",
  },
  selectedFilter: {
    backgroundColor: "#5D55C8",
    color: "white",
    borderRadius: 4,
    padding: theme.spacing(0.75, 1.25),
    fontWeight: "bold",
  },
  filterText: {
    fontWeight: "bold",
    cursor: "pointer",
  },

  // linearProgress: {
  //   width: "50%",
  //   // marginTop: '12px',
  // },
  // bar1Determinate: {
  //   backgroundColor: "#F9575C",
  // },
}));

const PolicyComplianceOverview = () => {
  const classes = useStyles();
  const [filterOption, setFilterOption] = useState("All");

  return (
    <div>
      <Paper className={classes.paper} elevation={0}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography style={{ fontWeight: "bold" }}>
            Policy Compliance Overview
          </Typography>
          <Button className={classes.downloadButton}>Download Data</Button>
        </div>

        <Divider variant="middle" style={{ width: "100%", margin: "16px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",

              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              className={
                filterOption === "All"
                  ? classes.selectedFilter
                  : classes.filterText
              }
              onClick={() => setFilterOption("All")}
            >
              All
            </Typography>
            <Typography
              className={
                filterOption === "Tagging"
                  ? classes.selectedFilter
                  : classes.filterText
              }
              style={{ marginLeft: 10, marginRight: 10 }}
              onClick={() => setFilterOption("Tagging")}
            >
              Tagging
            </Typography>
            <Typography
              className={
                filterOption === "Governance"
                  ? classes.selectedFilter
                  : classes.filterText
              }
              onClick={() => setFilterOption("Governance")}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              Governance
            </Typography>
            <Typography
              className={
                filterOption === "Security"
                  ? classes.selectedFilter
                  : classes.filterText
              }
              onClick={() => setFilterOption("Security")}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              Security
            </Typography>
            <Typography
              className={
                filterOption === "CostOpt"
                  ? classes.selectedFilter
                  : classes.filterText
              }
              onClick={() => setFilterOption("CostOpt")}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              Cost Optimization
            </Typography>
          </div>
          <Typography variant="caption">Total of 111 policies</Typography>
        </div>
      </Paper>
      {[1, 2, 3, 4, 5, 6].map((row, index) => (
        <Paper
          key={index}
          elevation={0}
          style={{
            width: "100%",
            display: "flex",
            marginTop: 2,
            marginBottom: 2,
            backgroundColor: index % 2 === 0 ? "#F7FAFC" : "white",
          }}
        >
          <PolicyOverviewRow />
        </Paper>
      ))}
    </div>
  );
};
export default PolicyComplianceOverview;
