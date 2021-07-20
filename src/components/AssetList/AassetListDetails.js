import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import backIcon from "../../assets/images/header/back.svg";

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

export default function CenteredGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Button className="backBtnStl" onClick={() => props.history.goBack()}>
          <img src={backIcon} />
        </Button>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              variant="h6"
              style={{ color: "#262C49", fontWeight: "bold", fontSize: 14 }}
            >
              I-2398649c2...
            </Typography>
            <Typography variant="h6" style={{ color: "#262C49", fontSize: 12 }}>
              Resource Id
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              variant="h6"
              style={{ color: "#7569EE", fontWeight: "bold", fontSize: 14 }}
            >
              98 %
            </Typography>
            <Typography variant="h6" style={{ color: "#262C49", fontSize: 12 }}>
              Overall Compliance
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              variant="h6"
              style={{ color: "#262C49", fontWeight: "bold", fontSize: 14 }}
            >
              Running
            </Typography>
            <Typography variant="h6" style={{ color: "#262C49", fontSize: 12 }}>
              Instance State
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              variant="h6"
              style={{ color: "#262C49", fontWeight: "bold", fontSize: 14 }}
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
            <Typography variant="h6" style={{ color: "#262C49", fontSize: 12 }}>
              IP Address
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
