import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import QueueIcon from '@material-ui/icons/Queue';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNote';
import HomeIcon from '@material-ui/icons/Home'
import routes from '../constants/routes';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    borderTop: '1px solid #0000001f'
  }
});

const navigation = Object.keys(routes).map(routeKey => routes[routeKey]);
const SimpleBottomNavigation = props => {
  const { classes, dispatch } = props;
  const [value, setValue] = React.useState(0);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)"
  });

  if (!isMobile) {
    return null;
  }
  return (
      <>
        <div className={classes.toolbar} />
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            dispatch(push(navigation[newValue]));
            setValue(newValue);
          }}
          showLabels
          className={classes.bottomNavigation}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Prayers" icon={<EventNoteOutlinedIcon />} />
          <BottomNavigationAction label="Collection" icon={<QueueIcon />} />
      </BottomNavigation>
    </>
  );
};

export default connect()(withStyles(styles)(SimpleBottomNavigation));
