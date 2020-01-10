import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

const PrayerList = props => {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container maxWidth="sm">
        <Typography component="h2">
          Collection
        </Typography>
      </Container>
    </main>
  )
}

PrayerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(withStyles(styles)(PrayerList));