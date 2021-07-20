import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import Paper from "@material-ui/core/Paper";
// import { Image } from "semantic-ui-react";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import SecurityImg from "../assets/images/poly/Security.svg";
import backIcon from "../assets/images/header/back.svg";
import {
  getCount,
  getCountByApplication,
  getMaxMin,
} from "../actions/assetsActions";
import {
  policyKnowledgeDescription,
  getComplianceTrend,
  policySummaryData,
  listOfViolationsData,
} from "../actions/complianceActions";
import ComplianceTrendChart from "../components/ComplianceTrendChart";
import TrendOfTotalAndCompliantAssetsChart from "../components/TrendOfTotalAndCompliantAssetsChart";
import moment from "moment";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // { id: 'Compilance', numeric: true, disablePadding: false, label: 'Compilance', sortable: false, width: 80 },
  {
    id: "policyName",
    numeric: true,
    disablePadding: false,
    label: "Policy Name",
  },
  {
    id: "issuedId",
    numeric: true,
    disablePadding: false,
    label: "Issued ID",
  },
  {
    id: "resourceId",
    numeric: true,
    disablePadding: false,
    label: "Resource ID",
  },
  { id: "severity", numeric: true, disablePadding: false, label: "Severity" },
  {
    id: "ruleCategory",
    numeric: true,
    disablePadding: false,
    label: "Rule Category",
  },
  {
    id: "accountName",
    numeric: true,
    disablePadding: false,
    label: "Account Name",
  },
  {
    id: "accountID",
    numeric: true,
    disablePadding: false,
    label: "Account ID",
  },
  { id: "region", numeric: true, disablePadding: false, label: "Region" },
  {
    id: "application",
    numeric: true,
    disablePadding: false,
    label: "Application",
  },
  {
    id: "environment",
    numeric: true,
    disablePadding: false,
    label: "Environment",
  },
  {
    id: "createdOn",
    numeric: true,
    disablePadding: false,
    label: "Created On",
  },
  {
    id: "modifiedOn",
    numeric: true,
    disablePadding: false,
    label: "Modified On",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
  {
    id: "assetType",
    numeric: true,
    disablePadding: false,
    label: "Asset Type",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: "0px 3px 6px #2C28281C",
    marginBottom: "25px",
  },
}));

export default function PolicyCompliance(props) {
  const classes = useStyles();
  const [tableData, setTableData] = React.useState([]);
  const [order, setOrder] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [assetCount, setAssetCount] = useState([]);
  // const [AWSAppList, setAWSAppList] = useState([]);
  // const [awsAppType, setAwsAppType] = useState("subnet");
  const [policySummary, setPolicySummary] = useState({});
  const [policyKnowObj, setPolicyKnowObj] = useState({});
  const [aWSDate, setAWSDate] = useState([]);
  const [aWSMin, setAWSMin] = useState([]);
  const [aWSMax, setAWSMax] = useState([]);
  const [aWSTrendDate, setAWSTrendDate] = useState([]);
  const [aWSMinForTrend, setAWSMinForTrend] = useState([]);
  const [aWSTrendTotal, setAWSTrendTotal] = useState([]);

  useEffect(() => {
    var plcyCompData = JSON.parse(localStorage.getItem("plcyCompParams"));
    policyKnowledgeDescription(plcyCompData.ruleId)
      .then((resp) => {
        if (resp) {
          setPolicyKnowObj(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var plcyCompData = JSON.parse(localStorage.getItem("plcyCompParams"));
    policySummaryData(plcyCompData)
      .then((resp) => {
        if (resp) {
          setPolicySummary(resp[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var plcyCompData = JSON.parse(localStorage.getItem("plcyCompParams"));
    listOfViolationsData(plcyCompData)
      .then((resp) => {
        if (resp) {
          setTableData(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*  useEffect(() => {
     getCount()
       .then((resp) => {
         const arrayData = [];
         resp.assetcount.map((data) => {
           const obj = {};
           obj.count = data.count;
           obj.type = data.type;
           arrayData.push(obj);
         });
         setAssetCount(arrayData);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []); */

  /*  useEffect(() => {
     gettaggingByApplication("subnet")
       .then((resp) => {
         resp.response.map((data) => {
           setOverallData(data);
           const keyData = Object.keys(data);
           setAWSAppList(keyData);
         });
       })
       .catch((error) => {
         console.log(error);
       });
   }, []); */

  useEffect(() => {
    var plcyCompData = JSON.parse(localStorage.getItem("plcyCompParams"));
    plcyCompData.fromDate = moment().format("YYYY-MM-DD");
    getComplianceTrend(plcyCompData)
      .then((resp) => {
        console.log("respTrend", resp);
        let AWSDates = [];
        let AWSMin = [];
        let AWSMax = [];
        let AWSTrendDate = [];
        let AWSMinForTrend = [];
        let AWSTrendTotal = [];
        if (resp) {
          resp.compliance_trend.map((data) => {
            if (data.start_date) {
              AWSDates.push(data.start_date);
            }
            if (data.compliance) {
              AWSMax.push(data.compliance);
            }

            if (data.compliance_info[0].date) {
              AWSTrendDate.push(data.compliance_info[0].date);
            }
            if (data.compliance_info[0].compliant) {
              AWSMinForTrend.push(data.compliance_info[0].compliant);
            }
            if (data.compliance_info[0].total) {
              AWSTrendTotal.push(data.compliance_info[0].total);
            }

            /* if (data.compliance_info.length > 0) {
              data.compliance_info.map((innerData) => {
                if (innerData.date) {
                  AWSTrendDate.push(innerData.date);
                }
                if (innerData.compliant) {
                  AWSMinForTrend.push(innerData.compliant);
                }
                if (innerData.total) {
                  AWSTrendTotal.push(innerData.total);
                }
              });
            } */
          });
        }
        console.log("AWSDates", AWSDates);
        setAWSDate(AWSDates);
        setAWSMin(AWSMin);
        setAWSMax(AWSMax);
        setAWSTrendDate(AWSTrendDate);
        setAWSMinForTrend(AWSMinForTrend);
        setAWSTrendTotal(AWSTrendTotal);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, tableData && tableData.length - page * rowsPerPage);

  const goToPolicyViolDetailsSec = (dataObj) => {
    localStorage.setItem("plcyViolParams", JSON.stringify(dataObj));
    props.history.push("/pl-violations-details");
  };
  return (
    <div>
      <LayoutContainer pageName="Policy Compliance">
        <Button className="backBtnStl" onClick={() => props.history.goBack()}>
          <img src={backIcon} />
        </Button>
        <Paper className={classes.paper} style={{ marginTop: "10px" }}>
          <Typography variant="h5">{policyKnowObj.displayName}</Typography>
          <Typography>{policyKnowObj.ruleDescription}</Typography>
        </Paper>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div className="compSecAlertCard">
                <Typography variant="h5">
                  {policySummary.compliance_percent}{" "}
                  <span style={{ fontSize: "18px" }}>%</span>
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  style={{ opacity: 0.5 }}
                >
                  Compliance
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="compSecAlertCard scanned">
                <Typography variant="h5">
                  {policySummary.assetsScanned}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  style={{ opacity: 0.5 }}
                >
                  Assets Scanned
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="compSecAlertCard passed">
                <Typography variant="h5">{policySummary.passed}</Typography>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  style={{ opacity: 0.5 }}
                >
                  Passed
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="compSecAlertCard failed">
                <Typography variant="h5">{policySummary.failed}</Typography>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  style={{ opacity: 0.5 }}
                >
                  Failed
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid container style={{ marginBottom: "25px" }}>
          <Grid item xs={12}>
            <ComplianceTrendChart aswAppDates={aWSDate} awsAppMax={aWSMax} />
          </Grid>
        </Grid>
        <Grid container style={{ marginBottom: "25px" }}>
          <Grid item xs={12}>
            <TrendOfTotalAndCompliantAssetsChart
              aswAppDates={aWSTrendDate}
              awsAppMin={aWSMinForTrend}
              awsAppMax={aWSTrendTotal}
            />
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <div>
            <TableContainer style={{ whiteSpace: "nowrap" }}>
              <Table
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected && selected.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={tableData && tableData.length}
                />
                <TableBody>
                  {stableSort(tableData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell
                            align="left"
                            onClick={() => goToPolicyViolDetailsSec(row)}
                          >
                            {row.PolicyName ? row.PolicyName : "--"}
                          </TableCell>
                          <TableCell
                            align="left"
                            onClick={() => goToPolicyViolDetailsSec(row)}
                          >
                            {row.IssueId ? row.IssueId : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.ResourceId ? row.ResourceId : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.Severity ? row.Severity : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.RuleCategory ? row.RuleCategory : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.AccountName ? row.AccountName : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.AccountId ? row.AccountId : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.Region ? row.Region : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.Application ? row.Application : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.Environment ? row.Environment : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.CreatedOn
                              ? moment(row.CreatedOn).format("DD-MM-YYYY")
                              : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.ModifiedOn
                              ? moment(row.ModifiedOn).format("DD-MM-YYYY")
                              : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.Status ? row.Status : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.resourcetType ? row.resourcetType : "--"}
                          </TableCell>
                          <TableCell align="left">
                            {row.description ? row.description : "--"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {tableData.length == 0 && (
                    <TableRow style={{ height: "200px" }}>
                      <TableCell colSpan={15} style={{ textAlign: "center" }}>
                        No Data Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData && tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              className="policyCompPagination"
            />
          </div>
        </Paper>
      </LayoutContainer>
    </div>
  );
}
