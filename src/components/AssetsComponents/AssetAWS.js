import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Chart from "react-apexcharts";
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
}));

const AssetInvestory = (props) => {

const classes = useStyles();

const dataSeries = [
    {
        name: 'Minimum',
        data: [35000, null, 49586, null]
      },
      {
        name: 'Maximum',
        data: [22000, null, 38758, null]
      }
  ]
  const dataOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      animations: {
        enabled: false
      }
    },
    colors: ['#26C76E', '#E46666'],
    stroke: {
      width: [5,5,4],
      curve: 'smooth'
    },
    // labels: [],
    xaxis: {
        categories: ['Jan `21', 'Feb `21', 'Mar `21', 'Apr `21'],
    },
    yaxis: {
        min: 20000, 
        max: 60000
      },
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
      Inventory
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={12}>
          <Chart
            options={dataOptions}
            series={dataSeries}
            type="line"
            height={220}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetInvestory;
