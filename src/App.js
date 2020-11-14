import React, { Suspense } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { history } from "./configureStore";
import customMuiTheme from "./customMuiTheme";
import Home from "./components/Home";
import Prayers from "./components/Prayers";
import Prayer from "./components/Prayer";
import Plans from "./components/Plans";
import PlanPreview from "./components/PlanPreview";
import Plan from "./components/Plan";
import Collections from "./components/Collections";
import Collection from "./components/Collection";
import PrivateRoute from "./containers/PrivateRoute";
import ErrorWrapper from "./containers/ErrorWrapper";
import Header from "./components/Header";
import TriggerModalFromUrl from "./components/TriggerModalFromUrl";
import RequestPermission from "./components/RequestPermission";
import BottomNavigation from "./components/BottomNavigation";
import Alert from "./components/Alert";
import SnackBar from "./components/SnackBar";

import ROUTES from './constants/routes';

const AsyncWelcome = React.lazy(() => import('./components/Welcome'));
const Welcome = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AsyncWelcome />
  </Suspense>
)

function App() {
  return (
    <ErrorWrapper >
      <MuiThemeProvider theme={customMuiTheme}>
        <ConnectedRouter history={history}>
          <TriggerModalFromUrl />
          <RequestPermission />
          <Header />
          <SnackBar />
          <Switch>
            <Route exact path={ROUTES.WELCOME} component={Welcome} />
            <PrivateRoute exact path={ROUTES.HOME} component={Home} />
            <PrivateRoute exact path={ROUTES.PRAYERS} component={Prayers} />
            <PrivateRoute exact path={ROUTES.PLANS} component={Plans} />
            <PrivateRoute exact path={ROUTES.PLAN_PREVIEW} component={PlanPreview} />
            <PrivateRoute exact path={ROUTES.PLAN} component={Plan} />
            <PrivateRoute exact path={ROUTES.PRAYER} component={Prayer} />
            <PrivateRoute path={ROUTES.COLLECTIONS} component={Collections} />
            <PrivateRoute path={ROUTES.COLLECTION} component={Collection} ignoreLogIn/>
            <Redirect to="/" />
          </Switch>
          <BottomNavigation />
          <Alert />
        </ConnectedRouter>
      </MuiThemeProvider>
    </ErrorWrapper>
  );
}

export default App;
