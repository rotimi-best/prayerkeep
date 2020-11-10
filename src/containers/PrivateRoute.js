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

const PrivateRoute = ({ isLoggedIn, ignoreLogIn, component, openPrayerModal, openSidebar, ...rest }) => {
  const componentToRender = props =>
    (isLoggedIn || ignoreLogIn)
    ? <Main
        component={component}
        openSidebar={openSidebar}
        openPrayerModal={openPrayerModal}
        {...props}
      />
    : <Redirect to={`/welcome?goTo=${props.match.url}`} />;

  return <Route render={componentToRender} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  ignoreLogIn: PropTypes.bool,
};

const mapStateToProps = ({ authentication, global, modalListener }) => ({
  openSidebar: global.openSideBar,
  openPrayerModal: modalListener.prayerModal.open,
  isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);