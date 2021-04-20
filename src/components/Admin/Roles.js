import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LayoutContainer from "../reusableComponent/LayoutContainer";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, Typography, Button } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";
import {
  getRoleDataList,
  getRoleDetailsFromId,
} from "../../actions/AdminActions";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: "black",
    height: "191px",
    borderRadius: "10px",
  },
  paper1: {
    textAlign: "center",
    background: "#F1F3F9 0% 0% no-repeat padding-box",
    borderRadius: "4px",
  },
  paper2: {
    textAlign: "center",
    background: "#F1F3F9 0% 0% no-repeat padding-box",
    borderRadius: "4px",
  },
  paper3: {
    top: "63px",
    left: "563px",
    width: "241px",
    height: "40px",
  },
  iconButton: {
    padding: 10,
  },
  root1: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 261,
    height: 40,
    // top: 63,
    // left: 1055,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const roleResDataListArrTemp = [
  {
    roleId: "703",
    createdBy: "asgc",
    description: "ROLE_ADMIN",
    roleName: "ROLE_ADMIN",
    modifiedDate: "2018-03-13T17:26:58.000+0000",
    createdDate: "2018-03-13T17:26:58.000+0000",
    users: ["admin@pacbot.org"],
  },
  {
    roleId: "1",
    createdBy: "asgc",
    description: "ROLE_USER",
    roleName: "ROLE_USER",
    modifiedDate: "2018-01-23T00:00:00.000+0000",
    createdDate: "2018-01-23T00:00:00.000+0000",
    users: [
      "userId2",
      "user@pacbot.org",
      "abcd",
      "admin@pacbot.org",
      "userId1",
    ],
  },
];

export default function ManageRoles() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openEditMdl, setOpenEditMdl] = React.useState(false);
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  //   const [policyKnowledgeData, setPolicyKnowledgeData] = useState([]);
  const [roleDataObj, setRoleDataObj] = useState({});
  const [policyDetails, setPolicyDetails] = useState({});
  const [searchKey, setSearchKey] = useState("");
  //   const [policyListData, setPolicyListData] = useState([]);
  const [state, setState] = React.useState({ right: false });
  //
  const [createEditModalTitle, setCreateEditModalTitle] = useState("create");
  const [ruleResData, setRoleResData] = useState({});
  // for og data
  const [roleResDataListArr, setRoleResDataListArr] = useState([]);

  useEffect(() => {
    getRoleDataList()
      .then((resp) => {
        setRoleResData(resp);
        setRoleResDataListArr(resp.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getRoleDataAfterEdit = () => {
    getRoleDataList()
      .then((resp) => {
        setRoleResData(resp);
        setRoleResDataListArr(resp.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   useEffect(() => {
  //     const searchKey = "";
  //     policyknowledgeApi(searchKey)
  //       .then((resp) => {
  //         setPolicyKnowledgeData(resp.response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     const arryData = [];
  //     getPolicyList()
  //       .then((result) => {
  //         if (result && result.content) {
  //           result.content.map((data) => {
  //             const json = Object.assign({}, data);
  //             arryData.push(json);
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     console.log(arryData, "arrayData");
  //     setPolicyListData(arryData);
  //   }, []);

  const handleChangeGrid = (data) => {
    if (data) {
      setPolicyDetails(data);
    }
  };

  //   const handleChangeSeverity = (event) => {
  //     const searchKey = event.target.value;
  //     policyknowledgeApi(searchKey)
  //       .then((resp) => {
  //         setPolicyKnowledgeData(resp.response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     setSeverity(event.target.value);
  //   };
  //   const handleChangeCategory = (event) => {
  //     console.log(event.target.value);
  //     const searchKey = event.target.value;
  //     policyknowledgeApi(searchKey)
  //       .then((resp) => {
  //         setPolicyKnowledgeData(resp.response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     setCategory(event.target.value);
  //   };

  //   const handleSearchResults = (e) => {
  //     setSearchKey(e.target.value);
  //     policyknowledgeApi(searchKey)
  //       .then((resp) => {
  //         setPolicyKnowledgeData(resp.response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const editHandleClickOpen = (obj) => {
    setState({ ...state, right: false });
    getRoleDetailsFromId(obj.roleId)
      .then((resp) => {
        obj.writePermission = resp.writePermission;
        setRoleDataObj(obj);
        setOpenEditMdl(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDrawer = (anchor, open, dataObj) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
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
            Manage Roles
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
      <Typography style={{ "margin-top": "30px" }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Role Name
        </Typography>
        <Typography
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "14px",
            marginLeft: "10px",
          }}
        >
          {roleDataObj.roleName}
        </Typography>
      </Typography>
      <Typography style={{ "margin-top": "30px" }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Users
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
          {roleDataObj.users ? roleDataObj.users.join(", ") : "--"}
        </Typography>
      </Typography>
      <Typography style={{ "margin-top": "30px" }}>
        <Typography
          style={{
            padding: "7px",
            color: "#b3b0af",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Description
        </Typography>
        <Typography
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "14px",
            marginLeft: "10px",
          }}
        >
          {roleDataObj.description ? roleDataObj.description : "--"}
        </Typography>
      </Typography>
      <Typography style={{ "margin-top": "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Allocation
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              {roleDataObj.users ? roleDataObj.users.length : "--"}
            </span>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Created By
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              {roleDataObj.createdBy ? roleDataObj.createdBy : "--"}
            </span>
          </Grid>
        </Grid>
      </Typography>

      <Typography style={{ "margin-top": "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Created Date
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              {moment(roleDataObj.createdDate).format("DD/MM/YYYY")}
            </span>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "10px",
                color: "#b3b0af",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Modified Date
            </Typography>
            <span
              style={{
                color: "black",
                padding: "10px",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              {moment(roleDataObj.modifiedDate).format("DD/MM/YYYY")}
            </span>
          </Grid>
        </Grid>
      </Typography>
      <div
        style={{ textAlign: "right" }}
        onClick={() => {
          editHandleClickOpen(roleDataObj);
        }}
      >
        <img
          style={{ cursor: "pointer" }}
          src={require("../../assets/images/Group 515.svg")}
        />
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <LayoutContainer>
        <Grid container direction="row" justify="flex-end">
          <Grid item>
            <Grid container direction="row" spacing={3}>
              <Grid item>
                <Button className="addFillButton">View User Roles</Button>
              </Grid>
              <Grid item>
                <Button
                  className="addNewButton"
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  Create Roles
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className="box manageRules">
          <Grid container spacing={3}>
            {roleResDataListArr.map((data_obj, index) => (
              <Grid className="rulesData" item md={3} xs={6} key={index}>
                <Paper
                  className={classes.paper}
                  onClick={toggleDrawer("right", true, data_obj)}
                >
                  <Grid
                    container
                    direction="column"
                    justify="space-between"
                    style={{ height: "100%" }}
                  >
                    <Grid style={{ width: "100%" }}>
                      <h5>{data_obj.roleName}</h5>
                      <p>{data_obj.users ? data_obj.users.join(", ") : "--"}</p>
                    </Grid>
                    <Grid>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        style={{ height: "100%" }}
                      >
                        <Grid
                          item
                          md={3}
                          xs={6}
                          style={{ "text-align": "left" }}
                        >
                          <p>Allocation</p>
                          <span className="alloCation">
                            {data_obj.users ? data_obj.users.length : "--"}
                          </span>
                        </Grid>
                        <Grid
                          item
                          md={3}
                          xs={6}
                          style={{ "text-align": "right" }}
                        >
                          <p>Created By</p>
                          <span className="CreatedBy">
                            {data_obj.createdBy ? data_obj.createdBy : "--"}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>

        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false, {})}
          onOpen={toggleDrawer("right", true, {})}
        >
          {list("right")}
        </SwipeableDrawer>
      </LayoutContainer>

      <CreateRole
        openPopUp={open}
        onCloseModal={(e) => setOpen(false)}
        getRolesDataAfterEdt={getRoleDataAfterEdit}
      />
      {openEditMdl ? (
        <EditRole
          openPopUp={openEditMdl}
          data={roleDataObj}
          onCloseModal={(e) => setOpenEditMdl(false)}
          getRolesDataAfterEdt={getRoleDataAfterEdit}
        />
      ) : (
        false
      )}
    </div>
  );
}
