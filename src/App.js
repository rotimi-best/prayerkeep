import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { history } from './configureStore';
import customMuiTheme from './customMuiTheme';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Prayer from './components/Prayer';
import PrayerList from './components/PrayerList';
import PrivateRoute from './containers/PrivateRoute';
import ErrorWrapper from './containers/ErrorWrapper';

function App() {
  return (
    <ErrorWrapper>
      <MuiThemeProvider theme={customMuiTheme}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <PrivateRoute
              exact
              path="/"
              component={Home}
            />
            <PrivateRoute
              exact
              path="/prayers"
              component={Prayer}
            />
            <PrivateRoute
              path="/prayerlist"
              component={PrayerList}
            />
            <Redirect
              to="/welcome"
            />
          </Switch>
        </ConnectedRouter>
      </MuiThemeProvider>
    </ErrorWrapper>
  );
}

export default App;
