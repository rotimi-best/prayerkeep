import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DialogTitle } from '@material-ui/core';
import { addCollection } from '../actions/collectionsAction';

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
});

const NewCollectionModal = props => {
  const {
    dispatch,
    classes,
    openModal,
    toggleAddNewCollection,
    user,
    collections
  } = props;
  const [newColName, setNewColName] = useState('');

  const handleSave = () => {
    dispatch(
      addCollection({
        userId: user.userId,
        title: newColName,
        prayers: []
      }, collections.allCollection)
    )
    setNewColName();
    toggleAddNewCollection();
  }

  const handleChange = (e) => {
    setNewColName(e.target.value)
  }

  const handleClose = () => {
    toggleAddNewCollection()
    // dispatch(push('/collections'))
  };

  return (
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="prayer-request-modal"
        classes={{
          paper: classes.dialogPaper
        }}
      >
        <DialogTitle
          disableTypography
          id="confirmation-dialog-title"
          className={classes.dialogTitle}
        >
          <Typography variant="subtitle1">New collection</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="create-new-collection"
            placeholder="Collection name"
            type="text"
            value={newColName}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" style={{ textTransform: 'none' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}

NewCollectionModal.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleAddNewCollection: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.authentication.user,
  collections: state.collections,
});

export default connect(mapStateToProps)(withStyles(styles)(NewCollectionModal));