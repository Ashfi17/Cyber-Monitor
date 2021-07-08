import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import searchIcon from "../assets/images/search/searchicon.svg";
import mainLoader from "../assets/images/search/loader.gif";
import {
  getCategoriesForOmni,
  getAllAssetDataWithFilter,
} from "../actions/assetsActions";

const useStyles = makeStyles((theme) => ({
  searchInputForm: {
    "& > *": {
      width: "100%",
      background: "#fff",
    },
  },
}));

export default function OmniSearch(props) {
  const classes = useStyles();
  const [searchAssetList, setSearchAssetList] = React.useState([]);
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [checkBoxListObj, setCheckboxListObj] = React.useState({});
  const [searchingTxt, setSearchingTxt] = React.useState("");
  const [selectedAsset, setSelectedAsset] = React.useState("");
  const [slctdAsstType, setSlctdAsstType] = React.useState("");
  const [secViewName, setSecViewName] = React.useState("");

  useEffect(() => {
    getCategoriesForOmni()
      .then((resp) => {
        setSearchAssetList(resp);
        setSelectedAsset(resp[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchFunOfAsst = (event) => {
    event.preventDefault();
    setSecViewName("loader");
    setSlctdAsstType("");
    var filter_obj = {
      groupBy: {
        type: "searchFilterAttributeGroup",
        name: "Group",
        values: [
          {
            type: "searchFilterAttribute",
            name: selectedAsset,
            applied: true,
          },
        ],
      },
    };
    getAllAssetDataWithFilter(searchingTxt, filter_obj)
      .then((resp) => {
        console.log("resp", resp);
        if (resp) {
          setFilteredResults(resp.results);
          setCheckboxListObj(resp.filter);
          setSecViewName("data");
        } else {
          setCheckboxListObj({});
          setSecViewName("error");
        }
      })
      .catch((error) => {
        console.log(error);
        setCheckboxListObj({});
        setSecViewName("error");
      });
  };

  const checkBoxHandleChange = (event, obj) => {
    setSecViewName("loader");
    setSlctdAsstType(obj.name);
    var filter_obj = checkBoxListObj;
    for (
      let x = 0;
      x < filter_obj.groupBy.values[0].groupBy.values.length;
      x++
    ) {
      if (filter_obj.groupBy.values[0].groupBy.values[x].name == obj.name) {
        filter_obj.groupBy.values[0].groupBy.values[x].applied = true;
      } else {
        filter_obj.groupBy.values[0].groupBy.values[x].applied = false;
      }
    }
    console.log("filter_obj", filter_obj);
    getAllAssetDataWithFilter(searchingTxt, filter_obj)
      .then((resp) => {
        setFilteredResults(resp.results);
        setSecViewName("data");
      })
      .catch((error) => {
        console.log(error);
        setSecViewName("error");
      });
  };

  /* const filterFunOfAsst = () => {
    var filter_obj = {
      groupBy: {
        type: "searchFilterAttributeGroup",
        name: "Group",
        values: [{
          type: "searchFilterAttribute",
          name: "Assets",
          applied: true
        }]
      }
    };
    getAllAssetDataWithFilter(searchingTxt, filter_obj).then((resp) => {
      console.log("resp", resp);
    }).catch((error) => {
      console.log(error);
    });
  }; */

  const onClickPageChange = () => {
    props.history.push("/asset-list");
  };
  return (
    <div>
      <LayoutContainer pageName="Search">
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item md={12} sm={12}>
            <div className="searchInputFormComMain">
              <form
                className="formControlClass"
                onSubmit={(event) => searchFunOfAsst(event)}
              >
                <div
                  className={classes.searchInputForm}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    onChange={(event) => {
                      setSearchingTxt(event.target.value);
                    }}
                  />
                </div>
                <div className="btnControlClass">
                  <select
                    name="setSelectedAsset"
                    id="selectOneVel"
                    onChange={(event) => {
                      setSelectedAsset(event.target.value);
                    }}
                  >
                    {searchAssetList.map((value, indx) => {
                      return (
                        <option key={indx} value={value}>
                          {value}
                        </option>
                      );
                    })}
                    {/* <option value="Policy Violations">Policy Violations</option>
                    <option value="Vulnerabilities">Vulnerabilities</option> */}
                  </select>
                  <Button
                    type="submit"
                    className="searchBtn"
                    disabled={!searchingTxt}
                  >
                    Search
                  </Button>
                </div>
              </form>
              {checkBoxListObj.groupBy && (
                <div>
                  <div className="filterChipMain">
                    {checkBoxListObj?.groupBy?.values[0].groupBy.values.map(
                      (checkObj, indx) => {
                        return (
                          <div key={indx} className="ChipMain">
                            <span>
                              <FormGroup row>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                      }
                                      checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                      }
                                      name="checkedI"
                                      checked={checkObj.name == slctdAsstType}
                                      onChange={(event) =>
                                        checkBoxHandleChange(event, checkObj)
                                      }
                                    />
                                  }
                                  label={checkObj.name}
                                />
                              </FormGroup>
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
            {secViewName == "data" && (
              <div className="dataViewSection">
                <Grid container spacing={3} style={{ marginTop: 20 }}>
                  <Grid item md={12} sm={12}>
                    <div className="resultsFound">
                      {" "}
                      {filteredResults.length} results found
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: 20 }}>
                  {filteredResults.map((snglObj, index) => {
                    return (
                      <Grid key={index} item md={4} sm={12}>
                        <div
                          className="filteringResults"
                          onClick={onClickPageChange}
                        >
                          <Grid container spacing={3} alignItems="center">
                            <Grid item md={7} sm={12}>
                              <div className="filteringData">
                                <p>Resource Id</p>
                                <h6>{snglObj._id}</h6>
                              </div>
                              <div className="filteringData">
                                <p>Resource Id</p>
                                <h6>{snglObj._id}</h6>
                              </div>
                              <div className="filteringDataBox">
                                <span>{snglObj.searchCategory}</span>
                              </div>
                            </Grid>
                            <Grid item md={5} sm={12}>
                              {/* <div>
                              <p>Compliance %</p>
                              <h6>68%</h6>
                            </div> */}
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            )}
            {secViewName == "loader" && (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <img width="100px" src={mainLoader} alt="Loader" />
              </div>
            )}
            {secViewName == "error" && (
              <div style={{ textAlign: "center", padding: "50px" }}>
                Doesn't look like any data is available
              </div>
            )}
            {secViewName == "" && (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <img src={searchIcon} alt="Search" width="500px" />
              </div>
            )}
          </Grid>
        </Grid>
      </LayoutContainer>
    </div>
  );
}
