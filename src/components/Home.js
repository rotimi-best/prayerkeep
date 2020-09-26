import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from 'react-responsive';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CollectionMenu from './CollectionMenu';

import colors from "../constants/colors";
import { date } from "../helpers";
import { getFeed } from '../actions/feedAction';
import { updatePrayer } from '../actions/prayersAction';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: 20
  },
  containerRoot: {
    paddingLeft: 5,
    paddingRight: 5
  },
  userStatsRoot: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  userStatsBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  daysPrayed: {
    textAlign: "center"
  },
  daysPrayedStats: {
    display: "flex",
    alignItems: "baseline"
  },
  userStat: {
    margin: "20px 0",
    padding: "0 20px",
    textAlign: "center"
  },
  userStatsCaption: {
    // fontFamily: `"Lato script=all rev=1"`,
    fontStyle: "bold",
    color: colors.grey,
    fontSize: 13
  },
  divider: {
    borderRight: `1px solid #dadada`
  },
  bibleQuote: {
    color: "black",
    fontFamily: `"Lato script=all rev=1"`,
    fontWeight: 300,
    fontStyle: "italic"
  },
  bibleVerse: {
    color: colors.grey
  },
  prayersForToday: {
    margin: '10px 0',
    padding: 20
  },
  formLabel: {
    paddingTop: '10px',
    fontSize: 18,
    fontStyle: 'normal',
  },
  formHelperText: {
    paddingBottom: 15
  },
  formControlRoot: {
    width: '100%'
  }
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const Home = props => {
  const { classes, dispatch, userId, feed, prayers } = props;
  const { prayersToday, prayersPrayedToday, streak } = feed;

  useEffect(() => {
    dispatch(getFeed(userId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  const markPrayerAsPrayed = (prayerId) => {
    if (prayerId) {
      dispatch(updatePrayer(prayerId, {
        lastDatePrayed: date({ toUTC: true })
      }, prayers.allPrayers, () => dispatch(getFeed(userId))));
    }
  }

  const requestPermission = async () => {
    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_PUSH_KEY)
    });
    console.log('Sending subscription');

    await fetch('https://parchmentnotebook-api.glitch.me/subscription', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(subscription)
    });
  }

  return (
    <main className={classes.content}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <CssBaseline />
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
      {feed.isFetching
        ? <LinearProgress />
        : null}
        <Paper
          variant="elevation"
          className={classes.userStatsRoot}
          elevation={2}
        >
          <Typography
            variant="h6"
            align="center"
            className={classes.bibleQuote}
          >
            And he spake a parable unto them to this end, that men ought always
            to pray, and not to faint <button onClick={requestPermission}>Trigger sw</button>
          </Typography>
          <Typography variant="caption" className={classes.bibleVerse}>
            Luke 18:1 KJV
          </Typography>
          <div className={classes.userStatsBody}>
            <div className={`${classes.userStat} ${classes.divider}`}>
              <Typography
                variant="caption"
                className={classes.userStatsCaption}
              >
                Current Prayer Streak
              </Typography>
              {/* <span className={classes.daysPrayedStats}> */}
              <Typography variant="h3">{streak}</Typography>
              {/* <Typography variant="caption">
                    days
                  </Typography> */}
              {/* </span> */}
            </div>
            <div className={classes.userStat}>
              <Typography
                variant="caption"
                className={classes.userStatsCaption}
              >
                Prayed Today
              </Typography>
              <Typography variant="h3">{prayersPrayedToday}</Typography>
            </div>
          </div>
        </Paper>
        <CollectionMenu />
        <Paper
          variant="elevation"
          className={classes.prayersForToday}
          elevation={2}
        >
          <FormControl component="fieldset" className={classes.formControl} classes={{ root: classes.formControlRoot}}>
            <FormLabel component="legend" className={classes.formLabel}>Prayers for today</FormLabel>
            <FormHelperText className={classes.formHelperText}>{!prayersToday.length
              ? 'You don\'t have prayer requests for today'
              : 'Select to mark as prayed today'}
            </FormHelperText>
            <FormGroup>
            {prayers.isUpdating ||prayers.isFetching
                ? <LinearProgress />
                : prayersToday.map(p =>
                    <FormControlLabel
                      key={p._id}
                      control={<Checkbox
                        checked={false}
                        onChange={() => markPrayerAsPrayed(p._id)}
                        inputProps={{ 'aria-label': p.description }}
                        value={p._id} />}
                      label={p.description}
                    />
                  )}
            </FormGroup>
          </FormControl>
        </Paper>
      </Container>
    </main>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userId: state.authentication.user.userId,
  feed: state.feed,
  prayers: state.prayers,
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
