import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import SideBar from "../components/SideBar";
import PrayerModal from '../components/PrayerModal';

const Main = ({ component: Component, openPrayerModal, openSidebar, ...rest }) => (
  <div>
    <SideBar openSidebar={openSidebar}/>
    <Component
      {...rest}
    />
    {openPrayerModal && <PrayerModal backUrl={rest.match.url} />}
  </div>
);

const PrivateRoute = ({ isLoggedIn, component, openPrayerModal, openSidebar, ...rest }) => {
  const componentToRender = props =>
    isLoggedIn
    ? <Main
        component={component}
        openSidebar={openSidebar}
        openPrayerModal={openPrayerModal}
        {...props}
      />
    : <Redirect to="/welcome" />;

  return <Route render={componentToRender} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired
};

const mapStateToProps = ({ authentication, sidebar, modalListener }) => ({
  openSidebar: sidebar.open,
  openPrayerModal: modalListener.prayerModal.open,
  isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);