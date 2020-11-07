import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from "react-responsive";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { CirclePicker  } from 'react-color';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
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
import CircularProgress from '@material-ui/core/CircularProgress';

import { addCollection, updateCollection, deleteCollection } from '../actions/collectionsAction';
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
  chip: {
    fontWeight: 600,
    width: 'fit-content',
    maxWidth: '100%'
  },
  colorPallete: {
    marginBottom: 10
  },
  preview: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  collectionName: {
    marginBottom: 10
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
    public: defaultIsPublic = false,
    description: defaultDescription = '',
    edittableByUser,
    renderButton,
  } = props;
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [color, setColor] = useState(defaultColor);
  const [openModal, setOpenModal] = useState(false);
  const [isPublic, setIsPublic] = useState(defaultIsPublic);
  const [error, setError] = useState({
    title: false,
    description: false,
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)"
  });
  const { isUpdating, isAdding } = collections;

  const toggleModal = e => {
    setOpenModal(!openModal);
  }

  const handleSave = () => {
    if (!title?.length) return;

    if (isNew) {
      dispatch(
        addCollection({
          userId: userId,
          title,
          description,
          color,
          public: isPublic,
          prayers: []
        }, collections.allCollection)
      )
    } else {
      dispatch(updateCollection(
        collectionId,
        { title, description, color, public: isPublic, userId },
        collections.allCollection
      ))
    }
    toggleModal()
  }

  const handleDelete = () => {
    dispatch(deleteCollection(collectionId, collections.allCollection))
    toggleModal();
  }

  const handleTitleChange = (e) => {
    if (e.target.value.length > 100) {
      setError({
        ...error,
        title: true
      })
      return
    }

    if (error.title) {
      setError({
        ...error,
        title: false
      })
    }
    setTitle(e.target.value)
  }
  const handleDescription = (e) => {
    if (e.target.value.length > 500) {
      setError({
        ...error,
        description: true
      })
      return
    }

    if (error.description) {
      setError({
        ...error,
        description: false
      })
    }

    setDescription(e.target.value)
  }
  const handleIsPublic = (event) => {
    if (event.target.value === 'yes') {
      setIsPublic(true)
    } else setIsPublic(false)
  }

  const handleClose = () => {
    toggleModal()
  };
  const handleColorChange = (color) => {
    console.log('color.hex', color.hex)
    setColor(color.hex)
  };

  const renderCustomButton = () => {
    let icon = <EditIcon />;
    if (isNew) {
      icon = <AddIcon />
    }

    let content = null;
    if (!isMobile) {
      content = isNew ? 'Add New' : 'Edit'
    }

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        {content && (
          <Button
            variant="contained"
            color="primary"
            onClick={toggleModal}
          >
              {content}
            </Button>
        )}
        {isMobile && <Fab
          color="primary"
          aria-label="new-collection"
          onClick={toggleModal}
        >
          {icon}
        </Fab>}
      </div>
    )

  }

  return (
    <>
      {edittableByUser &&
        (typeof renderButton === 'function'
          ? renderButton({ onClick: toggleModal })
          : renderCustomButton())}
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="prayer-request-modal"
        fullScreen={isMobile}
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
              className={classes.chip}
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
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              Collection name
            </Typography>
            <TextField
              fullWidth
              autoFocus
              id="create-new-collection"
              placeholder="New collection name"
              type="text"
              value={title}
              helperText="Name cannot be more than 100 characters"
              error={error.title}
              onChange={handleTitleChange}
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.colorPallete}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              Description
            </Typography>
            <TextField
              id="collection-description"
              placeholder="What is this collection about?"
              variant="outlined"
              value={description}
              onChange={handleDescription}
              rows={2}
              rowsMax={2}
              helperText="Description cannot be more than 500 characters"
              error={error.description}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className={classes.colorPallete}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              Color
            </Typography>
            <CirclePicker color={color} onChange={handleColorChange} />
          </Grid>
          <FormControl component="fieldset">
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              Do you want to make this collection public?
            </Typography>
            <RadioGroup aria-label="quiz" name="quiz" value={isPublic ? 'yes' : 'no'} onChange={handleIsPublic}>
              <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes, sure" />
              <FormControlLabel value="no" control={<Radio color="primary" />} label="No, it's private" />
            </RadioGroup>
          </FormControl>
        </Grid>
        </DialogContent>
        <DialogActions>
          {isUpdating || isAdding ? (
            <CircularProgress size={20} />
          ) : (
          <React.Fragment>
            {!isNew && <Button onClick={handleDelete} color="default" style={{ textTransform: 'none' }}>
              Delete
            </Button>}
            <Button onClick={handleSave} color="primary" style={{ textTransform: 'none' }}>
              Save
            </Button>
          </React.Fragment>
          )}
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
  userId: state?.authentication?.user?.userId,
  collections: state.collections,
});

export default connect(mapStateToProps)(withStyles(styles)(CollectionTitleModal));