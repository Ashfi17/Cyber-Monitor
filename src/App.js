import React from "react";
import "./App.css";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import store from "./store";

import Routers from "./Router";

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
    fontFamily: "Poppins, sans-serif",
    button: {
      textTransform: "none",
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routers />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
