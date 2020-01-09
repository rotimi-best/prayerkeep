import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from './SideBar';
import { toggleSideBar } from '../actions/sidebarAction'

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  colorDefault: {
    // borderBottom: '2px solid #f5f5f5',
    '-webkit-box-shadow': 'inset 0 -1px 0 0 #dadce0',
    boxShadow: 'inset 0 -1px 0 0 #dadce0',
    backgroundColor: '#fff'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#5f6368'
  },
  title: {
    flexGrow: 1,
  },
});

const Header = (props) => {
  const { classes, sidebar, dispatch } = props;

  const handleToggleSideBar = () => {
    dispatch(toggleSideBar())
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        classes={{
          colorDefault: classes.colorDefault
        }}
        color="default"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleToggleSideBar}
            onKeyDown={handleToggleSideBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Patchment Notebook
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <SideBar />
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  sidebar: state.sidebar
})

export default connect(mapStateToProps)(withStyles(styles)(Header));