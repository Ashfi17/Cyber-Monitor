import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LayoutContainer from "../reusableComponent/LayoutContainer";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, Typography, Button } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import DateRangeIcon from "@material-ui/icons/DateRange";
import IssueAssigneesEdit from "../../components/IssueAssigneesEdit";
//import IssueAssigneesEdit from "../../components/IssueAssigneesEdit";
import { getIssueAssigneesList } from "../../actions/AdminActions";

export default function ManageIssue() {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  //   const [policyKnowledgeData, setPolicyKnowledgeData] = useState([]);
  const [policyDetails, setPolicyDetails] = useState({});
  const [searchKey, setSearchKey] = useState("");
  //   const [policyListData, setPolicyListData] = useState([]);
  const [modalOpenIs, setModalOpenIs] = React.useState(false);
  const [state, setState] = React.useState({
    right: false,
  });
  const [issueAssignees, setIssueAssignees] = useState([]);
  const [selectedIssueObj, setSelectedIssueObj] = useState({});

  const handleClickOpen = (getObj) => {
    setSelectedIssueObj(getObj);
    setModalOpenIs(true);
  };

  const editModalClose = (getObj) => {
    getIssListData();
    setModalOpenIs(false);
  };

  useEffect(() => {
    getIssListData();
  }, []);

  const getIssListData = () => {
    getIssueAssigneesList()
      .then((response) => {
        if (response.length > 0) {
          setIssueAssignees(response);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <LayoutContainer pageName="Manage Issue">
        <Typography className="mITitle" variant="h5" noWrap>
          Issue Assignee
        </Typography>

        <Grid className="recentTransactions">
          <Grid className="gridComTabel tableHade">
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="h5" noWrap>
                  Issue Type
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" noWrap>
                  Assignee
                </Typography>
              </Grid>
              {/* <Grid item xs>
                <Typography variant="h5" noWrap>
                  Actions
                </Typography>
              </Grid> */}
              {/* <Grid item xs>
                <Typography variant="h5" noWrap>
                  Customer Info
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" noWrap>
                  Txn Id
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" noWrap>
                  Payment Method
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" noWrap>
                  Credit On
                </Typography>
              </Grid> */}
              <Grid item xs>
                <Typography variant="h5" noWrap>
                  Actions
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="recentTransactionsScroll">
            {issueAssignees.map((element, i) => (
              <Grid className="gridComTabel tableData" key={i}>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    {element.name}
                  </Grid>
                  <Grid item xs>
                    <Typography className="boldText" variant="h5" noWrap>
                      {element.assignee}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs>
                   
                  </Grid>
                  <Grid item xs>
                  <Typography variant="h5" noWrap>
                    sad
                  </Typography>
                </Grid>

                <Grid item xs>
                  <Grid className="creditImg">
                    <Typography variant="h5" noWrap>
                      s
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Typography variant="h5" noWrap>
                    sd
                  </Typography>
                </Grid> */}
                  <Grid item xs>
                    <Button onClick={() => handleClickOpen(element)}>
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </LayoutContainer>
      <IssueAssigneesEdit
        open={modalOpenIs}
        setOpen={setModalOpenIs}
        setClose={editModalClose}
        selectedIssueObj={selectedIssueObj}
      />
    </div>
  );
}
