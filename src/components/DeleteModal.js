import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { deletePrayer } from '../actions/prayersAction';

const styles = theme => ({
  dialogPaper: {
    width: 500,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 24px'
  },
  collectionName: {
    marginBottom: 20
  },
  deleteBtn: {
    color: theme.palette.getContrastText(theme.palette.primary.danger),
    backgroundColor: theme.palette.primary.danger,
    '&:hover': {
      backgroundColor: theme.palette.primary.danger,
    },
  }
});

const DeleteModal = props => {
  const {
    dispatch,
    classes,
    prayers,
    prayerId,
    label
  } = props;
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = e => {
    setOpenModal(!openModal);
  }

  const handleSave = () => {
    dispatch(deletePrayer(prayerId, prayers))
    toggleModal();
    dispatch(push('/prayers'))
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleModal}
        classes={{ root: classes.deleteBtn }}
        startIcon={<DeleteIcon />}
      >
        {label}
      </Button>
      <Dialog
        open={openModal}
        onClose={toggleModal}
        aria-labelledby="delete-modal"
        classes={{
          paper: classes.dialogPaper
        }}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this prayer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            No
          </Button>
          <Button onClick={handleSave} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

DeleteModal.defaultProps = {

}

const mapStateToProps = state => ({
  prayers: state.prayers.allPrayers,
});

export default connect(mapStateToProps)(withStyles(styles)(DeleteModal));