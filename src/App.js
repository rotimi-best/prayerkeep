import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { history } from './configureStore';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Prayer from './components/Prayer';
import PrayerList from './components/PrayerList';
import PrivateRoute from './containers/PrivateRoute';
import ErrorWrapper from './containers/ErrorWrapper';

function App() {
  return (
    <ErrorWrapper>
      <main>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <PrivateRoute
              path="/"
              component={Home}
            />
            <PrivateRoute
              exact
              path="/prayer"
              component={Prayer}
            />
            <PrivateRoute
              path="/prayerlist/:id"
              component={PrayerList}
            />
            <Redirect
              to="/welcome"
            />
          </Switch>
        </ConnectedRouter>
      </main>
    </ErrorWrapper>
  );
}

export default App;
