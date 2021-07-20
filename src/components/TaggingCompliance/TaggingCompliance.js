import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";
import LayoutContainer from "../reusableComponent/LayoutContainer";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography, Button } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import LinearProgress from "@material-ui/core/LinearProgress";
import backIcon from "../../assets/images/header/back.svg";
import {
  getComplianceTagging,
  getTaggingComplianceTrend,
  getTotalTagCompliance,
  fetchTaggingSummaryByTargetType,
} from "../../actions/complianceActions";
// import icon from '../../assets/OverallCompilancetrend/'
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: "5px",
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#26C76E",
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  helpOutline: {
    marginTop: "-11px",
  },
  legendCircle: {
    height: 12,
    width: 12,
    borderRadius: "50%",
    borderWidth: "2px ",
    borderStyle: "solid",
  },
  topTypo: {
    fontWeight: "bold",
    fontSize: 14,
    "text-decoration": "underline",
  },
  tabletShape: {
    height: "200px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "2px solid #D8DCE9",
    "border-radius": "15px",
    transform: "scale(0.9, 0.9)",
  },
}));

const trendSeriesTemp = [
  {
    name: "Fail",
    color: "#26C76E",
    data: [],
  },
];
const trendOptionsTemp = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
    toolbar: {
      show: true,
    },
  },
  colors: ["#7569EE", "#26C76E", "#E46666"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    min: 50,
    max: 100,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [taggingCountDetails, setTaggingCountDetails] = useState({
    output: { assets: 0, untagged: 0, tagged: 0, compliance: 0 },
  });
  const [trendSeries, setTrendSeries] = useState(trendSeriesTemp);
  const [trendOptions, setTrendOptions] = useState(trendOptionsTemp);
  const [unTaggedList, setUnTaggedList] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [gridDataList, setGridDataList] = useState([]);

  const chartOptions = {
    chart: {
      height: 200,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Overall",
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Application", "Environment"],
    color: ["#F7A844", "#7569EE"],
  };

  useEffect(() => {
    getComplianceTagging()
      .then((respo) => {
        if (respo) {
          setTaggingCountDetails(respo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getTotalTagCompliance()
      .then((respo) => {
        if (respo) {
          setUnTaggedList(respo.response.untaggedList);
          var chartDataArr = [];
          respo.response.untaggedList.forEach((element) => {
            chartDataArr.push(element.compliancePercentage);
          });
          setChartSeries(chartDataArr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getTaggingComplianceTrend()
      .then((respo) => {
        if (respo) {
          for (let x = 0; x < respo.compliance_trend.length; x++) {
            const element_obj = respo.compliance_trend[x];
            trendSeriesTemp[0].data.push(element_obj.compliance);
            trendOptionsTemp.xaxis.categories.push(element_obj.start_date);
          }
          setTrendSeries(trendSeriesTemp);
          setTrendOptions(trendOptionsTemp);
          // setTaggingCountDetails(respo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    fetchTaggingSummaryByTargetType()
      .then((respo) => {
        if (respo) {
          setGridDataList(respo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const redirectingToAssetListDash = (getParam, obj) => {
    var storeObj = {
      type: "taggable",
      data: {
        tagged: "false",
        resourceType: undefined,
      },
    };
    if (getParam == "total") {
      storeObj.data = {};
    } else if (getParam == "tagging") {
      storeObj.data.tagged = "true";
    } else {
      storeObj.data.tagged = "false";
    }
    if (obj) {
      storeObj.data.resourceType = obj.name;
    }
    localStorage.removeItem("searchedAsstListPgeFilterObjs");
    localStorage.setItem("assetDataForFilter", JSON.stringify(storeObj));
    props.history.push("/assetlist-table");
  };

  return (
    <div className={classes.root}>
      <LayoutContainer pageName="Tagging Compliance">
        {/* <Button className="backBtnStl" onClick={() => props.history.goBack()}>
          <img src={backIcon} />
        </Button> */}
        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          <Grid item md={3} xs={6}>
            <div className="customPaper padding16">
              <Typography className={classes.helpOutline}>
                <HelpOutlineIcon />
              </Typography>
              <Typography className="overallStatusComp">
                <Typography
                  variant="h6"
                  style={{ color: "#E46666" }}
                  className={classes.topTypo}
                >
                  {taggingCountDetails.output.compliance}%
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: "#262C49", fontSize: 12 }}
                >
                  Compliant
                </Typography>
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div
              className="customPaper padding16"
              style={{ cursor: "pointer" }}
              onClick={() => redirectingToAssetListDash("total", null)}
            >
              <Typography className={classes.helpOutline}>
                <HelpOutlineIcon />
              </Typography>
              <Typography className="overallStatusComp">
                <Typography
                  variant="h6"
                  style={{ color: "#262C49" }}
                  className={classes.topTypo}
                >
                  {taggingCountDetails.output.assets}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: "#262C49", fontSize: 12 }}
                >
                  Total Assets
                </Typography>
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div
              className="customPaper padding16"
              style={{ cursor: "pointer" }}
              onClick={() => redirectingToAssetListDash("tagging", null)}
            >
              <Typography className={classes.helpOutline}>
                <HelpOutlineIcon />
              </Typography>
              <Typography className="overallStatusComp">
                <Typography
                  className={classes.topTypo}
                  variant="h6"
                  style={{ color: "#26C76E" }}
                >
                  {taggingCountDetails.output.tagged}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: "#262C49", fontSize: 12 }}
                >
                  Tagging
                </Typography>
              </Typography>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div
              className="customPaper padding16"
              style={{ cursor: "pointer" }}
              onClick={() => redirectingToAssetListDash("untagging", null)}
            >
              <Typography className={classes.helpOutline}>
                <HelpOutlineIcon />
              </Typography>
              <Typography className="overallStatusComp">
                <Typography
                  variant="h6"
                  style={{ color: "#E46666" }}
                  className={classes.topTypo}
                >
                  {taggingCountDetails.output.untagged}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: "#262C49", fontSize: 12 }}
                >
                  Untagged
                </Typography>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <div className="customPaper padding16">
              <Typography
                variant="h6"
                style={{ color: "black", fontWeight: "bold", fontSize: 14 }}
              >
                Overall Compliance Trend
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 6, marginBottom: 6 }}
              >
                <Grid item xs={12} style={{ height: "323px" }}>
                  {trendSeries[0].data.length > 0 && (
                    <Chart
                      options={trendOptions}
                      series={trendSeries}
                      type="line"
                      height={220}
                    />
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className="customPaper padding16  totalTag ">
              <Typography>
                <Typography
                  variant="h6"
                  style={{ color: "black", fontWeight: "bold", fontSize: 14 }}
                >
                  Total Tag Compliance
                </Typography>
                {chartSeries.length > 0 && (
                  <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="radialBar"
                    height={260}
                  />
                )}
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography style={{ color: "black" }}>TagName</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ color: "black" }}>Untagged</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ color: "black" }}>Tagged</Typography>
                  </Grid>
                </Grid>
                {unTaggedList.map((data, index) => (
                  <Grid container spacing={3} key={index}>
                    <Grid item xs={4}>
                      <div className={classes.legendContainer}>
                        <Typography
                          variant="caption"
                          style={{ marginLeft: 8, color: "black" }}
                        >
                          {data.name}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ color: "black" }}>{data.untagged}</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ color: "black" }}>{data.tagged}</div>
                    </Grid>
                  </Grid>
                ))}
                {/* <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <div
                      className={classes.legendContainer}
                    >
                      <Typography
                        variant="caption"
                        style={{ marginLeft: 8, color: "black" }}
                      >
                        Environment
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ color: "black" }}>112</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ color: "black" }}>09</div>
                  </Grid>
                </Grid> */}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <div className="overallCompncTrendComp customPaper">
          <Typography
            variant="h6"
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            Overall Compliance Trend
          </Typography>
          <Grid className="nowrapcontainer">
            {gridDataList.map((data, index) => (
              <Grid
                item
                md={2}
                sm={4}
                xs={6}
                className="tabletShape"
                key={index}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: "20px 5px",
                    textAlign: "center",
                  }}
                >
                  <li>
                    <Typography>
                      <img
                        src={require("../../assets/OverallCompilancetrend/vpc.svg")}
                      />
                      <Typography className="tagsName">{data.name}</Typography>
                    </Typography>
                    <div className="overallComplianceProgress">
                      <BorderLinearProgress
                        variant="determinate"
                        value={data.tagged}
                      />
                    </div>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="h6" className="taggingText">
                          Tagging
                        </Typography>
                        {data.tagged == 0 && (
                          <Typography className="taggedData">
                            {data.tagged}
                          </Typography>
                        )}
                        {data.tagged > 0 && (
                          <Typography
                            className="taggedData"
                            onClick={() =>
                              redirectingToAssetListDash("tagging", data)
                            }
                          >
                            {data.tagged}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6" className="untaggingText">
                          Untagging
                        </Typography>
                        {data.untagged == 0 && (
                          <Typography className="untaggedData">
                            {data.untagged}
                          </Typography>
                        )}
                        {data.untagged > 0 && (
                          <Typography
                            className="untaggedData"
                            onClick={() =>
                              redirectingToAssetListDash("untagging", data)
                            }
                          >
                            {data.untagged}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </li>
                </ul>
              </Grid>
            ))}
          </Grid>
        </div>
      </LayoutContainer>
    </div>
  );
}
