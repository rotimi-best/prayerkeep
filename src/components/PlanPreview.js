import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import ReactMarkdown  from 'react-markdown';
import gfm  from 'remark-gfm';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import BackButton from './BackButton';

import ROUTES from '../constants/routes';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0
  },
  root: {
    margin: '10px 0',
    [theme.breakpoints.down('xs')]: {
      padding: '0 10px'
    }
  },
  startPlanBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '20px 0'
  },
  startPlanBtn: {
    textTransform: 'none',
    borderRadius: 8,
    width: '80%',
  },

}));

const markdown = `
**Theme**: HIGHER GROUNDS - Psalm 61:2
**Description**
*“God is our refuge and strength, a very present help in trouble”* Psalm 46:1

*“Let us therefore come boldly unto the throne of grace that we may obtain mercy, and find grace to help in time of need”* Hebrews 4:16

Nothing happens except in the place of prayer. Jesus Christ said we should call upon Him and He will answer us (Jeremiah 33:3). Every request put before Him has always been met with divine performance and I believe that the convention of this year will not be an exception in Jesus name. He promised to always honor His word.

This is the confidence we have that as we gather to pray, He will grant us the grace to enjoy a higher level of glory. This is our year of Divine All-Round Sufficiency and God is not slack in His promises. He said that as we say it in His hears, so He will do. God is our refuge and strength and therefore we have the boldness to come to Him in prayer in order to obtain the grace that will promote us to **HIGHER GROUNDS**.

I therefore enjoin all and sundry to faithfully take part in this prayer event so that there will be the outpouring of divine help for the success of the Convention.

My sincere prayer is that before, during and after the programme, we will all be moved to higher grounds in Jesus name!

-----
This plan is brought to you by [THE FOURSQUARE GOSPEL CHURCH IN NIGERIA](https://foursquare.org.ng/ "THE FOURSQUARE GOSPEL CHURCH IN NIGERIA")
`

const Prayers = props => {
  const {
    pathname,
    dispatch,
    userId
  } = props;
  const classes = useStyles();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)"
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  return (
    <main className={classes.root}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        <CssBaseline />
        <BackButton defaultGoTo={ROUTES.PLANS} />
        <Typography variant="h5">
          21 DAYS PRAYER & FASTING | Foursquare Annual Convention | 2020
        </Typography>
        <Grid className={classes.startPlanBtnContainer}>
          <Button variant="contained" color="primary" className={classes.startPlanBtn}>
            Start Plan
          </Button>
        </Grid>
        <Grid className={classes.planDescription}>
          <ReactMarkdown plugins={[gfm]} children={markdown} />
        </Grid>
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
  userId: state.authentication.user.userId,
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(Prayers);