import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Divider,
  Button
} from "@material-ui/core";
import { nonCompliancePolicy } from "../actions/complianceActions";
import PolicyCompilance from "./PolicyCompilance";
import Workbook from 'react-excel-workbook'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    width: 733
  },
  paper: {
    padding: theme.spacing(2)
  },
  downloadButton: {
    border: "1px solid #7764E4",
    borderRadius: 5,
    color: "#5D55C8",
    fontWeight: 600,
    boxShadow: "0px 3px 6px #2C28281C",
  },
  selectedFilter: {
    backgroundColor: "#5D55C8",
    color: "white",
    borderRadius: 4,
    padding: theme.spacing(0.75, 1.25),
    fontWeight: "bold",
  },
  filterText: {
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const PolicyComplianceOverview = () => {
  const classes = useStyles();
  const [filterOption, setFilterOption] = useState("All");
  const [policyData, setPolicyData] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    nonCompliancePolicy()
      .then((resp) => {
        if (resp) {
          console.log(resp)
          setPolicyData(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filtertableData = (ruleCate) => {
    let TabelData = []
    policyData.map((data) => {
    if (data.ruleCategory === ruleCate) {
        TabelData.push(data)
      }
      return null;
    })
    setPolicyData(TabelData)
  }

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
            <Workbook.Sheet data={() => policyData} name="Policy Compilance Overview">
              <Workbook.Column label="Name" value="name" />
              <Workbook.Column label="severity" value="severity" />
              <Workbook.Column label="compliancepercent" value="compliance_percent" />
              <Workbook.Column label="lastScan" value="lastScan" />
              <Workbook.Column label="ruleCategory" value="ruleCategory" />
              <Workbook.Column label="resourcetType" value="resourcetType" />
              <Workbook.Column label="provider" value="provider" />
              <Workbook.Column label="ruleId" value="ruleId" />
              <Workbook.Column label="assetsScanned" value="assetsScanned" />
              <Workbook.Column label="passed" value="passed" />
              <Workbook.Column label="failed" value="failed" />
              <Workbook.Column label="contributionpercent" value="contribution_percent" />
              <Workbook.Column label="autoFixEnabled" value="autoFixEnabled" />
              <Workbook.Column label="exempted" value="exempted" />
              <Workbook.Column label="isAssetsExempted" value="isAssetsExempted" />
            </Workbook.Sheet>
          </Workbook>
        </div>

        <Divider variant="middle" style={{ width: "100%", margin: "16px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              className={
                filterOption === "All"
                  ? classes.selectedFilter
                  : classes.filterText
              }
              
            >
              <Tab label="All" onClick={() => filtertableData('All')} />
              <Tab label="Tagging" onClick={() => filtertableData('tagging')} />
              <Tab label="Governance" onClick={() => filtertableData("governance")} />
              <Tab label="Security" onClick={() => filtertableData('security')} />
              <Tab label="Cost Optimization" onClick={() => filtertableData("costOptimization")} />

            </Tabs>
            {/* <Typography variant="caption">Total of {policyData.length} policies</Typography> */}
          </Paper>
          
        </div>
      </Paper>
      <PolicyCompilance tableData={policyData} />
    </div>
  );
};
export default PolicyComplianceOverview;
