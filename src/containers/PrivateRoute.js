import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ authentication, component: Component, ...rest }) => {
  const { isLoggedIn } = authentication;

  console.log("authentication", authentication);

  const componentToRender = props =>
    isLoggedIn ? <Component {...props} /> : <Redirect to="/welcome" />;

  return <Route render={componentToRender} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(PrivateRoute);