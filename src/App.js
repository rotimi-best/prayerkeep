import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { history } from "./configureStore";
import customMuiTheme from "./customMuiTheme";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Prayers from "./components/Prayers";
import Collections from "./components/Collections";
import PrivateRoute from "./containers/PrivateRoute";
import ErrorWrapper from "./containers/ErrorWrapper";
import Header from "./components/Header";
import TriggerModalFromUrl from "./components/TriggerModalFromUrl";
import BottomNavigation from "./components/BottomNavigation";

function App() {


  return (
    <ErrorWrapper >
      <MuiThemeProvider theme={customMuiTheme}>
        <ConnectedRouter history={history}>
          <TriggerModalFromUrl />
          <Header />
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/prayers" component={Prayers} />
            <PrivateRoute path="/collections" component={Collections} />
            <Redirect to="/" />
          </Switch>
          <BottomNavigation />
        </ConnectedRouter>
      </MuiThemeProvider>
    </ErrorWrapper>
  );
}

export default App;
