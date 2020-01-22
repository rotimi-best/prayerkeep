import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import SideBar from "../components/SideBar";
import PrayerModal from '../components/PrayerModal';

const Main = ({ component: Component, openSidebar, ...rest }) => (
  <div style={{ display: 'flex' }}>
    <SideBar openSidebar={openSidebar}/>
    <Component
      {...rest}
    />
    <PrayerModal backUrl={rest.match.url} />
  </div>
);

const PrivateRoute = ({ isLoggedIn, component, openSidebar, ...rest }) => {
  const componentToRender = props =>
    isLoggedIn
    ? <Main
        component={component}
        openSidebar={openSidebar}
        {...props}
      />
    : <Redirect to="/welcome" />;

  return <Route render={componentToRender} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired
};

const mapStateToProps = ({ authentication, sidebar }) => ({
  openSidebar: sidebar.open,
  isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);