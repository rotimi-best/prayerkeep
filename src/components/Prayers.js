import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, CssBaseline } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Prayer from './Prayer';
import NewPrayerButton from './NewPrayerButton';

import { getPrayers } from '../actions/prayersAction';

const styles = theme => ({
  containerRoot: {
    paddingLeft: 5,
    paddingRight: 5
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
});

const Prayers = props => {
  const {
    classes,
    prayers: {
      allPrayers: prayers,
      isFetching,
      isUpdating,
      isAdding,
    },
    dispatch,
    userId
  } = props;

  useEffect(() => {
    if (!prayers.length) {
      dispatch(getPrayers(userId))
    }
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        {(isAdding || isUpdating || isFetching) && <LinearProgress />}
        <CssBaseline />
        <NewPrayerButton />
        {prayers.map(prayer => <Prayer key={prayer._id} prayer={prayer} />)}
      </Container>
    </main>
  )
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