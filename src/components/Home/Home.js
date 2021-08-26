import React, { useContext, useEffect, useState } from "react";
import { Typography, makeStyles, Button, Link } from "@material-ui/core";
import { loginDetails } from "../../actions/authActions";
import Container from "@material-ui/core/Container";
import { appContext } from "../../App";
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

import FutureCard from "../Cards/FutureCard";
import WhyCard from "../Cards/WhyCard";
import FooterDtlCard from "../Cards/FooterDtlCard";

const heroBanImage = require("../../assets/images/home-page-assets/hero-image-1x.png");
const FeaturesIcon1 = require("../../assets/images/home-page-assets/Features-icon-1.svg");
const FeaturesIcon2 = require("../../assets/images/home-page-assets/Features-icon-2.svg");
const FeaturesIcon3 = require("../../assets/images/home-page-assets/Features-icon-3.svg");
const centSecBanImage = require("../../assets/images/home-page-assets/center-sec-bann-img-1x.png");

const taggingCompliance1x = require("../../assets/images/home-page-assets/tagging-compliance-1x.png");
const firstInnerImg1x = require("../../assets/images/home-page-assets/first-inner-img-1x.png");
const secInnerImg1x = require("../../assets/images/home-page-assets/sec-inner-img-1x.png");

const ourFeatureCardData = [
  {
    title: "Assess",
    paragraph:
      "cyMonitor continuously assess the state of the cloud and changes in real-time to assess our cloud security and governance policy compliance.",
    icon: FeaturesIcon1,
  },
  {
    title: "Report",
    paragraph:
      "cyMonitor provides an easy way to view, monitor and report on the security and compliance of the entire cloud eco-system.",
    icon: FeaturesIcon2,
  },
  {
    title: "Remediate",
    paragraph:
      "With detailed contextual information about the compliance violation, remediation is quick with cyMonitor. cyMonitor provides auto-fixes and one click fix options.",
    icon: FeaturesIcon3,
  },
];
const whyCardCardDataArr = [
  {
    title: "Rule Engine",
    paragraph:
      "cyMonitor rule engine is 100% serverless, built using Cloud watch events, Lambda & Elastic Container Service",
    addClass: "",
  },
  {
    title: "Remediate",
    paragraph: "Single page application built using Angular",
    addClass: "blue",
  },
  {
    title: "Remediate",
    paragraph: "Single page application built using Angular",
    addClass: "skyBlue",
  },
  {
    title: "Rule Engine",
    paragraph:
      "cyMonitor rule engine is 100% serverless, built using Cloud watch events, Lambda & Elastic Container Service",
    addClass: "pink",
  },
  {
    title: "Remediate",
    paragraph: "Single page application built using Angular",
    addClass: "gray",
  },
];
const footerCardDataArr = [
  {
    title: "Continuous Monitoring",
    paragraph:
      "Real-time & continuous monitoring to detect changes as they happen.",
  },
  {
    title: "Compliance Reporting",
    paragraph:
      "Easily produce compliance reports with latest results from continuous compliance monitoring.",
  },
  {
    title: "Security That Goes Wide",
    paragraph:
      "See what’s happening across all your applications, environments, AWS accounts, regions and services.",
  },
  {
    title: "Security That Goes Deep",
    paragraph:
      "Check your environment against hundreds of customizable security best practices.",
  },
  {
    title: "Security Automation",
    paragraph:
      "Continuous visibility, automated data collection, clear visualization and alerting accelerates incident response and mitigates further risks.",
  },
];
const initialState = {
  emailId: "",
};
const Home = (props) => {
  const [stickyHeadIs, setValues] = useState(false);
  const [values, setEmlValues] = useState(initialState);

  const handleChange = (event) => {
    setEmlValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };
  const windowOnScrollEvnt = () => {
    if (window.scrollY > 100) {
      setValues(true);
    } else {
      setValues(false);
    }
  };
  window.addEventListener("scroll", (event) => {
    windowOnScrollEvnt();
  });
  const scrollToFeatSec = () => {
    var ourFtrSecElem =
      document.getElementById("ourFeaturSecId").offsetTop - 65;
    window.scrollTo(0, ourFtrSecElem);
  };
  const emailSubmitFun = (event) => {
    if (values.emailId) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.emailId)
      ) {
        alert("Your Email ID: " + values.emailId);
      } else {
        alert("Please Enter Valid Email ID");
      }
    } else {
      alert("Please Enter Your Email ID");
    }
  };

  const handleEnterClick = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      emailSubmitFun(event);
    }
  };

  return (
    <Box component="div" minHeight="100vh" bgcolor="#fff">
      <div className="manContainerSec">
        <header className={`mainHeaderSec ${stickyHeadIs ? "fixed" : ""}`}>
          <Container>
            <div className="mainHeader">
              <div style={{ flex: "100%" }} className="logoSection">
                <img
                  src={require("../../assets/images/home-page-assets/trans-logo.svg")}
                  alt="Home Page"
                />
                <ul className="headMenuList">
                  <li>
                    <Link onClick={(e) => scrollToFeatSec()}>Features</Link>
                  </li>
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div style={{ flex: "auto" }}>
                <Link
                  className="login-btn"
                  onClick={(e) => props.history.push("/login")}
                >
                  Log in
                </Link>
              </div>
            </div>
          </Container>
        </header>
        <Container>
          <div className="mainHeroSection">
            <div
              style={{
                "flex-grow": "0",
                "max-width": "40%",
                "flex-basis": "40%",
              }}
            >
              <div className="heroTextSection">
                <div>
                  <h1>
                    Compliance <span>Monitoring, Reporting</span> &{" "}
                    <span>Security Automation</span> Made Easy
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                  <button
                    className="hero-btn"
                    onClick={(e) => props.history.push("/login")}
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                "flex-grow": "0",
                "max-width": "60%",
                "flex-basis": "60%",
              }}
              className="heroImageSection"
            >
              <img src={heroBanImage} alt="Banner Img" width="100%" />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <section className="clientSecPlaceholder">
          <h3 className="sectionTitleTxt">Clients we have</h3>
          <div className="bocccc">
            <div className="flexItem">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="sectionTitleTxt" id="ourFeaturSecId">
            Our <span>Features</span>
          </h3>
          <div className="secRow ourFeaturesSecRow">
            {ourFeatureCardData.map((listObj, index) => (
              <div className="cardGrid" key={index}>
                <FutureCard
                  title={listObj.title}
                  paragraph={listObj.paragraph}
                  icon={listObj.icon}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="centerImageSec">
            <div className="cenImgRow">
              <div
                className="cenSecBannImgBox"
                style={{
                  "flex-grow": "0",
                  "max-width": "50%",
                  "flex-basis": "50%",
                }}
              >
                <img src={centSecBanImage} alt="Center Big Img" width="100%" />
              </div>
              <div
                style={{
                  "flex-grow": "0",
                  "max-width": "50%",
                  "flex-basis": "50%",
                }}
              >
                <div className="cenImgContSec">
                  <div>
                    <h3 className="sectionTitleTxt">
                      Lorem Ipsum Dolor Sit Amet, <span>Consetetur</span>{" "}
                      Sadipscing
                    </h3>
                    <p>
                      cyMonitor provides an easy way to view, monitor and report
                      on the security and compliance of the entire cloud
                      eco-system.
                    </p>
                    <ul>
                      <li>
                        <span></span> Gravida tempor nec
                      </li>
                      <li>
                        <span></span> Tincidunt consequat
                      </li>
                      <li>
                        <span></span> Porta augue tellus
                      </li>
                      <li>
                        <span></span> Mauris enim suscipit
                      </li>
                      <li>
                        <span></span> Laoreet nunc
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="secRow whySecRow">
            <div className="cardGrid">
              <h3 className="sectionTitleTxt">
                Why cyMonitor Is <span>Better</span> Than Other Tools In Market?
              </h3>
            </div>
            {whyCardCardDataArr.map((listObj, index) => (
              <div className="cardGrid" key={index}>
                <WhyCard
                  title={listObj.title}
                  paragraph={listObj.paragraph}
                  addClass={listObj.addClass}
                />
              </div>
            ))}
          </div>
        </section>
      </Container>

      <div className="footerMainSection">
        <Container style={{ position: "relative" }}>
          <div className="taggImageContBox">
            <img className="first" src={firstInnerImg1x} alt="Img1" />
            <img className="sec" src={secInnerImg1x} alt="Img2" />
          </div>
          <section>
            <div className="startView">
              <div
                style={{
                  "flex-grow": "0",
                  "max-width": "50%",
                  "flex-basis": "50%",
                }}
              >
                <h3 className="sectionTitleTxt">
                  Lorem Ipsum Dolor <span>Sit Amet</span>, Consetetur Sadipscing
                </h3>
              </div>
              <div
                style={{
                  "flex-grow": "0",
                  "max-width": "50%",
                  "flex-basis": "50%",
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolor.
                </p>
                <button onClick={(e) => props.history.push("/login")}>
                  Start Now
                </button>
              </div>
            </div>
          </section>
          <section>
            <div className="secRow">
              {footerCardDataArr.map((listObj, index) => (
                <div className="cardGrid" key={index}>
                  <FooterDtlCard
                    title={listObj.title}
                    paragraph={listObj.paragraph}
                  />
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="secRow footerBottomSec">
              <div className="cardGrid">
                <img
                  style={{ cursor: "pointer" }}
                  src={require("../../assets/images/cymonitorlogo.PNG")}
                  alt="Dashboard"
                />
              </div>
              <div className="cardGrid">
                <ul>
                  <li>Explore</li>
                  <li>Home</li>
                  <li>Features</li>
                  <li>Why Us</li>
                  <li>Highligh</li>
                  <li>Log in</li>
                </ul>
              </div>
              <div className="cardGrid">
                <ul>
                  <li>Company</li>
                  <li>About Us</li>
                  <li>Jobs</li>
                  <li>Blogs</li>
                  <li>Terms and Condition</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
              <div className="cardGrid">
                <ul>
                  <li>Join the Newsletter</li>
                  <li>
                    <div className="emailIdSection">
                      <input
                        type="email"
                        placeholder="Email ID"
                        value={values.emailId}
                        name="emailId"
                        onKeyPress={(e) => handleEnterClick(e)}
                        onChange={(e) => handleChange(e)}
                      />
                      <button onClick={(e) => emailSubmitFun()}>Submit</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </Box>
  );
};

export default Home;
