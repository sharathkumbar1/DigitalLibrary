import React from "react";
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout/Layout";
import praxisTheme from "../config/themeConfig";

function App() {
  return (
    <MuiThemeProvider theme={praxisTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
