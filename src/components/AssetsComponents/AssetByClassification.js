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
import { getAssetByClasChartData } from "../../actions/assetsActions";

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
const dummyChartOptions = {
  chart: {
    type: "bar",
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  responsive: [
    {
      options: {
        legend: {
          position: "bottom",
          offsetX: 0,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    categories: [],
  },
  legend: {
    position: "right",
    offsetY: 40,
  },
  fill: {
    opacity: 1,
  },
};
const dummyChartData = [
  {
    name: "Pass",
    data: [],
  },
  {
    name: "Fail",
    data: [],
  },
];
const AssetByClassification = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState("All");
  const [chartOptions, setChartOptions] = React.useState(dummyChartOptions);
  const [chartData, setChartData] = React.useState(dummyChartData);

  useEffect(() => {
    getAssetByClasChartData().then((resp) => {
      if (resp.data.length > 0) {
        console.log("resp", resp);
        var allData = resp.data;
        for (let x = 0; x < allData.length; x++) {
          const elementObj = allData[x];
          dummyChartData[0].data.push(elementObj.compliant);
          dummyChartData[1].data.push(elementObj.nonCompliant);
          dummyChartOptions.xaxis.categories.push(elementObj.key);
        }
        setChartData(dummyChartData);
        setChartOptions(dummyChartOptions);
      } else {

      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
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
        <Grid className="assetClassifiChartBox">
          {chartData[0].data.length > 0 &&
            <Chart
              options={chartOptions}
              series={chartData}
              type="bar"
              height={400}
              width={2000}
            />
          }
        </Grid>
      </div>
    </Paper>
  );
};

export default AssetByClassification;
