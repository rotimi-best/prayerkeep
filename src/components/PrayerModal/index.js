import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { DialogActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import CollectionTitleModal from '../CollectionTitleModal';
import BibleVersePicker from '../BibleVersePicker';
import DeleteModal from '../DeleteModal';

import { date, getNextXDaysDate } from '../../helpers';
import colorConstants from '../../constants/colors';
import {
  addPrayer,
  updatePrayer,
  getPrayers,
} from '../../actions/prayersAction';
import { getCollections, getCollection } from '../../actions/collectionsAction';
import styles from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const SELECTED_BG = 'rgba(0, 0, 0, 0.08)';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const filterArrayById = (id, arrayToFilter) => {
  if (id) {
    return arrayToFilter.filter((a) => a._id === id)[0] || null;
  }

  return null;
};

const todaysDate = (defDate) => {
  const fullDate = defDate ? new Date(defDate) : new Date();

  return new Date(
    fullDate.getFullYear(),
    fullDate.getMonth(),
    fullDate.getDate()
  );
};

const getStyle = (checked) => ({
  fontWeight: checked ? 'bold' : 'inherit',
  backgroundColor: checked ? SELECTED_BG : 'inherit',
});

const getChipStyle = (list) => ({
  backgroundColor: list.color || SELECTED_BG,
  fontWeight: 600,
  color: list.color
    ? colorConstants.colorsBg[list.color]
      ? '#000'
      : '#fff'
    : '#000',
});

const PrayerModal = (props) => {
  const {
    modalListener: { prayerModal },
    userId,
    dispatch,
    classes,
    allCollection,
    prayers,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const collectionToPickFrom = allCollection.filter((c) => c.edittableByUser);
  const prayerToOpen = filterArrayById(
    prayerModal.prayerId,
    prayers.allPrayers
  );
  const history = useHistory();

  const [prayerRequest, setPrayerRequest] = useState('');
  const [collections, setCollection] = useState([]);
  const [answeredPrayer, setAnsweredPrayer] = useState(false);
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(getNextXDaysDate(30));
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState({
    prayerRequest: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openBiblePicker, setOpenBiblePicker] = useState(false);
  const [passages, setPassages] = useState([]);
  const [passage, setPassage] = useState('');
  const isEditMode = !!prayerToOpen;

  const handleClose = useCallback(() => {
    history.goBack();
    setPrayerRequest('');
    setPassages([]);
    setAnsweredPrayer(false);
    setCollection([]);
    setStartDate(todaysDate());
    setEndDate(getNextXDaysDate(365));
    setFormSubmitted(false);
    setIsPublic(false);
    setErrors({
      prayerRequest: false,
    });
  }, [history]);

  // componentDidMount - Get collections
  useEffect(() => {
    if (!allCollection && allCollection.length) {
      dispatch(getCollections(userId));
    }
  }, [allCollection, dispatch, userId]);

  useEffect(() => {
    if (
      prayerModal.prayerId &&
      prayerModal.prayerId !== 'null' &&
      !prayerToOpen
    ) {
      dispatch(getPrayers(userId));
    }
  }, [prayerModal.prayerId, prayerToOpen, dispatch, userId]);

  // componentDidUpdate - Set fields
  useEffect(() => {
    if (prayerModal.open && prayerToOpen) {
      setPrayerRequest(prayerToOpen.description);
      setPassages(prayerToOpen.passages || []);
      setAnsweredPrayer(prayerToOpen.answered);
      const edittableByUserCol = prayerToOpen.collections.filter(
        (c) => c.edittableByUser
      );
      setCollection(edittableByUserCol);
      setIsPublic(prayerToOpen?.public || false);
    }
    if (prayerModal.open && prayerModal.collectionId) {
      const collectionFromUrl = filterArrayById(
        prayerModal.collectionId,
        allCollection
      );

      if (collectionFromUrl) {
        if (collectionFromUrl.edittableByUser) {
          setCollection([...collections, collectionFromUrl]);
        } else if (collectionFromUrl.status) {
          setAnsweredPrayer(true);
        }
      }
    }
    // eslint-disable-next-line
  }, [prayerModal.open, prayerToOpen]);

  // componentDidUpdate - Close modal
  useEffect(() => {
    const { error, isAdding, isUpdating } = prayers;
    if (formSubmitted) {
      if (!error && !isAdding && !isUpdating) {
        handleClose();
      }
    }
  }, [prayers, formSubmitted, handleClose]);

  const handleBiblePickerVisibility = () => {
    setOpenBiblePicker((openBiblePicker) => !openBiblePicker);
  };

  const handleCollection = (e) => {
    const values = e.target.value;
    const collectionIds = collections.map((c) => c._id);
    const { newCollections } = values.reduce(
      (acc, collection) => {
        const collectionId = collection._id || collection;

        if (!acc.collectionIds.includes(collectionId)) {
          acc.newCollections.push(
            collectionToPickFrom.find((c) => c._id === collectionId)
          );
        } else if (collectionIds.includes(collectionId)) {
          acc.newCollections = acc.newCollections.filter(
            (c) => c._id !== collectionId
          );
          return acc;
        }

        acc.collectionIds.push(collectionId);
        return acc;
      },
      { collectionIds: [], newCollections: [] }
    );

    setCollection([...newCollections]);
  };

  const handleAnsweredPrayer = (e) => {
    setAnsweredPrayer(e.target.checked);
  };

  const handlePrayerRequest = (e) => {
    setPrayerRequest(e.target.value);
  };

  const handleSave = (e) => {
    if (!prayerRequest.length) {
      return setErrors({
        ...errors,
        prayerRequest: true,
      });
    }

    const newPrayerRequest = {
      description: prayerRequest,
      answered: answeredPrayer,
      passages,
      public: isPublic,
      collections,
      start: date({ toUTC: true, defDate: new Date(startDate) }),
      end: date({ toUTC: true, defDate: new Date(endDate) }),
      userId,
    };

    // Send to server
    setFormSubmitted(true);
    if (prayerToOpen) {
      dispatch(
        updatePrayer(
          userId,
          prayerToOpen._id,
          newPrayerRequest,
          props.prayers.allPrayers
        )
      );
    } else {
      const callback = () => {
        if (prayerModal.collectionId) {
          dispatch(getCollection(prayerModal.collectionId, userId));
        }
      };

      dispatch(addPrayer(newPrayerRequest, props.prayers.allPrayers, callback));
    }
  };

  const handleBibleVerses = (_passage) => {
    if (passage) {
      setPassages((passages) =>
        passages.map((p) => {
          if (p === passage) {
            return _passage;
          }

          return p;
        })
      );
      setPassage('');
    } else {
      setPassages([...passages, _passage]);
    }

    handleBiblePickerVisibility();
  };

  const handleVerseClicked = (value) => () => {
    handleBiblePickerVisibility();
    setPassage(value);
  };
  const handleIsPublic = (event) => {
    if (event.target.value === 'yes') {
      setIsPublic(true);
    } else setIsPublic(false);
  };

  const handlePassageRemove = (passage) => () => {
    setPassages((passages) => passages.filter((p) => p !== passage));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth={true}
      open={prayerModal.open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="prayer-request-modal"
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="prayer-request-modal"
            color="inherit"
            variant="h6"
            className={classes.title}
          >
            {isEditMode ? 'Edit' : 'New'} prayer request
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.dialogContent} dividers>
        {/* Prayer Request */}
        <TextField
          id="your-prayer-request"
          label="What's your desire?"
          placeholder="Let God hear it..."
          variant="outlined"
          className={classes.margin}
          value={prayerRequest}
          onChange={handlePrayerRequest}
          minRows={4}
          rowsMax={6}
          error={errors.prayerRequest}
          multiline
          fullWidth
          autoFocus
        />

        <div className={classes.section}>
          <div className={classes.headerWithButton}>
            <Typography variant="body1">Bible verses</Typography>
            <Fab
              color="default"
              aria-label="add-bible-verses"
              onClick={handleBiblePickerVisibility}
            >
              <AddIcon />
            </Fab>
            <BibleVersePicker
              value={passage}
              visible={openBiblePicker}
              handleVisibility={handleBiblePickerVisibility}
              onComplete={handleBibleVerses}
            />
          </div>
          <div className={classes.chips}>
            {passages.map((value) => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                onClick={handleVerseClicked(value)}
                onDelete={handlePassageRemove(value)}
              />
            ))}
          </div>
        </div>

        {/* Choose Collection */}
        <FormControl className={classes.section}>
          <InputLabel id="choose-collection">Collections</InputLabel>
          <Select
            labelId="choose-collection"
            id="choose-collection-select"
            multiple
            value={collections}
            onChange={handleCollection}
            input={<Input id="select-multiple-collections" />}
            renderValue={(selected) =>
              selected.length > 0 && (
                <div className={classes.choosenCollection}>
                  {selected.map((list) => (
                    <Chip
                      key={list._id}
                      label={list.title}
                      classes={{ root: classes.chipRoot }}
                      style={getChipStyle(list)}
                    />
                  ))}
                </div>
              )
            }
            MenuProps={MenuProps}
          >
            {collectionToPickFrom.map(({ _id, title }) => (
              <MenuItem
                key={_id}
                value={_id}
                style={getStyle(collections.find((c) => c._id === _id))}
              >
                {title}
              </MenuItem>
            ))}
          </Select>

          <div className={classes.newCollection}>
            <CollectionTitleModal
              isNew
              renderButton={(props) => (
                <Button variant="outlined" onClick={props.onClick}>
                  Create new collection
                </Button>
              )}
            />
          </div>
        </FormControl>

        {/* Public or private */}
        <FormControl component="fieldset">
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            Do you want to make this prayer request public?
          </Typography>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={isPublic ? 'yes' : 'no'}
            onChange={handleIsPublic}
          >
            <FormControlLabel
              value="yes"
              control={<Radio color="primary" />}
              label="Yes, sure"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="No, it's private"
            />
          </RadioGroup>
        </FormControl>

        {/* Answered Prayer */}
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={answeredPrayer}
              onChange={handleAnsweredPrayer}
              value="answered"
            />
          }
          label={`Mark as "Answered Prayer"`}
        />
      </DialogContent>

      {/* Delete and Save button */}
      <DialogActions>
        {isEditMode && (
          <DeleteModal prayerId={prayerModal.prayerId} label="Delete" />
        )}
        <Button
          variant="text"
          color="primary"
          onClick={handleSave}
          disabled={prayers.isUpdating || prayers.isAdding}
        >
          {prayers.isUpdating || prayers.isAdding ? (
            <CircularProgress size={20} />
          ) : (
            'Save'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PrayerModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.router.location,
  userId: state.authentication.user.userId,
  modalListener: state.modalListener,
  prayers: state.prayers,
  allCollection: state.collections.allCollection,
});

export default connect(mapStateToProps)(withStyles(styles)(PrayerModal));
