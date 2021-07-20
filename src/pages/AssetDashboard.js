import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import LayoutContainer from "../components/reusableComponent/LayoutContainer";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  getCount,
  getCountByApplication,
  getMaxMin,
} from "../actions/assetsActions";
import { gettaggingByApplication } from "../actions/complianceActions";
import AssetInvestory from "../components/AssetsComponents/AssetInvestory";
import AssetAWS from "../components/AssetsComponents/AssetAWS";
import AssetByClassification from "../components/AssetsComponents/AssetByClassification";
import AssetByApplication from "../components/AssetsComponents/AssetByApplication";
import backIcon from "../assets/images/header/back.svg";

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
    height: 140,
    width: 370,
  },
  paper1: {
    textAlign: "center",
    background: "#F1F3F9 0% 0% no-repeat padding-box",
    "border-radius": "4px",
  },
  paper2: {
    textAlign: "center",
    background: "#F1F3F9 0% 0% no-repeat padding-box",
    "border-radius": "4px",
  },
  paper3: {
    "text-align": "right",
    "letter-spacing": "0px",
    color: "#262C49",
    opacity: " 0.5",
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
  menuPaper: {
    maxHeight: 181,
  },
}));

export default function AssetDashboard(props) {
  const classes = useStyles();
  const [assetCount, setAssetCount] = useState([]);
  const [AWSAppList, setAWSAppList] = useState([]);
  const [awsAppType, setAwsAppType] = useState("subnet");
  const [countByApplication, setCountByApplication] = useState([]);
  const [overallData, setOverallData] = useState({});
  const [aWSDate, setAWSDate] = useState([]);
  const [aWSMin, setAWSMin] = useState([]);
  const [aWSMax, setAWSMax] = useState([]);

  useEffect(() => {
    getCountByApplication("subnet")
      .then((resp) => {
        if (resp) {
          setCountByApplication(resp.assetcount);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    gettaggingByApplication("subnet")
      .then((resp) => {
        console.log("jamaresp", resp);
        resp.response.map((data) => {
          console.log("jamadata", data);
          setOverallData(data);
          const keyData = Object.keys(data);
          setAWSAppList(keyData);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getMaxMin("subnet")
      .then((resp) => {
        let AWSDates = [];
        let AWSMin = [];
        let AWSMax = [];
        resp.trend.map((data) => {
          if (data.date) {
            AWSDates.push(data.date);
          }
          if (data.min) {
            AWSMin.push(data.min);
          }
          if (data.max) {
            AWSMax.push(data.max);
          }
        });
        setAWSDate(AWSDates);
        setAWSMin(AWSMin);
        setAWSMax(AWSMax);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (assetCount && countByApplication) {
      assetCount &&
        assetCount.length > 0 &&
        assetCount.map((data) => {
          if (countByApplication) {
            if (data.type === countByApplication.type) {
              const obj = {};
              obj.type = data.type;
              obj.count = data.count;
              obj.assetCount = countByApplication.assetcount;
              // setOverallData(obj);
            }
          }
        });
    }
  });

  const handleChangeAWS = (e) => {
    getMaxMin(e.target.value)
      .then((resp) => {
        let AWSDates = [];
        let AWSMin = [];
        let AWSMax = [];
        if (resp && resp.trend) {
          resp.trend.map((data) => {
            if (data.date) {
              AWSDates.push(data.date);
            }
            if (data.min) {
              AWSMin.push(data.min);
            }
            if (data.max) {
              AWSMax.push(data.max);
            }
          });
          setAWSDate(AWSDates);
          setAWSMin(AWSMin);
          setAWSMax(AWSMax);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setAwsAppType(e.target.value);
    selectedValue(e.target.value);
  };

  const selectedValue = (value) => {
    getCountByApplication(value)
      .then((resp) => {
        if (resp) {
          console.log("resp", resp);
          setCountByApplication(resp.assetcount);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const backFun = () => {
    props.history.goBack();
  };

  return (
    <div>
      <LayoutContainer pageName="Asset Dashboard">
        <Grid container spacing={3}>
          <Grid item>
            <Button className="backBtnStl" onClick={() => backFun()}><img src={backIcon} /></Button>
          </Grid>
          {/* <Grid item xs={6}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Typography
                  className={classes.paper3}
                  variant="subtitle2"
                >
                  Asset Inventorys :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  variant="outlined"
                  style={{ minWidth: "150px" }}
                >
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={"All"}
                    // onChange={handleChange}
                    style={{
                      height: "30px",
                    }}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Pass"}>Pass</MenuItem>
                    <MenuItem value={"Fail"}>Fail</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={6}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Typography className={classes.paper3} variant="subtitle2">
                  AWS Apps :
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" style={{ minWidth: "150px" }}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={awsAppType}
                    onChange={handleChangeAWS}
                    style={{
                      height: "30px",
                    }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {AWSAppList.length !== 0 &&
                      AWSAppList.map((data) => (
                        <MenuItem value={data}>{data}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item md={4} xs={12}>
            <AssetByApplication
              countDetails={assetCount}
              overallData={overallData}
              awsAppType={awsAppType}
              countByApplication={countByApplication}
            />
          </Grid>

          <Grid item md={8} xs={12}>
            <AssetAWS
              aswAppDates={aWSDate}
              awsAppMin={aWSMin}
              awsAppMax={aWSMax}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item md={6} xs={12}>
            <AssetInvestory />
          </Grid>

          <Grid item md={6} xs={12}>
            <AssetByClassification />
          </Grid>
        </Grid>

        <Typography
          variant="h6"
          style={{ fontWeight: "bold", fontSize: 14, marginTop: "32px" }}
        >
          Recommendation{" "}
          <Divider
            variant="middle"
            style={{ width: "100%", margin: "16px 0" }}
          />
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing
            </Typography>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing
            </Typography>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: 14, padding: "10px" }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing
            </Typography>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo
          </Grid>
        </Grid>
      </LayoutContainer>
    </div>
  );
}
