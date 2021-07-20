import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chart from "react-apexcharts";
import { Grid, Typography } from "@material-ui/core";
import { DriveEtaRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid(props) {
  const { assetSummaryData } = props;
  const classes = useStyles();
  /* const hostVulnerabilitySeries = [3, 4, 5];
  const hostVulnerabilityOptions = {
    labels: ["S5", 'S4', 'S3'],
    colors: ["#7569EE", "#A198F7", '#CCC7FF'],
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'donut'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }; */

  const [policyViolationSeries, setPolicyViolationSeries] = React.useState([]);
  const policyViolationOptions = {
    labels: ["Critical", "High", "Medium", "Low"],
    colors: ["#7569EE", "#A198F7", "#CCC7FF", "#E46666"],
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    if (assetSummaryData.length > 0) {
      var chartDataSet = [];
      for (let x = 0; x < assetSummaryData.length; x++) {
        const element = assetSummaryData[x];
        chartDataSet.push(element.count);
      }
      setPolicyViolationSeries(chartDataSet);
    }
  }, [assetSummaryData]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div
            className="customPaper"
            style={{ padding: "16px", minHeight: "215px" }}
          >
            <Typography
              variant="h6"
              style={{ color: "#262C49", fontWeight: "bold", fontSize: 14 }}
            >
              Policy Violation Summery
            </Typography>
            <div className="policyviolationSummery">
              {policyViolationSeries.length > 0 && (
                <Chart
                  options={policyViolationOptions}
                  series={policyViolationSeries}
                  type="donut"
                  width={400}
                />
              )}
              {policyViolationSeries.length == 0 && (
                <p className="noDataAvailable">
                  No Violations for this Resource ID
                </p>
              )}
            </div>
          </div>
        </Grid>
        {/* <Grid item xs={4}>
          <Paper className={classes.paper}>
          <Typography
              variant="h6"
              style={{ color: '#262C49', fontWeight: "bold", fontSize: 14 }}
            >
              Host Vulnerability Summery
            </Typography>
            <Typography>
            <Chart
                options={hostVulnerabilityOptions}
                series={hostVulnerabilitySeries}
                type="donut"
            />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
          <Typography
              variant="h6"
              style={{ color: '#262C49', fontWeight: "bold", fontSize: 14 }}
            >
              AWS Metadata
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
                    >
                    Image Id
                    </Typography>
                    <Typography style={{ color: '#282733', fontWeight: "bold", fontSize: 14 }}>Ami - 80xxxxx</Typography>
                    
                </Grid>
                <Grid item xs={6}>
                    <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
                    >
                    Subnet Id
                    </Typography>
                    <Typography style={{ color: '#282733', fontWeight: "bold", fontSize: 14 }}>Subnet-6a5xxxx</Typography>
                    
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
                    >
                    Instance Type
                    </Typography>
                    <Typography style={{ color: '#282733', fontWeight: "bold", fontSize: 14 }}>
                    M4.xlarge
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
                    >
                    Account Name
                    </Typography>
                    <Typography style={{ color: '#282733', fontWeight: "bold", fontSize: 14 }}>Sandbox</Typography>
                    
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
                    >
                    Vpc Id
                    </Typography>
                    <Typography style={{ color: '#282733', fontWeight: "bold", fontSize: 14, padding: "10px" }}>Vpc-05f2xxx</Typography>
                    
                </Grid>
                <Grid item xs={6}>
                    <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
                    >
                    Availability Zone
                    </Typography>
                    <Typography style={{ color: '#282733', fontWeight: "bold", fontSize: 14, padding: "10px" }}>Us-west-2b</Typography>
                    
                </Grid>
            </Grid>
          </Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
