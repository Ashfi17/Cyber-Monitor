import React from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: "0px 3px 6px #2C28281C",
  },
}));

const DashboardTagging = (props) => {
  const classes = useStyles();

  const chartOptions = {
    labels: ["Untagged"],
    colors: ["#E46666"],

    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%",
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            fontSize: "32px",
            fontWeight: 600,
            offsetY: 10,
          },
        },
      },
    },

    legend: {
      show: false,
    },
  };

  const chartData = [83];

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
        Tagging
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={5}>
          <Chart
            options={chartOptions}
            series={chartData}
            type="radialBar"
            height={220}
            width={"100%"}
          />
        </Grid>

        <Grid
          item
          xs={5}
          style={{
            display: "flex",
          }}
        >
          <Divider
            // variant="middle"
            orientation="vertical"
            flexItem
            style={{ height: "100%", margin: "0px 2px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
              marginLeft: 10,
            }}
          >
            <Typography style={{ opacity: 0.5 }}>Untagged</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              105
            </Typography>
            <Divider
              variant="middle"
              style={{ width: "100%", margin: "16px 0" }}
            />
            <Typography style={{ opacity: 0.5 }}>Total</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              144
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardTagging;
