import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import ScrollMenu from "react-horizontal-scrolling-menu";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import PrayerCard from './PrayerCard';
import NewPrayerButton from './NewPrayerButton';
import Empty from './Empty';

import { getPrayers, setPrayersTabValue } from '../actions/prayersAction';

const styles = theme => ({
  containerRoot: {
    padding: 0,
    "& .horizontal-menu": {
      margin: "10px 5px",
      "& .MuiChip-root": {
        marginRight: 15,
        fontSize: 16,
        fontWeight: "bold",
        cursor: "pointer"
      },
      "& .arrow": {
        backgroundColor: '#fff',
        boxShadow: '0 1px 5px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.26)'
      }
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  },
  filters: {},
  tab: {
    top: 60,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      top: 0
    }
  }
});

const Arrow = ({ text, className }) => {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="arrow"
      className={className}
    >
      {text}
    </IconButton>
  );
};

const ArrowLeft = Arrow({ text: <NavigateBeforeIcon />, className: "arrow-prev arrow" });
const ArrowRight = Arrow({ text: <NavigateNextIcon />, className: "arrow-next arrow" });

const Prayers = props => {
  const {
    classes,
    prayers: {
      allPrayers: prayers,
      answeredPrayers,
      unAnsweredPrayers,
      interceedingPrayers,
      isFetching,
      isUpdating,
      isAdding,
      prayersTabValue
    },
    dispatch,
    userId
  } = props;

  const handleChange = newValue => {
    dispatch(setPrayersTabValue(parseInt(newValue, 10)));
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)"
  });

  useEffect(() => {
    if (!prayers.length) {
      dispatch(getPrayers(userId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabData = [
    {
      label: "All My Prayers",
      value: 0,
      textIfNoData: "No prayer request added yet",
      data: prayers
    },
    {
      label: "For others",
      value: 1,
      textIfNoData:
        "You are not interceeding for anyone yet. Ask your friends for prayers",
      data: interceedingPrayers
    },
    {
      label: "Answered",
      value: 2,
      textIfNoData: "No answered prayer yet, God is working.",
      data: answeredPrayers
    },
    {
      label: "Unanswered",
      value: 3,
      textIfNoData: "All your prayers are answered :) Ask God for more",
      data: unAnsweredPrayers
    }
  ];

  const currentTab = tabData[prayersTabValue];

  const Menu = selected =>
    tabData.map(tab => (
      <Chip
        key={tab.value}
        label={tab.label}
        color={selected === tab.value ? "primary" : "default"}
        variant={selected === tab.value ? "default" : "outlined"}
      />
    ));

  const hideArrow = !isMobile && tabData.length <= 4

  return (
    <main className={classes.content}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        {(isAdding || isUpdating || isFetching) && <LinearProgress />}
        <CssBaseline />
        <NewPrayerButton />
        {/* <div className={classes.filters}> */}
        <AppBar
          position="sticky"
          color="inherit"
          className={classes.tab}
        >
          <ScrollMenu
            data={Menu(prayersTabValue)}
            arrowLeft={!hideArrow && ArrowLeft}
            arrowRight={!hideArrow && ArrowRight}
            selected={prayersTabValue}
            onSelect={handleChange}
          />
        </AppBar>

        <div role="tabpanel">
          {currentTab.data && currentTab.data.length ? (
            currentTab.data.map((prayer, i) => (
              <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />
            ))
          ) : (
            <Empty type="prayer" text={currentTab.textIfNoData} />
          )}
        </div>
      </Container>
    </main>
  );
}

Prayers.propTypes = {
  classes: PropTypes.object.isRequired,
  prayers: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  prayers: state.prayers,
  userId: state.authentication.user.userId
});

export default connect(mapStateToProps)(withStyles(styles)(Prayers));