import React from 'react';
import PropTypes from 'prop-types';
import { Container, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Prayer from './Prayer';
import NewPrayerButton from './NewPrayerButton';
import PrayerModal from './PrayerModal';

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
  const { classes, prayers } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        <CssBaseline />
        <NewPrayerButton />
        {prayers.map(prayer => <Prayer key={prayer._id} prayer={prayer} />)}
        <PrayerModal />
      </Container>
    </main>
  )
}

Prayers.propTypes = {
  classes: PropTypes.object.isRequired,
  prayers: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  prayers: state.prayers.allPrayers
});

export default connect(mapStateToProps)(withStyles(styles)(Prayers));