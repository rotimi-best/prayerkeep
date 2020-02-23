import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from 'react-responsive';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from '@material-ui/core/Avatar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { toggleSideBar } from "../actions/sidebarAction";
import { getCollections } from "../actions/collectionsAction";
import { getPrayers } from "../actions/prayersAction";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  colorDefault: {
    // borderBottom: '2px solid #f5f5f5',
    "-webkit-box-shadow": "inset 0 -1px 0 0 #dadce0",
    boxShadow: "inset 0 -1px 0 0 #dadce0",
    backgroundColor: "#fff"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#5f6368"
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: '5vw'
    }
  }
});

const Header = props => {
  const {
    classes,
    dispatch,
    isLoggedIn,
    userPictureUrl,
    userName,
    userId
  } = props;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)"
  });

  // componentDidMount - Get all collections and prayers
  useEffect(() => {
    if (userId) {
      dispatch(getCollections(userId));
      dispatch(getPrayers(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleSideBar = () => {
    dispatch(toggleSideBar());
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
      <div className={classes.root}>
        <AppBar
          position={isDesktopOrLaptop ? "fixed" : "static"}
          className={classes.appBar}
          classes={{
            colorDefault: classes.colorDefault
          }}
          color="default"
          elevation={0}
        >
          <Toolbar>
            {!isMobile &&
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleToggleSideBar}
                onKeyDown={handleToggleSideBar}
              >
                <MenuIcon />
              </IconButton>}
            <Typography variant="h6" className={classes.title}>
              Parchment Notebook
            </Typography>
            <Avatar alt={userName} src={userPictureUrl.data ? userPictureUrl.data.url : userPictureUrl} />
          </Toolbar>
        </AppBar>
      </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  userPictureUrl: PropTypes.string,
};

Header.defaultProps = {
  userPictureUrl: {},
}

const mapStateToProps = state => ({
  route: state.router.location.pathname,
  isLoggedIn: state.authentication.isLoggedIn,
  userId: state.authentication.user && state.authentication.user.userId,
  userName: state.authentication.user && state.authentication.user.name,
  userPictureUrl: state.authentication.user
    && state.authentication.user.picture,
  sidebar: state.sidebar
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
