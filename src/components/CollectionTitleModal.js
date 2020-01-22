import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { addCollection, updateCollection } from '../actions/collectionsAction';

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
  editRoot: {
    minWidth: 56
  }
});

const CollectionTitleModal = props => {
  const {
    dispatch,
    classes,
    userId,
    collections,
    isNew,
    collectionId,
    title: defaultTitle,
    edittableByUser
  } = props;
  const [title, setTitle] = useState(defaultTitle);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = e => {
    setOpenModal(!openModal);
  }

  const handleSave = () => {
    if (isNew) {
      dispatch(
        addCollection({
          userId: userId,
          title,
          prayers: []
        }, collections.allCollection)
      )
    } else {
      dispatch(updateCollection(collectionId, { title }, collections.allCollection))
    }
    setTitle('');
    toggleModal();
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleClose = () => {
    toggleModal()
  };

  // TODO: Continue here. Edit throws an error on the backend
  return (
    <>
      {edittableByUser &&
        <Fab
          color="primary"
          aria-label="new-collection"
          onClick={toggleModal}
          classes={{ root: classes.editRoot }}
        >
          {isNew ? <AddIcon /> : <EditIcon />}
        </Fab>}
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
            autoFocus
            id="create-new-collection"
            placeholder="Collection name"
            type="text"
            value={title}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" style={{ textTransform: 'none' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

CollectionTitleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isNew: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  edittableByUser: PropTypes.bool
};

CollectionTitleModal.defaultProps = {
  edittableByUser: true
}

const mapStateToProps = state => ({
  userId: state.authentication.user.userId,
  collections: state.collections,
});

export default connect(mapStateToProps)(withStyles(styles)(CollectionTitleModal));