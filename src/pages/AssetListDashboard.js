import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import AssetListDetails from "../components/AssetList/AassetListDetails";
import AssociatedPolicies from "../components/AssetList/AssociatedPolicies";
import AWSNotification from "../components/AssetList/AWSNotification";
import AssetTags from "../components/AssetList/AssetTags";
import AssetSummary from "../components/AssetList/AssetSummary";
import AWSMetaData from "../components/AssetList/AWSMetaData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
  getTargetType,
  getAssetTagsData,
  getAssetSummaryData,
} from "../actions/assetsActions";
import backIcon from "../assets/images/header/back.svg";
import {
  getAssociatedPolicies,
  getAssociatedPoliciesTableData,
  getPolicyviolationsSummary,
} from "../actions/complianceActions";

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
  {
    id: "policyName",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Policy Name</div>,
  },
  {
    id: "lastScan",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Last Scanned</div>,
  },
  {
    id: "frequency",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Frequency</div>,
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

export default function AssetList(props) {
  const useStyles = makeStyles((theme) => ({
    rootDetails: {
      flexGrow: 1,
    },
    paperDetails: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      boxShadow: "0px 3px 6px #2c28281c",
      borderRadius: "10px",
    },
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }));

  const [selectedRowData, setSelectedRowData] = useState({});
  const [associatedPolicy, setAssociatedPolicy] = useState([]);

  useEffect(() => {
    getTargetType()
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.rowData
    ) {
      // setSelectedRowData(props.location.state.rowData);
      getAssociatedPolicies(props.location.state.rowData)
        .then((respo) => {
          setAssociatedPolicy(respo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    var omni_search_val = localStorage.getItem("omniSearchObj");
    if (omni_search_val) {
      var omniSearchObj = JSON.parse(omni_search_val);
      let newId = omniSearchObj._id.replace(/\//g, "%2F");
      setResourceIdForView(omniSearchObj._id);
      setResourceIdUrl(omniSearchObj._entitytype + "/" + omniSearchObj._id);
      getAssotTableData(omniSearchObj._entitytype + "/" + newId);
      getAssetSummaryData(omniSearchObj._id)
        .then((resp) => {
          console.log("resp", resp);
          setSelectedRowData(resp.attributes[2]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [resourceIdForView, setResourceIdForView] = React.useState("");
  const [resourceIdUrl, setResourceIdUrl] = React.useState("");
  const [assetSummaryData, setAssetSummaryData] = React.useState([]);
  const [overallResponce, setOverallResponce] = React.useState({});
  const [assetTagsList, setAssetTagsList] = React.useState([]);
  const [assetAttributesList, setAssetAttributesList] = React.useState([]);
  const [state, setState] = React.useState({ right: false });
  const [selectedPolicyObj, setSelectedPolicyObj] = useState({});

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
    Math.min(
      rowsPerPage,
      associatedPolicy && associatedPolicy.length - page * rowsPerPage
    );

  useEffect(() => {
    var omni_search_val = localStorage.getItem("omniSearchObj");
    if (omni_search_val) {
      var omniSearchObj = JSON.parse(omni_search_val);
      let newId = omniSearchObj._id.replace(/\//g, "%2F");
      setResourceIdForView(omniSearchObj._id);
      setResourceIdUrl(omniSearchObj._entitytype + "/" + omniSearchObj._id);
      getAssotTableData(omniSearchObj._entitytype + "/" + newId);
    }
  }, []);

  const getAssotTableData = (srcUrl) => {
    getAssociatedPoliciesTableData(srcUrl)
      .then((respo) => {
        setAssociatedPolicy(respo.response);
      })
      .catch((error) => {
        console.log(error);
      });
    getPolicyviolationsSummary(srcUrl)
      .then((resp) => {
        if (resp) {
          setOverallResponce(resp);
          setAssetSummaryData(resp.severityInfo);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getAssetTagsData(srcUrl)
      .then((respo) => {
        var tags_obj = respo.tags;
        var tags_arr = [];
        for (var property in tags_obj) {
          var new_obj = {
            tabName: property,
            value: tags_obj[property],
          };
          tags_arr.push(new_obj);
        }
        setAssetTagsList(tags_arr);
        setAssetAttributesList(respo.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
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
            Policy Name
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            {selectedPolicyObj.policyName}
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
            Frequency
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
            {selectedPolicyObj.frequency}
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
            Severity
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
            {selectedPolicyObj.severity}
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
            Last Scanned
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
            {selectedPolicyObj.lastScan}
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
            Issue ID
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
            {selectedPolicyObj.issueId}
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
            ScanHistory
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            {selectedPolicyObj.scanHistory}
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
            Rule Id
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            {selectedPolicyObj.ruleId}
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
            PolicyId
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            {selectedPolicyObj.policyId}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );

  const toggleDrawer = (anchor, open, dataObj) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setSelectedPolicyObj(dataObj);
  };

  const failClickEvent = (e, dataObj) => {
    e.stopPropagation();
    dataObj.IssueId = dataObj.issueId;
    dataObj.ResourceId = resourceIdForView;
    localStorage.setItem("plcyViolParams", JSON.stringify(dataObj));
    props.history.push("/pl-violations-details");
  };

  return (
    <div>
      <LayoutContainer pageName="Asset Detail">
        <Button className="backBtnStl" onClick={() => props.history.goBack()}>
          <img src={backIcon} />
        </Button>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <div className={classes.rootDetails}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Paper className={classes.paperDetails}>
                    <Typography variant="h6" className="nowrapCustom">
                      {resourceIdForView}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ color: "#262C49", fontSize: 12 }}
                    >
                      Resource Id
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paperDetails}>
                    <Typography
                      variant="h6"
                      style={{
                        color: "#7569EE",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      {overallResponce.compliance} %
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ color: "#262C49", fontSize: 12 }}
                    >
                      Overall Compliance
                    </Typography>
                  </Paper>
                </Grid>
                {selectedRowData.value && (
                  <Grid item xs={3}>
                    <Paper className={classes.paperDetails}>
                      <Typography
                        variant="h6"
                        style={{
                          color: "#262C49",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {selectedRowData.value}
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{ color: "#262C49", fontSize: 12 }}
                      >
                        Instance State
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                <Grid item xs={3}>
                  <Paper className={classes.paperDetails}>
                    <Typography
                      variant="h6"
                      style={{
                        color: "#262C49",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      10.65.136.150
                      <Typography
                        style={{
                          color: "#262C49",
                          fontWeight: "bold",
                          fontSize: 12,
                          marginLeft: "93px",
                          marginTop: "-21px",
                        }}
                      >
                        (Private)
                      </Typography>
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ color: "#262C49", fontSize: 12 }}
                    >
                      IP Address
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </div>
            {/* <AssetListDetails /> */}
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={8}>
            <div className={classes.root}>
              <div className="customPaper tagesAss">
                <TableContainer>
                  <p style={{ padding: "10px 15px 0" }}>{resourceIdUrl}</p>
                  <Table
                    className={classes.table}
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
                      rowCount={associatedPolicy && associatedPolicy.length}
                    />
                    <TableBody>
                      {stableSort(
                        associatedPolicy,
                        getComparator(order, orderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.policyName);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.policyName}
                              selected={isItemSelected}
                              style={{ cursor: "pointer" }}
                              onClick={toggleDrawer("right", true, row)}
                            >
                              <TableCell align="left">
                                {row.policyName}
                              </TableCell>
                              <TableCell align="left">
                                {row.lastScan === "Pass" ? (
                                  <div style={{ color: "#26C76E" }}>Pass</div>
                                ) : (
                                  <div
                                    style={{ color: "#E46666" }}
                                    onClick={(e) => failClickEvent(e, row)}
                                  >
                                    Fail
                                  </div>
                                )}
                              </TableCell>
                              <TableCell align="left">
                                {row.frequency}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={associatedPolicy && associatedPolicy.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={4} direction="column">
            {/* <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <AWSNotification />
            </Grid> */}
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <AssetTags assetTagsList={assetTagsList} />
            </Grid>
          </Grid>
          {/* <Grid item xs={3} direction="column">
          <AssetTags />
          </Grid> */}
        </Grid>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <AssetSummary assetSummaryData={assetSummaryData} />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            {assetAttributesList && (
              <AWSMetaData assetAttributesList={assetAttributesList} />
            )}
          </Grid>
        </Grid>
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
