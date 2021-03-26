import React, { Fragment, useContext, useEffect, useState } from "react";
import { Typography, makeStyles, Button, Link } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
const FutureCard = (props) => {
    // const classes = useStyles();

    return (
        <Fragment>
            <div className="featuresCard">
                <div className="ftrIcon">
                    <img src={props.icon} alt="Alternate Text" />
                </div>
                <h2>{props.title}</h2>
                <p>{props.paragraph}</p>
            </div>
        </Fragment >
    );
};

export default FutureCard;