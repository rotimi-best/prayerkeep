import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { useMediaQuery } from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import QueueIcon from '@material-ui/icons/Queue';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import { toggleSideBar } from '../actions/sidebarAction';
import routes from '../constants/routes';
import configs from '../configs';

const drawerWidth = 250;

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
  },
  paperAnchorDockedLeft: {
    borderRight: 'none'
  },
  mobilePaperAnchorDockedLeft: {
    boxShadow: '0 0 16px rgba(0,0,0,.28)'
  },
  gutters: {
    marginBottom: 10
  }
});

const SideBar = props => {
  const { classes, sidebar, dispatch, route } = props;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

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
    if (!isDesktopOrLaptop) {
      handleToggleSideBar()
    }

    dispatch(push(routeName))
  }

  const drawerClasses = {
    paper: classes.drawerPaper,
    paperAnchorDockedLeft: classes.mobilePaperAnchorDockedLeft
  }

  return (
    <Drawer
      open={sidebar.open}
      classes={drawerClasses}
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
              selected: classes.listItemSelected,
              gutters: classes.gutters
            }}
            onClick={() => changeRouteTo(routes.HOME)}
            onKeyDown={() => changeRouteTo(routes.HOME)}
          >
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}><HomeIcon /></ListItemIcon>
            <ListItemText classes={{ root: classes.listItemTextRoot }} primary={"Home"} />
          </ListItem>
          <ListItem
            selected={route === routes.PRAYERS}
            button
            classes={{
              selected: classes.listItemSelected,
              gutters: classes.gutters
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
            selected={route === routes.COLLECTIONS}
            button
            classes={{
              selected: classes.listItemSelected,
              gutters: classes.gutters
            }}
            onClick={() => changeRouteTo(routes.COLLECTIONS)}
            onKeyDown={() => changeRouteTo(routes.COLLECTIONS)}
          >
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
              <QueueIcon />
            </ListItemIcon>
            <ListItemText primary={"Collections"} />
          </ListItem>

          <Divider />

          <Link
            href={`mailto:${configs.SUPPORT_EMAIL}?subject=[Help]: Parchment Notebook`}
            underline="none"
            color="textPrimary"
            target="_blank"
            rel="noopener"
          >
            <ListItem button>
              <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                <ContactSupportIcon />
              </ListItemIcon>
              <ListItemText primary={"Contact Support"} />
              <ListItemSecondaryAction>
                <OpenInNewIcon />
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        </List>
      </div>
    </Drawer>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  sidebar: state.sidebar,
  route: state.router.location.pathname,
})

export default connect(mapStateToProps)(withStyles(styles)(SideBar));