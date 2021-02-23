import React, { useEffect, useState } from "react";

import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  responsiveFontSizes,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Chart from "react-apexcharts";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getOverallCompliance } from "../../actions/complianceActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    borderRadius: 10,
    boxShadow: "0px 3px 6px #2C28281C",
    maxWidth: "778px",
    // height: 180,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AssetByClassification = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState("All");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const chartData = [
    {
      name: "Pass",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "Fail",
      data: [13, 23, 20, 8, 13, 27],
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      categories: [
        "VPC",
        "Targetgroup",
        "Subnet",
        "Snapshot",
        "Sg",
        "Reservedi...",
        "Nat",
      ],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <div style={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Asset By Classification
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                style={{
                  width: "154px",
                  height: "30px",
                  'margin-left': '103px',
                  "border-radius": "15px",
                  background: 'white'
                }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Pass"}>Pass</MenuItem>
                <MenuItem value={"Fail"}>Fail</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Chart
          options={chartOptions}
          series={chartData}
          type="bar"
          height={400}
        />
      </div>
    </Paper>
  );
};

export default AssetByClassification;
