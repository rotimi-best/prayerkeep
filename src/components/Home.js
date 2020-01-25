import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from 'react-responsive';
import { Container, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import colors from "../constants/colors";
import { date } from "../helpers";
import { getFeed } from '../actions/feedAction';
import { updatePrayer } from '../actions/prayersAction';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: `${theme.spacing(3)}px 0`
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
    padding: "10px 5px"
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
  }
});

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
    console.log("date({ toUTC: true })", date({ toUTC: true }))
    if (prayerId) {
      dispatch(updatePrayer(prayerId, {
        lastDatePrayed: date({ toUTC: true })
      }, prayers, () => dispatch(getFeed(userId))));
    }
  }

  return (
    <main className={classes.content}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        <Paper variant="elevation" className={classes.userStatsRoot}>
          <Typography
            variant="h6"
            align="center"
            className={classes.bibleQuote}
          >
            And he spake a parable unto them to this end, that men ought always
            to pray, and not to faint
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
        <Paper variant="elevation" className={classes.prayersForToday}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.formLabel}>Prayers for today</FormLabel>
            <FormHelperText className={classes.formHelperText}>{!prayersToday.length
              ? 'You don\'t have prayer requests for today'
              : 'Select to mark as prayed today'}
            </FormHelperText>
            <FormGroup>
            {prayersToday.map(p =>
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
  prayers: state.prayers.allPrayers,
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
