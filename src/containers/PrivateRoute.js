import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const isLoggedIn = false;

  const componentToRender = props => isLoggedIn ? (
    <>
      <Header />
      <Component {...props} />
    </>
    ) : <Redirect to="/welcome" />;

  return <Route render={componentToRender} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;