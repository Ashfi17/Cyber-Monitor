import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import axios from "axios";
import Routers from "./Router";

export const appContext = createContext();

export let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7569EE",
    },
    secondary: {
      main: "#262C49",
    },
    text: {
      primary: "#262C49",
      secondary: "#EDEDF2",
    },
  },
  typography: {
    // fontFamily: "Poppins, sans-serif",
    fontFamily: `"Poppins", sans-serif`,
    button: {
      textTransform: "none",
    },
  },
});

theme = responsiveFontSizes(theme);

const App = (props) => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    console.log(authUser, 'parsedAuthUserparsedAuthUser')
    var parsedAuthUser;
      const localAuthUser = localStorage.getItem('currentUserLoginDetails')
      console.log(localAuthUser, 'parsedAuthUserparsedAuthUser')
      parsedAuthUser = JSON.parse(localAuthUser);
      console.log(parsedAuthUser, 'parsedAuthUserparsedAuthUser')
      if (parsedAuthUser && parsedAuthUser.access_token) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${parsedAuthUser.access_token}`}
      }
  }, [])
  // useEffect(()  => {
  //   var parsedAuthUser;
  //   const localAuthUser = sessionStorage.getItem('currentUserLoginDetails')
  //   parsedAuthUser = JSON.parse(localAuthUser);
  //   axios.interceptors.request.use(
  //     (config) => {
  //       if (config) {
  //         // if (config.data) {
  //         //   if (config.data.dontSendToken) {
  //         //   } else if (parsedAuthUser) {
  //         //     config.headers["Authorization"] =
  //         //       "Bearer " + parsedAuthUser.access_token;
  //         //   }
  //         // } else {
  //           if (parsedAuthUser) {
  //             config.headers["Authorization"] =
  //               "Bearer " + parsedAuthUser.access_token;
  //           }
  //         // }
  //       }
  //       return config;
  //       // console.log(config, 'config')
  //       // if (localAuthUser) {
  //       //   parsedAuthUser = JSON.parse(localAuthUser);
  //       //   axios.defaults.headers.common = {'Authorization': `Bearer ${parsedAuthUser.access_token}`}
  //       // }
  //       // return null;
  //     },
  //     (error) => {
  //       // setIsWaitingForResponse(false);
  //       return Promise.reject(error);
  //     }
  //   )
  // }, [authUser])

  // useEffect(() => {
  //   if (authUser) {
  //     props.history.push('/')
  //   }
  // }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <appContext.Provider
           value={{
            authUser,
            setAuthUser
           }}
        >
          <CssBaseline />
          <Routers />
        </appContext.Provider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
