import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
});

const navigation = ["/", "/prayers", "/prayerlist"];
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
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </>
  );
};

export default connect()(withStyles(styles)(SimpleBottomNavigation));
