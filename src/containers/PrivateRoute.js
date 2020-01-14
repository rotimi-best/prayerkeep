import React from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import SideBar from "../components/SideBar";
import { makeStyles } from '@material-ui/core/styles';

const Main = ({ component: Component, openSidebar, ...rest }) => {
  const drawerWidth = 250;
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideBar openSidebar={openSidebar}/>
      <Component
        rootClassName={clsx(classes.content, {
          [classes.contentShift]: !openSidebar,
        })}
        {...rest}
      />
    </div>
  )
}

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