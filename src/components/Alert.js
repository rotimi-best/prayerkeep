import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { closeAlert } from '../actions/alertAction';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertComponent = ({ alert, dispatch }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlert())
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key={`top center`}
      autoHideDuration={6000}
      open={alert.open}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alert.type}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

AlertComponent.propTypes = {
  alert: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(AlertComponent);
