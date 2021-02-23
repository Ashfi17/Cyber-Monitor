import React from "react";

import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";
import PolicyComplianc from "../PolicyCompilance";

const PolicyOverviewRow = () => {
  //   const classes = useStyles();

  return (
    <>
      <div
        style={{
          height: "initial",
          width: "8px",
          backgroundColor: "#F2425F",
          marginRight: 10,
        }}
      ></div>

      <div
        style={{
          padding: "16px 0px",

          justifySelf: "flex-start",
          marginRight: 8,
        }}
      >
        <Typography variant="subtitle2" color="textPrimary">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        </Typography>
      </div>

      <div
        style={{
          width: "30%",
          alignSelf: "center",
          justifySelf: "flex-end",
          marginLeft: 10,
        }}
      >
        <PolicyComplianc />
        {/* <LinearProgress
          // className={classes.bar1Determinate}
          value={30}
          variant="determinate"
        /> */}
      </div>
    </>
  );
};

export default PolicyOverviewRow;
