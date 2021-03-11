import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthorizationToken from './actions/setAuthorizationToken'
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
    var parsedAuthUser;
      const localAuthUser = localStorage.getItem('currentUserLoginDetails')
      parsedAuthUser = JSON.parse(localAuthUser);
      console.log(parsedAuthUser, 'parsedAuthUserparsedAuthUser')
      if (parsedAuthUser) {
        setAuthorizationToken(parsedAuthUser)
      }
  }, [authUser])

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
