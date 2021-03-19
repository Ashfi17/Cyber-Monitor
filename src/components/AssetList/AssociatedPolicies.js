import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";

import AssociatedPoliciesTable from "./AssociatedPoliciesTable";

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

const AssociatedPolicies = (props) => {
  const classes = useStyles();
  const [filterOption, setFilterOption] = useState("All");
  useEffect(() => {
    if (props && props.policyData) {
      console.log(props.policyData, 'policyData')
    }
  }, [])
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
          <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Associated Policies
            </Typography>
        </div>
      </Paper>
        <Paper
          elevation={0}
          style={{
            width: "100%",
            display: "flex",
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <AssociatedPoliciesTable />
        </Paper>
    </div>
  );
};
export default AssociatedPolicies;