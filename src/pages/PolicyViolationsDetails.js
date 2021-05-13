import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import Paper from "@material-ui/core/Paper";
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
import {
  getCount,
  getCountByApplication,
  getMaxMin,
} from "../actions/assetsActions";
import {
  policyKnowledgeDescription,
  getResourcedetails,
  getPolicyViolationReason,
  getAllIssueAuditLog,
} from "../actions/complianceActions";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
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
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "resource",
    numeric: true,
    disablePadding: false,
    label: "Resource",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
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

export default function PolicyViolationsDetails(props) {
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
  const [targetEnttTags, setTargetEnttTags] = useState([]);
  const [state, setState] = React.useState({ right: false });
  const [roleDataObj, setRoleDataObj] = useState({});

  /* useEffect(() => {
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
  }, []); */

  useEffect(() => {
    var plcyViolCompData = JSON.parse(localStorage.getItem("plcyViolParams"));
    getPolicyViolationReason(plcyViolCompData.IssueId)
      .then((resp) => {
        if (resp) {
          setPolicySummary(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var plcyViolCompData = JSON.parse(localStorage.getItem("plcyViolParams"));
    getResourcedetails(plcyViolCompData.ResourceId)
      .then((resp) => {
        if (resp) {
          var targetTagsArr = [];
          resp.response.map((obj) => {
            if (
              Object.keys(obj).some(function (k) {
                return ~k.indexOf("tags.");
              })
            ) {
              var propertyNames = Object.keys(obj).filter(function (
                propertyName
              ) {
                return propertyName.indexOf("tags.") === 0;
              });
              var keyName = propertyNames[0].split(".");
              var crtObj = {
                tagName: keyName[1],
                value: obj[propertyNames[0]],
              };
              targetTagsArr.push(crtObj);
            }
          });
          setTargetEnttTags(targetTagsArr);
          plcyViolCompData.entitytype = resp.response[0]._entitytype;

          getAllIssueAuditLog(plcyViolCompData)
            .then((resp) => {
              if (resp) {
                setTableData(resp);
              }
            })
            .catch((error) => {
              console.log(error);
            });
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

  /* useEffect(() => {
    var plcyCompData = JSON.parse(localStorage.getItem("plcyCompParams"));
    plcyCompData.fromDate = moment().format("YYYY-MM-DD");
    getComplianceTrend(plcyCompData)
      .then((resp) => {
        let AWSDates = [];
        let AWSMin = [];
        let AWSMax = [];
        if (resp) {
          resp.compliance_trend.map((data) => {
            if (data.start_date) {
              AWSDates.push(data.start_date);
            }
            if (data.compliance) {
              AWSMax.push(data.compliance);
            }
          });
        }
        console.log("AWSDates", AWSDates);
        setAWSDate(AWSDates);
        setAWSMin(AWSMin);
        setAWSMax(AWSMax);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); */

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

  const toggleDrawer = (anchor, open, dataObj) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    console.log("dataObj", dataObj);
    setRoleDataObj(dataObj);
  };

  const list = (anchor) => (
    <div style={{ width: 455, padding: 15 }} role="presentation">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "7px",
              fontWeight: "bold",
            }}
          >
            Additional Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            style={{
              cursor: "pointer",
              float: "right",
              padding: "7px",
              fontWeight: "bold",
            }}
            onClick={toggleDrawer(anchor, false, {})}
          >
            X
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            style={{
              padding: "7px",
              color: "#b3b0af",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Date
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            {moment(roleDataObj.auditdate).format("DD-MM-YYYY H:MM:SS a")}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "7px",
              color: "#b3b0af",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Source
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
              wordBreak: "break-all",
              display: "inline-block",
            }}
          >
            {roleDataObj.datasource}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "7px",
              color: "#b3b0af",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Status
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
              wordBreak: "break-all",
              display: "inline-block",
            }}
          >
            {roleDataObj.status}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <LayoutContainer>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div className="compSecAlertCard">
                <img src={SecurityImg} />
                <p>Status</p>
                <p>Open</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="compSecAlertCard scanned">
                <img src={SecurityImg} />
                <p>Severity</p>
                <p>Critical</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="compSecAlertCard passed">
                <img src={SecurityImg} />
                <p>Target Type</p>
                <p>Appelb</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="compSecAlertCard failed">
                <img src={SecurityImg} />
                <p>Rule Category</p>
                <p>Security</p>
              </div>
            </Grid>
          </Grid>
          <div className="policyViolatedInfo">
            <div>
              <h5>Policy Violated</h5>
              <a href="#">{policySummary.policyViolated}</a>
            </div>
            <div>
              <h5>Policy Description</h5>
              <p>{policySummary.policyDescription}</p>
            </div>
            <div>
              <h5>Violation Reason</h5>
              <p>{policySummary.violationReason}</p>
            </div>
            <div>
              <h5>Resource ID</h5>
              <a href="#">{policySummary.resouceViolatedPolicy}</a>
            </div>
            <div>
              <h5>Creation Date</h5>
              <p>
                {moment(policySummary.violationCreatedDate).format(
                  "DD-MM-YYYY"
                )}
              </p>
            </div>
            <div>
              <h5>Last Modified Date</h5>
              <p>
                {moment(policySummary.violationModifiedDate).format(
                  "DD-MM-YYYY"
                )}
              </p>
            </div>
            <div>
              <a href="#">View Details For Policy Resolution</a>
            </div>
          </div>

          {targetEnttTags.length > 0 && (
            <div className="target">
              <h5>Target Entity Mandatory Tags</h5>
              {targetEnttTags.map((tagObj, index) => {
                return (
                  <span key={index}>
                    {tagObj.tagName}: <strong>{tagObj.value}</strong>
                  </span>
                );
              })}
            </div>
          )}
        </Paper>
        <Paper className={classes.paper} elevation={0}>
          <Typography
            style={{
              padding: "7px",
              fontWeight: "bold",
            }}
          >
            Issue Audit Log
          </Typography>
          <TableContainer>
            <Table
              className="policyCompTableSec"
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
                        onClick={toggleDrawer("right", true, row)}
                      >
                        <TableCell align="left">
                          {moment(row.auditdate).format("DD-MM-YYYY H:MM:SS a")}
                        </TableCell>
                        <TableCell align="left">{row.datasource}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                      </TableRow>
                    );
                  })}
                {tableData.length == 0 && (
                  <TableRow style={{ height: "200px" }}>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
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
        </Paper>
      </LayoutContainer>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false, {})}
        onOpen={toggleDrawer("right", true, {})}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
}
