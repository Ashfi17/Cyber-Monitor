import React, { useEffect, useState } from "react";

import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  responsiveFontSizes,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import { getOverallCompliance } from "../actions/complianceActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    marginTop: 20,
    borderRadius: 10,
    boxShadow: "0px 3px 6px #2C28281C",
    // height: 180,
  },
}));

const OverallComplianceTrend = (props) => {
  const [compilanceDate, setCompilanceDate] = useState([]);
  const [compilanceTagging, setCompilanceTagging] = useState([]);
  const [compilanceSecurity, setCompilanceSecurity] = useState([]);
  const [compilanceCostOptimization, setCompilanceCostOptimization] = useState(
    []
  );
  const [compilanceGovernance, setCompilanceGovernance] = useState([]);

  useEffect(() => {
    getOverallCompliance()
      .then((resp) => {
        const dateArray = [];
        const taggingArray = [];
        const securityArray = [];
        const costArray = [];
        const governanceArray = [];
        if (resp) {
          if (resp.compliance_info) {
            resp.compliance_info.map((data) => {
              if (Object.keys(data)[0] === "date") {
                dateArray.push(Object.values(data)[0]);
              }
              if (Object.keys(data)[1] === "tagging") {
                taggingArray.push(Object.values(data)[1]);
              }
              if (Object.keys(data)[2] === "security") {
                securityArray.push(Object.values(data)[2]);
              }
              if (Object.keys(data)[4] === "costOptimization") {
                costArray.push(Object.values(data)[4]);
              }
              if (Object.keys(data)[5] === "governance") {
                governanceArray.push(Object.values(data)[5]);
              }
            });
          }
          setCompilanceDate(dateArray);
          setCompilanceTagging(taggingArray);
          setCompilanceSecurity(securityArray);
          setCompilanceCostOptimization(costArray);
          setCompilanceGovernance(governanceArray);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const classes = useStyles();
  var chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      //   sparkline: {
      //     enabled: true,
      //   },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        endingShape: "rounded",
        dataLabels: {
          position: "top",
        },
      },
    },
    yaxis: {
      title: {
        text: "Compliance %",
      },
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: compilanceDate,
    },
    legend: {
      horizontalAlign: "left",
      markers: {
        width: 30,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 10,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 25,
        vertical: 0,
      },
    },
  };

  const chartData = [
    {
      data: compilanceSecurity,
      name: "Security",
    },
    {
      data: compilanceCostOptimization,
      name: "Cost Optimization",
    },
    {
      data: compilanceGovernance,
      name: "Governance",
    },
    {
      data: compilanceTagging,
      name: "Tagging",
    },
  ];

  return (
    <Paper className={classes.paper} elevation={0}>
      <div style={{ width: "100%" }}>
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

export default OverallComplianceTrend;
