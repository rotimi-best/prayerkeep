import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { CirclePicker  } from 'react-color';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { addCollection, updateCollection } from '../actions/collectionsAction';
import colorConstants from '../constants/colors';

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
  },
  colorPallete: {
    marginBottom: 20
  },
  preview: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 'fit-content'
  },
  collectionName: {
    marginBottom: 20
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
    title: defaultTitle = '',
    color: defaultColor = '',
    edittableByUser
  } = props;
  const [title, setTitle] = useState(defaultTitle);
  const [color, setColor] = useState(defaultColor);
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
          color,
          prayers: []
        }, collections.allCollection)
      )
    } else {
      dispatch(updateCollection(collectionId, { title, color }, collections.allCollection))
    }
    setTitle('');
    setColor('');
    toggleModal();
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleClose = () => {
    toggleModal()
  };
  const handleColorChange = (color) => {
    setColor(color.hex)
  };

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
        <DialogContent dividers>
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.preview}
          >
            <Typography variant="caption" style={{ fontWeight: 'bold' }}>
              Preview
            </Typography>
            <Chip
              label={title && title.length ? title : 'Collection preview'}
              style={{
                backgroundColor: color || `rgba(0,0,0,0.08)`,
                color: color
                  ? colorConstants.colorsBg[color]
                    ? '#000'
                    : '#fff'
                  : '#000'
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.collectionName}>
            <Typography variant="caption" style={{ fontWeight: 'bold' }}>
              Collection name
            </Typography>
            <TextField
              fullWidth
              autoFocus
              id="create-new-collection"
              placeholder="New collection name"
              type="text"
              value={title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.colorPallete}>
            <Typography variant="caption" style={{ fontWeight: 'bold' }}>
              Color
            </Typography>
            <CirclePicker color={color} onChange={handleColorChange} />
          </Grid>
        </Grid>
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
  title: PropTypes.string,
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