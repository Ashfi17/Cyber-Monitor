import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
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
  { id: "", numeric: true, disablePadding: false, label: "" },
  { id: "name", numeric: true, disablePadding: false, label: "Policy Title" },
  {
    id: "compliance_percent",
    numeric: true,
    disablePadding: false,
    label: "Compilance %",
    width: 160,
  }, { id: "", numeric: true, disablePadding: false, label: "" },
  // { id: 'severity', numeric: true, disablePadding: false, label: 'Policy Severity' },
  // { id: 'lastScan', numeric: true, disablePadding: false, label: 'Last Scanned' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
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
  statusCode: {
    top: "1113px",
    left: "302px",
    width: "6px",
    height: "48px",
    opacity: 1,
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
  }
}));

const PolicyCompilance = (props) => {
  const { tableData } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    console.log(newSelected, "newSelected");
    // setSelected(newSelected);
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell id={labelId} scope="row" padding="none">
                        {row && row.compliance_percent && row.compliance_percent === 100
                          ? <div className={classes.statusCode} style={{ background: '#00B946 0% 0% no-repeat padding-box' }} />
                          : (row && row.compliance_percent && row.compliance_percent !== 100) || (row && row.compliance_percent && row.compliance_percent !== 0)
                            ? <div className={classes.statusCode} style={{ background: '#F75C1B 0% 0% no-repeat padding-box' }} />
                            : <div className={classes.statusCode} style={{ background: '#FF1493 0% 0% no-repeat padding-box' }} />}

                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        <LinearProgress
                          // className={classes.bar1Determinate}
                          value={row.compliance_percent}
                          variant="determinate"
                          className="linearProgDeterminate"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <MoreVertIcon />
                      </TableCell>
                      {/* <TableCell align="left">{(row.severity.charAt(0).toUpperCase() + row.severity.slice(1))}</TableCell>
                      <TableCell align="left">{moment(row.lastScan).format('DD-MM-YYYY')}</TableCell> */}
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
        <Grid container alignItems="center">
          <Grid item md={6} xs={12}>
            <Grid container spacing={2} style={{ margin: 0 }}>
              <Grid item>
                <img style={{ height: "15px", verticalAlign: "middle" }} src={require("../assets/images/compliant.svg")} /> <span style={{ fontSize: "10px" }}>Complaint</span>
              </Grid>
              <Grid item>
                <img style={{ height: "15px", verticalAlign: "middle" }} src={require("../assets/images/nonCompliant.svg")} /> <span style={{ fontSize: "10px" }}>Not Complaint</span>
              </Grid>
              <Grid item>
                <img style={{ height: "15px", verticalAlign: "middle" }} src={require("../assets/images/notStarted.svg")} /> <span style={{ fontSize: "10px" }}>Not Complaint Not started</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default PolicyCompilance;
