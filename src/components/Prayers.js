import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Prayer from './Prayer';
import NewPrayerButton from './NewPrayerButton';
import Empty from './Empty';

import { getPrayers } from '../actions/prayersAction';

const styles = theme => ({
  containerRoot: {
    paddingLeft: 20,
    paddingRight: 20
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
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  useEffect(() => {
    // if (!prayers) {
      dispatch(getPrayers(userId))
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {prayers.length
          ? prayers.map(prayer => <Prayer key={prayer._id} prayer={prayer} />)
          : <Empty type="prayer" text="No prayer request added yet"/>}
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