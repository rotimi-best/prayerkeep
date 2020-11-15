import React, { Suspense } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import * as Sentry from "@sentry/react";

import { history } from "./configureStore";
import customMuiTheme from "./customMuiTheme";
import Home from "./components/Home";
import Prayers from "./components/Prayers";
import Prayer from "./components/Prayer";
// import Plans from "./components/Plans";
// import Plan from "./components/Plan";
import Collections from "./components/Collections";
import Collection from "./components/Collection";
import PrivateRoute from "./containers/PrivateRoute";
import Header from "./components/Header";
import TriggerModalFromUrl from "./components/TriggerModalFromUrl";
import RequestPermission from "./components/RequestPermission";
import BottomNavigation from "./components/BottomNavigation";
import Alert from "./components/Alert";
import SnackBar from "./components/SnackBar";

const AsyncWelcome = React.lazy(() => import('./components/Welcome'));
const Welcome = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AsyncWelcome />
  </Suspense>
)

function FallbackComponent() {
  return <div>An error has occurred. Please send me a message on twitter <a href="https://twitter.com/rotimi_best">@rotimi_best</a></div>;
}

function App() {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <MuiThemeProvider theme={customMuiTheme}>
        <ConnectedRouter history={history}>
          <TriggerModalFromUrl />
          <RequestPermission />
          <Header />
          <SnackBar />
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/prayers" component={Prayers} />
            <PrivateRoute exact path="/prayer/:prayerId" component={Prayer} />
            {/* <PrivateRoute exact path="/plans" component={Plans} />
            <PrivateRoute exact path="/plan/:id" component={Plan} /> */}
            <PrivateRoute path="/collections" component={Collections} />
            <PrivateRoute path="/collection/:id" component={Collection} ignoreLogIn/>
            <Redirect to="/" />
          </Switch>
          <BottomNavigation />
          <Alert />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Sentry.ErrorBoundary>
  );
}

export default Sentry.withProfiler(App);
