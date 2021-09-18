import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import MinimizeIcon from "@material-ui/icons/Minimize";
// import { getCompliance } from '../actions/complianceActions';
import moment from "moment";
import { getAssetTrendChartData } from "../../actions/assetsActions";

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

const initialDataSeries = [
  {
    name: "Resource:Max",
    data: [],
  },
  {
    name: "Resource:Min",
    data: [],
  },
  {
    name: "Fail",
    data: [200, 2900, 3300, 6600],
  },
  {
    name: "Pass",
    data: [100, 2200, 3000, 5000],
  },
];

const initialDataOptions = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
    toolbar: {
      show: true,
    },
  },
  colors: ["#7569EE", "#7569EE", "#26C76E", "#E46666"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    min: 0,
    max: 7500,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};

const AssetInvestory = (props) => {
  const classes = useStyles();
  const [dataSeries, setDataSeries] = useState(initialDataSeries);
  const [chartOptions, setChartOptions] = useState(initialDataOptions);

  useEffect(() => {
    getAssetTrendChartData().then((resp) => {
      console.log("resp", resp);
      if (resp.trend.length > 0) {
        var allData = resp.trend;
        for (let x = 0; x < allData.length; x++) {
          const elementObj = allData[x];
          initialDataSeries[0].data.push(elementObj.max);
          initialDataSeries[1].data.push(elementObj.min);
          initialDataOptions.xaxis.categories.push(moment(elementObj.date).format("MMM 'DD"));
        }
        setDataSeries(initialDataSeries);
        setChartOptions(initialDataOptions);
      } else {

      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
        Asset Trend
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={12}>
          {dataSeries[0].data.length > 0 &&
            <Chart
              options={chartOptions}
              series={dataSeries}
              type="line"
              height={400}
            />
          }
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetInvestory;
