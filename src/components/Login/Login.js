import React, { useContext, useEffect, useState }  from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";
import { loginDetails } from '../../actions/authActions';
import { appContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  heading: {
    // top: '0px',
    // left: '0px',
    width: "8px",
    height: "40px",
    "text-align": "left",
    font: "normal normal bold 34px/51px Raleway",
    "letter-spacing": "0px",
    color: " #7569EE",
  },
  headingWelcome: {
    // top: '163px',
    // left: '0px',
    width: "370px",
    height: "91px",
    "text-align": "left",
    font: "normal normal bold 34px/51px Raleway",
    "letter-spacing": "0px",
    opacity: 1,
    color: " black",
  },
  fieldName: {
		'margin-left': '303px',
    width: "83px",
    height: "19px",
    "text-align": "left",
    font: "normal normal normal 16px/36px Raleway",
    "letter-spacing": "0px",
    color: "black",
    opacity: 1,
  },
  inputField: {
    "margin-top": "16px",
		'margin-left': '303px',
    width: "270px",
    height: "50px",
    background: " #FFFFFF00 0% 0% no-repeat padding-box",
    border: "1px solid black",
    "border-radius": "5px",
    opacity: 1,
  },
  loginButton: {
    top: "219px",
    'margin-left': '303px',
    width: "270px",
    height: "53px",
    background: "#7569EE 0% 0% no-repeat padding-box",
    "box-shadow": "0px 10px 20px #7569EE33",
    border: "1px solid #7569EE",
    "border-radius": "20px",
    opacity: 1,
  },
	forgotPassword: {
		'font-size': '13px',
		'margin-left': '303px',
		font: "normal normal normal 16px/36px Raleway",
    "letter-spacing": "0px",
	}
}));

const initialState = {
	username: "",
	password: "",
};

const Login = (props) => {
  const classes = useStyles();
	const { authUser, setAuthUser } = useContext(appContext);

	const [values, setValues] = useState(initialState);

	const handleChange = (event) => {
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }));
	}

	const saveLoginDetails = () => {
		loginDetails(values).then((response) => {
			console.log(response.data, 'respo123')
			if (response.data.success === true) {
				localStorage.setItem("authUser", JSON.stringify(response.data));
			} else {
				alert(response.data.message)
			}
			setAuthUser(response.data);
		}).catch((error) => {
			console.log(error)
		})
	}

  return (
    <Typography>
      <span className={classes.headingWelcome}>Welcome </span>
      <span className={classes.heading}>to cyMonitor</span>
        <Typography className={classes.fieldName}>User Name</Typography>
        <input type="text" className={classes.inputField} value={values.username} name='username' onChange={(e) => handleChange(e)}/>
        <Typography className={classes.fieldName}>Password</Typography>
        <input type="password" className={classes.inputField} value={values.password} name='password' onChange={(e) => handleChange(e)} />
				<Typography className={classes.forgotPassword}>Forgot Password</Typography>
      <Button className={classes.loginButton} onClick={saveLoginDetails}>LOGIN</Button>
    </Typography>
  );
};

export default Login;
