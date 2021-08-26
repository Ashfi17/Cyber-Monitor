import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import { nonCompliancePolicy } from "../actions/complianceActions";
import PolicyCompilance from "./PolicyCompilance";
import Workbook from "react-excel-workbook";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    width: 735,
  },
  paper: {
    padding: theme.spacing(2),
  },
  downloadButton: {
    border: "1px solid #7764E4",
    borderRadius: 5,
    color: "#5D55C8",
    fontWeight: 600,
    boxShadow: "0px 3px 6px #2C28281C",
  },
  selectedButton: {
    "background-color": "#5D55C8",
    color: "white",
  },
  unSelectedButton: {
    "background-color": "white",
    color: "black",
  },
}));

const PolicyComplianceOverview = (props) => {
  const classes = useStyles();
  const [filterOption, setFilterOption] = useState("All");
  const [policyData, setPolicyData] = useState([]);
  const [policyResponse, setPolicyResponse] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    nonCompliancePolicy()
      .then((resp) => {
        if (resp) {
          setPolicyResponse(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filtertableData = (ruleCate) => {
    // if (ruleCate === 'All') {
    //   setButtonStatus(true)
    // } else if (ruleCate === 'tagging' && ruleCate === 'governance' && ruleCate === 'security' && ruleCate === 'costOptimization') {
    //   setButtonStatus(false)
    // }
    // if (ruleCate === 'tagging') {
    //   setButtonStatus(true)
    // } else if (ruleCate === 'All' && ruleCate === 'governance' && ruleCate === 'security' && ruleCate === 'costOptimization') {
    //   setButtonStatus(false)
    // }
    // if (ruleCate === 'governance') {
    //   setButtonStatus(true)
    // } else if (ruleCate === 'All' && ruleCate === 'tagging' && ruleCate === 'security' && ruleCate === 'costOptimization') {
    //   setButtonStatus(false)
    // }
    // if (ruleCate === 'security') {
    //   setButtonStatus(true)
    // } else if (ruleCate === 'All' && ruleCate === 'tagging' && ruleCate === 'governance' && ruleCate === 'costOptimization') {
    //   setButtonStatus(false)
    // }
    // if (ruleCate === 'costOptimization') {
    //   setButtonStatus(true)
    // } else if (ruleCate === 'All' && ruleCate === 'tagging' && ruleCate === 'governance' && ruleCate === 'security') {
    //   setButtonStatus(false)
    // }
    // if (ruleCate === 'tagging') {
    //   setButtonStatus(true)
    // } else {
    //   setButtonStatus(false)
    // }
    console.log("policyResponse", policyResponse);
    let TabelData = [];
    if (ruleCate === "All") {
      setPolicyData(policyResponse);
    } else if (ruleCate === "tagging") {
      policyResponse.map((data) => {
        if (data.ruleCategory === ruleCate) {
          TabelData.push(data);
        }
        return null;
      });
      setPolicyData(TabelData);
    } else if (ruleCate === "governance") {
      policyResponse.map((data) => {
        if (data.ruleCategory === ruleCate) {
          TabelData.push(data);
        }
        return null;
      });
      setPolicyData(TabelData);
    } else if (ruleCate === "security") {
      policyResponse.map((data) => {
        if (data.ruleCategory === ruleCate) {
          TabelData.push(data);
        }
        return null;
      });
      setPolicyData(TabelData);
    } else if (ruleCate === "costOptimization") {
      policyResponse.map((data) => {
        if (data.ruleCategory === ruleCate) {
          TabelData.push(data);
        }
        return null;
      });
      setPolicyData(TabelData);
    }
    setFilterOption(ruleCate);
  };

  return (
    <div>
      <Paper className={classes.paper} elevation={0}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography style={{ fontWeight: "bold" }}>
            Policy Compliance Overview
          </Typography>
          <Workbook
            filename="Policy Compilance Overview.xlsx"
            element={
              <Button className={classes.downloadButton}>Download Data</Button>
            }
          >
            <Workbook.Sheet
              data={() =>
                policyData && policyData.length > 0
                  ? policyData
                  : policyResponse
              }
              name="Policy Compilance Overview"
            >
              <Workbook.Column label="Name" value="name" />
              <Workbook.Column label="severity" value="severity" />
              <Workbook.Column
                label="compliancepercent"
                value="compliance_percent"
              />
              <Workbook.Column label="lastScan" value="lastScan" />
              <Workbook.Column label="ruleCategory" value="ruleCategory" />
              <Workbook.Column label="resourcetType" value="resourcetType" />
              <Workbook.Column label="provider" value="provider" />
              <Workbook.Column label="ruleId" value="ruleId" />
              <Workbook.Column label="assetsScanned" value="assetsScanned" />
              <Workbook.Column label="passed" value="passed" />
              <Workbook.Column label="failed" value="failed" />
              <Workbook.Column
                label="contributionpercent"
                value="contribution_percent"
              />
              <Workbook.Column label="autoFixEnabled" value="autoFixEnabled" />
              <Workbook.Column label="exempted" value="exempted" />
              <Workbook.Column
                label="isAssetsExempted"
                value="isAssetsExempted"
              />
            </Workbook.Sheet>
          </Workbook>
        </div>

        <Divider variant="middle" style={{ width: "100%", margin: "16px 0" }} />
        <Grid container spacing={2} alignItems="center" className="allTabs">
          <Grid item>
            <Button
              className={
                filterOption === "All"
                  ? classes.selectedButton
                  : classes.unSelectedButton
              }
              onClick={() => filtertableData("All")}
            >
              All
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={
                filterOption === "tagging"
                  ? classes.selectedButton
                  : classes.unSelectedButton
              }
              onClick={() => filtertableData("tagging")}
            >
              Tagging
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={
                filterOption === "governance"
                  ? classes.selectedButton
                  : classes.unSelectedButton
              }
              onClick={() => filtertableData("governance")}
            >
              Governance
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={
                filterOption === "security"
                  ? classes.selectedButton
                  : classes.unSelectedButton
              }
              onClick={() => filtertableData("security")}
            >
              Security
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={
                filterOption === "costOptimization"
                  ? classes.selectedButton
                  : classes.unSelectedButton
              }
              onClick={() => filtertableData("costOptimization")}
            >
              Cost Optimization
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              Total of{" "}
              {policyData && policyData.length > 0
                ? policyData.length
                : policyResponse.length}{" "}
              policies
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <PolicyCompilance
        tableData={
          policyData && policyData.length > 0 ? policyData : policyResponse
        }
        onClickPageChange={props.onClickPageChange}
      />
    </div>
  );
};
export default PolicyComplianceOverview;
