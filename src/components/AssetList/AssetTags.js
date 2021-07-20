import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import MinimizeIcon from "@material-ui/icons/Minimize";
// import { getCompliance } from '../actions/complianceActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: "0px 3px 6px #2C28281C",
  },

  legendContainer: {
    display: "flex",
    alignItems: "center",
  },
  legendCircle: {
    height: 12,
    width: 12,
    borderRadius: "50%",
    borderWidth: "1px ",
    borderStyle: "solid",
  },
  chartLabels: {
    width: "100%",
    margin: "8px 0",
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const AssetInvestory = (props) => {
  const { assetTagsList } = props;
  const classes = useStyles();

  return (
    <div className="tagesAss" elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
        Tags
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={12}>
          <div className={classes.root}>
            {assetTagsList.map((row, index) => {
              return (
                <Chip label={row.tabName + ": " + row.value} key={index} />
              );
            })}
            {assetTagsList.length == 0 && (
              <p className="noDataAvailable">No Tags for this Resource ID</p>
            )}
            {/* <Chip label="Environment: Production" />
        <Chip label="Application: Firestorm" />
        <Chip label="Role: Web" />
        <Chip label="Owner: xxxxx@T-Mobile.com" /> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AssetInvestory;
