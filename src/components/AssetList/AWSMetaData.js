import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chart from "react-apexcharts";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function AWSMetaData(props) {
  const { assetAttributesList } = props;
  const classes = useStyles();
  console.log("assetAttributesList", assetAttributesList);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="customPaper" style={{ padding: "15px" }}>
            <Typography
              variant="h6"
              style={{
                color: "#262C49",
                fontWeight: "bold",
                fontSize: 14,
                marginBottom: "30px",
              }}
            >
              Attributes
            </Typography>
            <Grid container spacing={3}>
              {assetAttributesList.map((row, index) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Typography
                      variant="h6"
                      style={{
                        color: "rgb(188 191 202)",
                        fontWeight: "bold",
                        fontSize: 14,
                        padding: "5px 0",
                      }}
                    >
                      {row.name}
                    </Typography>
                    <Typography className="aWSMetadata">{row.value}</Typography>
                  </Grid>
                );
              })}
              {/* <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  Canonicalhostedzoneid
                </Typography>
                <Typography
                  style={{ color: "#282733", fontWeight: "bold", fontSize: 14 }}
                >
                  Z3AADJGX6KTTL2
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  _cloudType
                </Typography>
                <Typography
                  style={{ color: "#282733", fontWeight: "bold", fontSize: 14 }}
                >
                  AWS
                </Typography>
              </Grid> */}
            </Grid>
            {/* <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  Type
                </Typography>
                <Typography
                  style={{ color: "#282733", fontWeight: "bold", fontSize: 14 }}
                >
                  Application
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  Accesslog
                </Typography>
                <Typography
                  style={{ color: "#282733", fontWeight: "bold", fontSize: 14 }}
                >
                  False
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  Account ID
                </Typography>
                <Typography
                  style={{ color: "#282733", fontWeight: "bold", fontSize: 14 }}
                >
                  791152816081
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  Load Balancer Name
                </Typography>
                <Typography
                  style={{
                    color: "#282733",
                    fontWeight: "bold",
                    fontSize: 14,
                    padding: "5px",
                  }}
                >
                  Pacbot
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  Dnsname
                </Typography>
                <Typography
                  style={{
                    color: "#282733",
                    fontWeight: "bold",
                    fontSize: 14,
                    padding: "5px",
                  }}
                >
                  Loadbalancerarn
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  style={{  color: 'rgb(188 191 202)', fontWeight: "bold", fontSize: 14, padding: "5px" }}
                >
                  Loadbalancerarn
                </Typography>
                <Typography
                  style={{ color: "#282733", fontWeight: "bold", fontSize: 14 }}
                >
                  Arn:aws:elasticloadbalan
                </Typography>
              </Grid>
            </Grid> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
