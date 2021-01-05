import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import { getCompliance } from '../actions/complianceActions'

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

const DashboardCompliance = (props) => {
  const [overallCompliance, setOverallCompliance] = useState({});

  useEffect(() => {
    getCompliance()
    .then((resp) => {
      setOverallCompliance(resp.distribution)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const classes = useStyles();

  const chartOptions = {
    labels: ["Total Violations", "Critical"],
    colors: ["#7569EE", "#F7A844"],
    dataLabels: {
      enabled: false,
      //   formatter: function (val) {
      //     return val + "%";
      //   },
    },

    plotOptions: {
      pie: {
        customScale: 1,
        // size: 20,
      },
    },
    legend: {
      show: false,
      //   position: "top",
      //   horizontalAlign: "center",
    },
  };

  const chartData = [234, 16];

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
        Overall Compliance
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={7}>
          <Chart
            options={chartOptions}
            series={chartData}
            type="donut"
            height={220}
          />
        </Grid>
        <Grid
          item
          xs={5}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>
            <div className={classes.legendContainer}>
              <div
                className={classes.legendCircle}
                style={{ borderColor: "#7569EE" }}
              ></div>
              <Typography variant="caption" style={{ marginLeft: 8 }}>
                Total violations
              </Typography>
            </div>
            <div className={classes.legendContainer} style={{ marginLeft: 12 }}>
              <div
                className={classes.legendCircle}
                style={{ borderColor: "#F7A844" }}
              ></div>
              <Typography variant="caption" style={{ marginLeft: 8 }}>
                Critical
              </Typography>
            </div>
          </div>
          <Divider
            variant="middle"
            style={{ width: "100%", margin: "16px 0" }}
          />
          <div className={classes.chartLabels}>
            <Typography>Tagging</Typography>
            <Typography style={{ fontWeight: "bold" }}>{overallCompliance.tagging} %</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Security</Typography>
            <Typography style={{ fontWeight: "bold" }}>{overallCompliance.security} %</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Governance</Typography>
            <Typography style={{ fontWeight: "bold" }}>{overallCompliance.governance} %</Typography>
          </div>
          {/* <div className={classes.chartLabels}>
            <Typography>Cost Optimization</Typography>
            <Typography style={{ fontWeight: "bold" }}>{overallCompliance.costOptimization} %</Typography>
          </div> */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardCompliance;
