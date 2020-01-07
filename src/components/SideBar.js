import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { useMediaQuery } from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QueueIcon from '@material-ui/icons/Queue';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import { toggleSideBar } from '../actions/sidebarAction'

const drawerWidth = 250;

const routes = {
  HOME: '/',
  PRAYERS: '/prayers',
  PRAYER_LIST: '/prayerlist'
}

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
  listItemIconRoot: {
    color: 'black'
  },
  listItemTextRoot: {
    color: 'black'
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`,
    borderRadius: '0 25px 25px 0'
  }
});

const SideBar = props => {
  const { classes, sidebar, dispatch, route } = props;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
console.log(route)
  useEffect(() => {
    if (isDesktopOrLaptop && !sidebar.open) {
      dispatch(toggleSideBar())
    } else if (!isDesktopOrLaptop && sidebar.open) {
      dispatch(toggleSideBar())
    }
  }, [])

  const handleToggleSideBar = () => {
    dispatch(toggleSideBar())
  }

  const changeRouteTo = (routeName) => {
    dispatch(push(routeName))
  }

  return (
    <Drawer
      open={sidebar.open}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="persistent"
      onClose={handleToggleSideBar}
    >
      <div
        className={classes.drawer}
        role="presentation"
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem
            selected={route === routes.HOME}
            button
            classes={{
              selected: classes.listItemSelected
            }}
            onClick={() => changeRouteTo(routes.HOME)}
            onKeyDown={() => changeRouteTo(routes.HOME)}
          >
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}><HomeIcon /></ListItemIcon>
            <ListItemText classes={{ root: classes.listItemTextRoot }} primary={"Feed"} />
          </ListItem>
          <ListItem
            selected={route === routes.PRAYERS}
            button
            classes={{
              selected: classes.listItemSelected
            }}
            onClick={() => changeRouteTo(routes.PRAYERS)}
            onKeyDown={() => changeRouteTo(routes.PRAYERS)}
          >
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
              <EventNoteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Prayers"} />
          </ListItem>
          <ListItem
            selected={route === routes.PRAYER_LIST}
            button
            classes={{
              selected: classes.listItemSelected
            }}
            onClick={() => changeRouteTo(routes.PRAYER_LIST)}
            onKeyDown={() => changeRouteTo(routes.PRAYER_LIST)}
          >
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
              <QueueIcon />
            </ListItemIcon>
            <ListItemText primary={"Prayer List"} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  sidebar: state.sidebar,
  route: state.router.location.pathname,
})

export default connect(mapStateToProps)(withStyles(styles)(SideBar));