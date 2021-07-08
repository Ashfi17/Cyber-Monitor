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

const TrendOfTotalAndCompliantAssetsChart = (props) => {
  const [datesData, setDates] = useState([]);
  const [minData, setMinimum] = useState([]);
  const [maxData, setMaximum] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const dataArray = [];
    console.log("props", props);
    if (props && props.aswAppDates.length > 0) {
      setDates(props.aswAppDates);
    } else {
      setDates([]);
    }
    if (props && props.awsAppMin.length > 0) {
      setMinimum(props.awsAppMin);
      const obj1 = {};
      obj1.name = 'Compliant';
      obj1.data = props.awsAppMin;
      dataArray.push(obj1);
    } else {
      setMinimum([]);
    }
    if (props && props.awsAppMax.length > 0) {
      setMaximum(props.awsAppMax);
      const obj2 = {};
      obj2.name = 'Compliant';
      obj2.data = props.awsAppMax;
      dataArray.push(obj2);
    } else {
      setMaximum([]);
    }
    console.log("dataArray", dataArray);
  }, [props])

  const dataSeries = [
    {
      name: 'Compliant',
      data: minData
    },
    {
      name: 'Total',
      data: maxData
    }
  ];
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
      width: [5, 5, 4],
      curve: 'smooth'
    },
    // labels: [],
    xaxis: {
      categories: datesData,
    },
    yaxis: {
      min: 0,
      max: 100
    },
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
        Trend Of Total And Compliant Assets
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={12} style={{ position: "relative" }}>
          <Chart
            options={dataOptions}
            series={dataSeries}
            type="line"
            height={400}
          />
          {datesData.length == 0 &&
            <div className="noDataErrorMsg">Doesn't look like any data is available</div>
          }
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TrendOfTotalAndCompliantAssetsChart;