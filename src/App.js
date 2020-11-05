import React, { Suspense } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";
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
import ErrorWrapper from "./containers/ErrorWrapper";
import Header from "./components/Header";
import TriggerModalFromUrl from "./components/TriggerModalFromUrl";
import RequestPermission from "./components/RequestPermission";
import BottomNavigation from "./components/BottomNavigation";
import Alert from "./components/Alert";

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
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/prayers" component={Prayers} />
            <PrivateRoute exact path="/prayer/:prayerId" component={Prayer} />
            {/* <PrivateRoute exact path="/plans" component={Plans} />
            <PrivateRoute exact path="/plan/:id" component={Plan} /> */}
            <PrivateRoute path="/collections" component={Collections} />
            {/* <PrivateRoute path="/collection/:id" component={Collection} /> */}
            <Route path="/collection/:id" component={Collection} />
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
