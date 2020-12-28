import React from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: "0px 3px 6px #2C28281C",
  },

  legendContainer: {
    display: "flex",
    alignItems: "center",
  },
  legendCircle: {
    height: 12,
    width: 12,
    borderRadius: "50%",
    borderWidth: "1px ",
    borderStyle: "solid",
  },
  chartLabels: {
    width: "100%",
    margin: "8px 0",
    display: "flex",
    justifyContent: "space-between",
  },
}));
const Notifications = () => {
  const classes = useStyles();

  const notifs = [
    { type: "g", text: "You have one new Notification" },
    { type: "g", text: "You have one new Notification" },
    { type: "b", text: "Task Completed" },
    { type: "b", text: "Task Completed" },
    { type: "r", text: "Warning Notification" },
    { type: "b", text: "Task Completed" },
    { type: "r", text: "Warning Notification" },
    { type: "r", text: "Warning Notification" },
  ];

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography style={{ fontWeight: "bold" }}>Notifications</Typography>

      {notifs.map((item, index) => (
        <Grid container spacing={3} style={{ marginTop: 6 }}>
          <Grid item xs={1}>
            <img
              src={
                item.type === "g"
                  ? require("../assets/images/notification-plus-icon.svg")
                  : item.type === "b"
                  ? require("../assets/images/task-completed-noti-icon.svg")
                  : require("../assets/images/warning-notif-icon.svg")
              }
            />
          </Grid>
          <Grid
            item
            xs={11}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              style={{
                color:
                  item.type === "g"
                    ? "#26C76E"
                    : item.type === "b"
                    ? "#46CEE8"
                    : "#E46666",
                marginLeft: 10,
              }}
            >
              {item.text}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ opacity: 0.5, marginLeft: 10 }}
            >
              3 hours ago
            </Typography>
            <Divider
              variant="middle"
              style={{ width: "100%", margin: "16px 0" }}
            />
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default Notifications;
