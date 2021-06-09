import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";
import LayoutContainer from "../reusableComponent/LayoutContainer";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { getComplianceTagging } from "../../actions/complianceActions";
// import icon from '../../assets/OverallCompilancetrend/'

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
    transform: 'scale(0.9, 0.9)'
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [taggingCountDetails, setTaggingCountDetails] = useState({ "output": { "assets": 0, "untagged": 0, "tagged": 0, "compliance": 0 } });

  const gridData = [
    {
      icon: "../../assets/OverallCompilancetrend/vpc.svg",
      name: "Subnet",
      tagging: 0,
      untagging: 55,
    },
    {
      icon: "../../assets/OverallCompilancetrend/sg.svg",
      name: "SG",
      tagging: 1,
      untagging: 26,
    },
    {
      icon: "../../assets/OverallCompilancetrend/vpc.svg",
      name: "VPC",
      tagging: 0,
      untagging: 18,
    },
    {
      icon: "../../assets/OverallCompilancetrend/volume.svg",
      name: "Volume",
      tagging: 0,
      untagging: 5,
    },
    {
      icon: "../../assets/OverallCompilancetrend/ec2.svg",
      name: "EC2",
      tagging: 1,
      untagging: 3,
    },
    {
      icon: "../../assets/OverallCompilancetrend/kms.svg",
      name: "KMS",
      tagging: 0,
      untagging: 3,
    },
    {
      icon: "../../assets/OverallCompilancetrend/appelb.svg",
      name: "APPELB",
      tagging: 0,
      untagging: 1,
    },
    {
      icon: "../../assets/OverallCompilancetrend/snapshot.svg",
      name: "SNAPSHOT",
      tagging: 0,
      untagging: 1,
    },
    {
      icon: "../../assets/OverallCompilancetrend/vpngateway.svg",
      name: "VPNGATEWAY",
      tagging: 0,
      untagging: 1,
    },
    {
      icon: "../../assets/OverallCompilancetrend/asg.svg",
      name: "ASG",
      tagging: 1,
      untagging: 0,
    },
    {
      icon: "../../assets/OverallCompilancetrend/lambda.svg",
      name: "LAMBDA",
      tagging: 2,
      untagging: 0,
    },
    {
      icon: "../../assets/OverallCompilancetrend/rdsdb.svg",
      name: "RDSDB",
      tagging: 1,
      untagging: 0,
    },
    {
      icon: "../../assets/OverallCompilancetrend/s3.svg",
      name: "S3",
      tagging: 1,
      untagging: 0,
    },
    {
      icon: "../../assets/OverallCompilancetrend/elasticsearch.svg",
      name: "ELASTICSEARCH",
      tagging: 1,
      untagging: 0,
    },
  ];

  const chartSeries = [55, 67];
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
            formatter: function (val) {
              return 63;
            },
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

  const trendSeries = [
    {
      name: "Fail",
      color: "#26C76E",
      data: [50, 95, 65],
    },
  ];
  const trendOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
      //   dropShadow: {
      //     enabled: true,
      //     color: '#000',
      //     top: 18,
      //     left: 7,
      //     blur: 10,
      //     opacity: 0.2
      //   },
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
      categories: ["Jan `21", "Feb `21", "Mar `21", "Apr `21"],
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
  }, []);

  const redirectingToAssetListDash = (getParam) => {
    var storeObj = {
      type: "taggable",
      data: { tagged: "false" }
    };
    if (getParam == "total") {
      storeObj.data = {};
    } else if (getParam == "tagging") {
      storeObj.data.tagged = "true";
    } else {
      storeObj.data.tagged = "false";
    }
    console.log("storeObj", storeObj);
    localStorage.setItem("assetDataForFilter", JSON.stringify(storeObj));
    props.history.push("/assetlist-table");
  };

  return (
    <div className={classes.root}>
      <LayoutContainer pageName="Tagging Compliance">
        <Grid container spacing={3}>
          <Grid item md={3} xs={6}>
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          <Grid item md={3} xs={6}>
            <Paper className={classes.paper} style={{ cursor: "pointer" }} onClick={() => redirectingToAssetListDash("total")}>
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
            </Paper>
          </Grid>
          <Grid item md={3} xs={6}>
            <Paper className={classes.paper} style={{ cursor: "pointer" }} onClick={() => redirectingToAssetListDash("tagging")}>
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
            </Paper>
          </Grid>
          <Grid item md={3} xs={6}>
            <Paper className={classes.paper} style={{ cursor: "pointer" }} onClick={() => redirectingToAssetListDash("untagging")}>
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
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Paper className={classes.paper}>
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
                  <Chart
                    options={trendOptions}
                    series={trendSeries}
                    type="line"
                    height={220}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography>
                <Typography
                  variant="h6"
                  style={{ color: "black", fontWeight: "bold", fontSize: 14 }}
                >
                  Total Tag Compliance
                </Typography>
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="radialBar"
                  height={260}
                />
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
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <div className={classes.legendContainer}>
                      {/* <div
                        className={classes.legendCircle}
                        style={{ borderColor: "#26C76E" }}
                      ></div> */}
                      <Typography
                        variant="caption"
                        style={{ marginLeft: 8, color: "black" }}
                      >
                        Application
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ color: "black" }}>113</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ color: "black" }}>08</div>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <div
                      className={classes.legendContainer}
                    // style={{ marginLeft: 12 }}
                    >
                      <Typography
                        variant="caption"
                        style={{ marginLeft: 8, color: "black" }}
                      >
                        {/* <div
                        className={classes.legendCircle}
                        style={{ borderColor: "#7569EE" }}
                      ></div> */}
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
                </Grid>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Paper className="overallCompncTrendComp">
          <Typography
            variant="h6"
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >Overall Compliance Trend</Typography>
          <Grid container spacing={3}>
            {gridData.map((data) => (
              <Grid item md={2} sm={4} xs={6} className={classes.tabletShape}>
                <ul
                  style={{
                    listStyle: "none",
                    padding: "20px 5px",
                    textAlign: "center"
                  }}
                >
                  <li>
                    <Typography>
                      <img
                        src={require("../../assets/OverallCompilancetrend/vpc.svg")}
                      />
                      <Typography
                        style={{
                          fontWeight: "bold",
                          color: "#262C49",
                        }}
                      >
                        {data.name}
                      </Typography>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography
                          variant="h6"
                          style={{
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          Tagging
                          </Typography>
                        <Typography>{data.tagging}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="h6"
                          style={{
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          Untagging
                          </Typography>
                        <Typography>{data.untagging}</Typography>
                      </Grid>
                    </Grid>
                  </li>
                </ul>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </LayoutContainer>
    </div>
  );
}
