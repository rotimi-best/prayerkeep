import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const styles = () => ({
  fabButton: {
    position: 'fixed',
    zIndex: 1,
    right: 30,
    bottom: 70,
    margin: '0 auto',
  },
})

const NewPrayerButton = props => {
  const { classes, dispatch, pathname, collectionId } = props;

  const openNewPrayer = () => {
    let modalTriggerPath = `${pathname}?prayerModal=open&prayerId=null`;

    if (collectionId) {
      modalTriggerPath += `&collectionId=${collectionId}`;
    }

    dispatch(push(modalTriggerPath));
  }

  return (
    <Fab
      color="primary"
      aria-label="new-collection"
      className={classes.fabButton}
      onClick={openNewPrayer}
    >
      <AddIcon />
    </Fab>
  )
}

NewPrayerButton.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  collectionId: PropTypes.string
}

NewPrayerButton.defaultProps = {
  collectionId: null
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(withStyles(styles)(NewPrayerButton));