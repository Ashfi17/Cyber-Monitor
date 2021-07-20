import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
} from "@material-ui/core";
import Chart from "react-apexcharts";
// import { getCompliance } from '../actions/complianceActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
    // maxWidth: '318px',
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
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    padding: "10px",
    // borderBottom: "1px solid #ddd",
  },
}));

const AssetByApplication = (props) => {
  const { countDetails } = props;
  const { awsAppType } = props;
  const { overallData } = props;
  const { countByApplication } = props;
  const classes = useStyles();

  const onClickStoreData = (getData, callName) => {
    var storeData = {};
    if (callName == "taggable") {
      storeData = {
        type: callName,
        data: {
          resourceType: getData,
          tagName: "Application",
          tagged: "false",
        }
      };
    } else {
      storeData = {
        type: callName,
        data: {
          domain: "Infra & Platforms",
          application: getData.application,
          resourceType: awsAppType,
        }
      };
    }
    localStorage.removeItem("searchedAsstListPgeFilterObjs");
    localStorage.setItem("assetDataForFilter", JSON.stringify(storeData));
    props.history.push("/assetlist-table");
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: 14 }}>
        Asset by Application
      </Typography>
      <Grid
        container
        spacing={2}
        style={{
          marginTop: 6,
          marginBottom: 6,
          height: "430px",
          "overflow-y": "scroll",
        }}
      >
        <Grid className="assetByApp" item xs={12} style={{ padding: "0" }}>
          {countByApplication &&
            countByApplication.length !== 0 &&
            countByApplication.map((data) => (
              <Button
                className={classes.chartLabels}
                onClick={() => onClickStoreData(data, "asset")}
              >
                <Typography>
                  {data && data.application
                    ? data.application.charAt(0).toUpperCase() +
                    data.application.slice(1)
                    : ""}
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {(data.count.toString().length < 2
                    ? "0" + data.count
                    : data.count
                  ).toString()}
                </Typography>
              </Button>
            ))}
          <Divider
            variant="middle"
            style={{ width: "100%", margin: "16px 0" }}
          />
          <Button
            className={classes.chartLabels}
            onClick={() => onClickStoreData(awsAppType, "taggable")}
          >
            <Typography>Without Application Tag</Typography>
            <Typography style={{ fontWeight: "bold" }}>
              {overallData[awsAppType]}
            </Typography>
          </Button>
          {/* <div className={classes.chartLabels}>
            <Typography>Firestorm</Typography>
            <Typography style={{ fontWeight: "bold" }}>32</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Zoom</Typography>
            <Typography style={{ fontWeight: "bold" }}>29</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Doctor Alchemy</Typography>
            <Typography style={{ fontWeight: "bold" }}>26</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Tar Pit</Typography>
            <Typography style={{ fontWeight: "bold" }}>24</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Peek-A-Boo</Typography>
            <Typography style={{ fontWeight: "bold" }}>19</Typography>
          </div><div className={classes.chartLabels}>
            <Typography>The Rival</Typography>
            <Typography style={{ fontWeight: "bold" }}>10</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Gorilla Grodd</Typography>
            <Typography style={{ fontWeight: "bold" }}>09</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Intertia</Typography>
            <Typography style={{ fontWeight: "bold" }}>07</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Bother Grimm</Typography>
            <Typography style={{ fontWeight: "bold" }}>06</Typography>
          </div>
          <div className={classes.chartLabels}>
            <Typography>Fallout</Typography>
            <Typography style={{ fontWeight: "bold" }}>05</Typography>
          </div>
          <Divider
            variant="middle"
            style={{ width: "100%", margin: "16px 0" }}
          />
          <div className={classes.chartLabels}>
            <Typography>Without Application Tag</Typography>
            <Typography style={{ fontWeight: "bold" }}>100 %</Typography>
          </div> */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetByApplication;
