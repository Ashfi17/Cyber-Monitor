import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Button } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import backIcon from "../../assets/images/header/back.svg";
import {
  Paper,
  Chip,
  Grid,
  Typography,
  FormControl,
  Select,
  IconButton,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LayoutContainer from "../reusableComponent/LayoutContainer";
// import AssetList from '../../components/AssetList/AssetList'
import { postFiltersApi, getFilterTags } from "../../actions/complianceActions";
import { getAssets, getTaggableData } from "../../actions/assetsActions";

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
    id: "_resourceid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Resource ID</div>,
  },
  // {
  //   id: "name",
  //   numeric: true,
  //   disablePadding: false,
  //   label: <div style={{ fontWeight: "bold" }}>Compilance %</div>,
  // },
  {
    id: "publicip",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Public IP</div>,
  },
  {
    id: "allocationid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Allocation ID</div>,
  },
  {
    id: "_cloudType",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Cloud Type</div>,
  },
  {
    id: "private",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Private</div>,
  },
  {
    id: "accountid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Account ID</div>,
  },
  /* {
    id: "subnetid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Subnet ID</div>,
  }, */
  {
    id: "instanceid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Instance ID</div>,
  },
  {
    id: "accountname",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Account Name</div>,
  },
  {
    id: "_entitytype",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Asset Type</div>,
  },

  {
    id: "domain",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Domain</div>,
  },
  {
    id: "networkinterfaceid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Network Interface ID</div>,
  },
  {
    id: "region",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Region</div>,
  },
  {
    id: "networkinterfaceownerid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Network Interface Owner ID</div>,
  },
  {
    id: "associationid",
    numeric: true,
    disablePadding: false,
    label: <div style={{ fontWeight: "bold" }}>Association ID</div>,
  },
  // {
  //   id: "state",
  //   numeric: true,
  //   disablePadding: false,
  //   label: <div style={{ fontWeight: "bold" }}>State</div>,
  // },
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
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
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
  iconButton: {
    padding: 10,
  },
  root1: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 261,
    height: 40,
    top: 63,
    left: 1055,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  select: {
    "&:before": {
      borderColor: "white",
    },
  },
  paper3: {
    top: "63px",
    left: "563px",
    width: "241px",
    height: "40px",
  },
}));

const AssetListTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [tableData, setTableData] = useState([]);
  const [uniqueList, setUniqueAssetList] = useState([]);
  const [filterTagsList, setFilterTagsList] = useState([]);
  const [filteredElementsList, setFilteredElementsList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [assetType, setAssetType] = useState("All");
  const [category, setCategory] = useState("All");
  const [assetDataFilterObj, setAssetDataFilterObj] = useState({});
  const [state, setState] = React.useState({ right: false });
  const [selectedPolicyObj, setSelectedPolicyObj] = useState({});

  useEffect(() => {
    postFiltersApi("blank")
      .then((resp) => {
        let arrayData = [];
        resp.response.map((data) => {
          arrayData.push(data.optionName.trim());
        });
        const uniqueArray = arrayData.filter((v, i, a) => a.indexOf(v) === i);
        setUniqueAssetList(uniqueArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var user_srchd_filter_obj_str = localStorage.getItem(
      "searchedAsstListPgeFilterObjs"
    );
    if (user_srchd_filter_obj_str) {
      let usersFilterArr = JSON.parse(user_srchd_filter_obj_str);
      setFilteredElementsList(usersFilterArr);
      dataModifyForApi(usersFilterArr);
      return false;
    }
    var asset_data_filter_obj_str = localStorage.getItem("assetDataForFilter");
    if (asset_data_filter_obj_str) {
      let assetFilterObj = JSON.parse(asset_data_filter_obj_str);
      var filterObj = assetFilterObj.data;
      var new_arr = [];
      for (var property in filterObj) {
        var new_obj = {
          name: property,
          value: filterObj[property],
        };
        new_arr.push(new_obj);
      }
      /* if (assetFilterObj.data.tagged) {
        new_arr.push({
          name: "tagged",
          value: assetFilterObj.data.tagged
        });
      }
      if (assetFilterObj.data.name) {
        new_arr.push({
          name: "asset type",
          value: assetFilterObj.data.name
        });
      } */
      setFilteredElementsList(new_arr);
      fetchTaggableDataList(filterObj);
    } else {
      fetchTaggableDataList({});
    }
    /* if (asset_data_filter_obj) {
      setAssetDataFilterObj(asset_data_filter_obj);
      if (asset_data_filter_obj.type == "taggable") {
        
      } else {
        var filterObj = asset_data_filter_obj.data;
        getAssets(searchKey, filterObj)
          .then((respo) => {
            if (respo) {
              setTableData(respo);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setAssetDataFilterObj({});
      var filterObj = {
        domain: "Infra & Platforms",
      };
      getAssets(searchKey, filterObj).then((respo) => {
        if (respo) {
          setTableData(respo);
        }
      }).catch((error) => {
        console.log(error);
      });
    } */
  }, []);

  const fetchTaggableDataList = (property) => {
    getTaggableData(property)
      .then((respo) => {
        if (respo) {
          setTableData(respo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (e, row) => {
    e.stopPropagation();
    if (row) {
      props.history.push(`/asset-list`, {
        rowData: row,
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const removeSelectedItem = (index) => {
    const temp_arr = [...filteredElementsList];
    temp_arr.splice(index, 1);
    setFilteredElementsList(temp_arr);
    dataModifyForApi(temp_arr);
  };

  const removeAllSelectedItems = () => {
    localStorage.removeItem("assetDataForFilter");
    localStorage.removeItem("searchedAsstListPgeFilterObjs");
    setFilteredElementsList([]);
    dataModifyForApi([]);
  };

  const handleSearchResults = (e) => {
    setSearchKey(e.target.value);
    var filterObj = {};
    filterObj[assetType.toLowerCase()] = e.target.value;
    const temp_arr = [...filteredElementsList];
    let passLoopIs = true;
    for (let j = 0; j < temp_arr.length; j++) {
      const element = temp_arr[j];
      if (element.name.toLowerCase() == assetType.toLowerCase()) {
        temp_arr[j].value = e.target.value;
        passLoopIs = false;
        break;
      }
    }

    if (passLoopIs) {
      if (assetType.toLowerCase() == "resource type") {
        for (let x = 0; x < temp_arr.length; x++) {
          const element = temp_arr[x];
          if (element.name == "asset type") {
            temp_arr.splice(x);
          }
        }
      }
      temp_arr.push({
        name: assetType.toLowerCase(),
        value: e.target.value,
      });
    }
    localStorage.removeItem("assetDataForFilter");
    localStorage.setItem(
      "searchedAsstListPgeFilterObjs",
      JSON.stringify(temp_arr)
    );
    setFilteredElementsList(temp_arr);
    dataModifyForApi(temp_arr);
    // fetchTaggableDataList(filterObj);
    /* var filterObj = {};
    if (assetDataFilterObj?.type == "taggable") {
      filterObj = assetDataFilterObj.data;
      getTaggableData(e.target.value, filterObj)
        .then((respo) => {
          if (respo) {
            setTableData(respo);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      filterObj = assetDataFilterObj.data;
      getAssets(e.target.value, filterObj)
        .then((resp) => {
          setTableData(resp);
        })
        .catch((error) => {
          console.log(error);
        });
    } */
  };

  const dataModifyForApi = (getArrList) => {
    var filterObj = {};
    for (let e = 0; e < getArrList.length; e++) {
      const element = getArrList[e];
      var name = element.name;
      if (name == "asset type" || name == "resource type") {
        name = "resourceType";
      }
      filterObj[name] = element.value;
    }
    fetchTaggableDataList(filterObj);
  };

  const handleChangeAssetType = (e) => {
    setAssetType(e.target.value);
    var sendParam = e.target.value.toLowerCase();
    if (sendParam == "resource type") {
      sendParam = "targettype";
    }
    getFilterTags(sendParam)
      .then((resp) => {
        if (resp) {
          let arrayData = [];
          resp.response.map((data) => {
            arrayData.push(data.name);
          });
          const uniqueArray = arrayData.filter((v, i, a) => a.indexOf(v) === i);
          setFilterTagsList(uniqueArray);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, tableData && tableData.length - page * rowsPerPage);

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
        <Grid item xs={6}>
          <Typography
            style={{
              padding: "7px",
              color: "#b3b0af",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Resource ID
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            {selectedPolicyObj._resourceid}
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
            Monitoring State
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            {selectedPolicyObj.monitoringstate}
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

  return (
    <div className={classes.root}>
      <LayoutContainer pageName="Asset List">
        <Button
          className="backBtnStl"
          style={{ marginBottom: "10px" }}
          onClick={() => props.history.goBack()}
        >
          <img src={backIcon} />
        </Button>
        <Grid
          container
          style={{ paddingBottom: "40px" }}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.paper3}>
              <Paper component="form" className={classes.root1}>
                <Typography style={{ color: "#b2bbbf", fontSize: 14 }}>
                  Asset Type:
                  <FormControl
                    variant="outlined"
                    style={{
                      width: "164px",
                      height: 0,
                      maxHeight: "197px",
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      // value={assetType}
                      onChange={(e) => handleChangeAssetType(e)}
                      className={classes.select}
                      style={{
                        height: "40px",
                        top: "-10px",
                        width: "172px",
                        maxHeight: "197px",
                      }}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      {uniqueList.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Typography>
              </Paper>
            </Typography>
          </Grid>
          {/* <Grid item xs={4}>
                <Typography className={classes.paper3}>
                  <Paper component="form" className={classes.root1}>
                    <Typography style={{ color: "#b2bbbf", fontSize: 14 }}>
                      Category :{"  "}
                      <FormControl
                        variant="outlined"
                        style={{ width: "164px", height: 0 }}
                      >
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={"All"}
                          className={classes.select}
                          // onChange={handleChange}
                          style={{
                            height: "40px",
                            top: "-10px",
                            width: "181px",
                          }}
                        >
                          <MenuItem value={"All"}>All</MenuItem>
                          <MenuItem value={"Pass"}>Pass</MenuItem>
                          <MenuItem value={"Fail"}>Fail</MenuItem>
                        </Select>
                      </FormControl>
                    </Typography>
                  </Paper>
                </Typography>
              </Grid> */}
          <Grid item className="searchForAssetList">
            <Typography className={classes.paper3}>
              <FormControl
                variant="outlined"
                style={{
                  width: "164px",
                  height: 0,
                  maxHeight: "197px",
                }}
              >
                <Select
                  labelId="demo-simple-select-outlined2-label"
                  id="demo-simple-select-outlined2"
                  value=""
                  onChange={(e) => handleSearchResults(e)}
                  className={classes.select}
                  style={{
                    height: "40px",
                    top: "-10px",
                    width: "172px",
                    maxHeight: "197px",
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Tag
                  </MenuItem>
                  {filterTagsList.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <Paper
                style={{
                  border: "1px solid #7569EE80",
                  borderRadius: "8px",
                  boxShadow: "none",
                }}
                component="form"
                className={classes.root1}
              >
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon style={{ color: "#7569ee" }} />
                </IconButton>
                <InputBase
                  className={classes.input}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={(e) => handleSearchResults(e)}
                />
              </Paper> */}
            </Typography>
          </Grid>
        </Grid>

        <div className="customPaper">
          <div className="getFilteringData">
            {filteredElementsList.map((data, index) => (
              <div className="taggedFilter" key={index}>
                {data.name}: {data.value}
                <button
                  className="right-close-wrap"
                  onClick={() => removeSelectedItem(index)}
                >
                  X
                </button>
              </div>
            ))}
            {/* <div className="taggedFilter">
                Asset Type: {assetDataFilterObj.type}
                <div className="right-close-wrap">X</div>
              </div> */}
            {filteredElementsList.length > 0 && (
              <button
                className="taggedFilter"
                onClick={() => removeAllSelectedItems()}
              >
                CLEAR ALL
              </button>
            )}
          </div>
          <TableContainer>
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
                rowCount={tableData && tableData.length}
              />
              <TableBody>
                {stableSort(tableData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._resourceid);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={toggleDrawer("right", true, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          align="left"
                          onClick={(e) => handleClick(e, row)}
                        >
                          {row._resourceid ? row._resourceid : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.publicip ? row.publicip : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.allocationid ? row.allocationid : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row._cloudType ? row._cloudType : "No Data"}
                          {/* {
                            <Chip
                              style={{ borderRadius: "4px" }}
                              label={
                                row._entitytype.charAt(0).toUpperCase() +
                                row._entitytype.slice(1)
                              }
                            />
                          } */}
                        </TableCell>
                        <TableCell align="left">
                          {row.privateipaddress
                            ? row.privateipaddress
                            : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.accountid ? row.accountid : "No Data"}
                          {/* {
                            <Chip
                              style={{ borderRadius: "4px" }}
                              label={
                                <div
                                  style={{
                                    color:
                                      row.state === "available"
                                        ? "#7569EE"
                                        : row.state === "completed"
                                          ? "#26C76E"
                                          : "#F7A844",
                                  }}
                                >
                                  {row.state === undefined
                                    ? "Running"
                                    : row.state === "in-use"
                                      ? "Running"
                                      : row.state.charAt(0).toUpperCase() +
                                      row.state.slice(1)}
                                </div>
                              }
                            />
                          } */}
                        </TableCell>
                        <TableCell align="left">
                          {row.instanceid ? row.instanceid : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.accountname ? row.accountname : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row._entitytype ? row._entitytype : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.domain ? row.domain : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.networkinterfaceid
                            ? row.networkinterfaceid
                            : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.region ? row.region : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.networkinterfaceownerid
                            ? row.networkinterfaceownerid
                            : "No Data"}
                        </TableCell>
                        <TableCell align="left">
                          {row.associationid ? row.associationid : "No Data"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
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
          />
        </div>
      </LayoutContainer>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false, {})}
        onOpen={toggleDrawer("right", true, {})}
      >
        {list("right")}
      </SwipeableDrawer>
      {/* <AssetList
				rowData={selectedRowData}
			/> */}
    </div>
  );
};
export default AssetListTable;
