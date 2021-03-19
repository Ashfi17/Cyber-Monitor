import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import MinimizeIcon from '@material-ui/icons/Minimize';
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
        name: 'Open',
        data: [10]
      }, {
        name: 'Closed',
        data: [5]
      }, {
        name: 'Upcomming',
        data: [2]
      }
  ]
  const dataOptions = {
    chart: {
      type: 'bar',
    //   height: 50,
      stacked: true,
      stackType: '10%'
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    // stroke: {
    //   width: 1,
    //   colors: ['#fff']
    // },
    xaxis: {
      categories: [],
      show: false,
    },
    yaxis: {
        categories: [],
        show: false
    },
    fill: {
      opacity: 1
    
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  return (
    <Paper className={classes.paper} elevation={0} style={{  'max-height': '130px' }}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
       AWS Notifications
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 6, marginBottom: 6 }}>
        <Grid item xs={12}>
          <Typography >
            <Chart
              options={dataOptions}
              series={dataSeries}
              type="bar"
              height={120}
              width={330}
            />
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetInvestory;
