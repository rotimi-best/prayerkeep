import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from 'react-responsive';
import { Container, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import colors from "../constants/colors";

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
  }
});

const Home = props => {
  const { classes } = props;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  return (
    <main className={classes.content}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        <Paper variant="outlined" className={classes.userStatsRoot}>
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
              <Typography variant="h3">210</Typography>
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
              <Typography variant="h3">0</Typography>
            </div>
          </div>
        </Paper>
      </Container>
    </main>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
