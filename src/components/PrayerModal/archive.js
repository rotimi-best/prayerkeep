import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { DialogActions } from '@material-ui/core';

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
import { getCollections } from '../../actions/collectionsAction';
import styles from './style';

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

const PrayerModal = (props) => {
  const {
    modalListener: { prayerModal },
    userId,
    dispatch,
    classes,
    allCollection,
    prayers,
  } = props;
  const repeatLabel = useRef(null);
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
  const [note, setNote] = useState('');
  const [repeat, setRepeat] = useState('never');
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(getNextXDaysDate(30));
  const [errors, setErrors] = useState({
    prayerRequest: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isEditMode = !!prayerToOpen;

  const handleClose = useCallback(() => {
    history.goBack();
    setPrayerRequest('');
    setAnsweredPrayer(false);
    setCollection([]);
    setNote('');
    setRepeat('never');
    setStartDate(todaysDate());
    setEndDate(getNextXDaysDate(30));
    setFormSubmitted(false);
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
    if (prayerModal.prayerId && !prayerToOpen) {
      dispatch(getPrayers(userId));
    }
  }, [prayerModal.prayerId, prayerToOpen, dispatch, userId]);

  // componentDidUpdate - Set fields
  useEffect(() => {
    if (prayerModal.open && prayerToOpen) {
      setPrayerRequest(prayerToOpen.description);
      setAnsweredPrayer(prayerToOpen.answered);
      const edittableByUserCol = prayerToOpen.collections.filter(
        (c) => c.edittableByUser
      );
      // .map(c => c.title)
      setCollection(edittableByUserCol);
      setNote(prayerToOpen.note);
      setRepeat(prayerToOpen.repeat);
      setStartDate(todaysDate(prayerToOpen.start));
      setEndDate(todaysDate(prayerToOpen.end));
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

  const handleCollection = (e) => {
    const [col] = collectionToPickFrom.filter((c) => c._id === e.target.value);
    if (col) {
      const newCollection = e.target.checked
        ? [...collections, col]
        : collections.filter((c) => c._id !== e.target.value);

      setCollection(newCollection);
    }
  };

  const handleAnsweredPrayer = (e) => {
    setAnsweredPrayer(e.target.checked);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handlePrayerRequest = (e) => {
    setPrayerRequest(e.target.value);
  };

  const handleRepeat = (e) => {
    setRepeat(e.target.value);
  };

  const handleNote = (e) => {
    setNote(e.target.value);
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
      repeat,
      note,
      answered: answeredPrayer,
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
    } else dispatch(addPrayer(newPrayerRequest, props.prayers.allPrayers));
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
          {/* <Button
              color="inherit"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button> */}
        </Toolbar>
      </AppBar>
      <DialogContent dividers>
        {/* Prayer Request */}
        <TextField
          id="your-prayer-request"
          label="Your Prayer Request"
          placeholder="Start typing your request..."
          variant="outlined"
          className={classes.margin}
          value={prayerRequest}
          onChange={handlePrayerRequest}
          rowsMax={6}
          error={errors.prayerRequest}
          multiline
          fullWidth
          autoFocus
        />

        <div className={classes.newCollection}>
          <Typography variant="subtitle1">Add to a collection</Typography>
          <CollectionTitleModal title="" isNew />
        </div>
        {collections.length ? (
          <div className={classes.choosenCollection}>
            {collections.map((list) => (
              <Chip
                key={list._id}
                label={list.title}
                classes={{
                  root: classes.chipRoot,
                }}
                style={{
                  backgroundColor: list.color || `rgba(0,0,0,0.08)`,
                  fontWeight: 600,
                  color: list.color
                    ? colorConstants.colorsBg[list.color]
                      ? '#000'
                      : '#fff'
                    : '#000',
                }}
              />
            ))}
          </div>
        ) : null}

        {/* Choose Collection */}
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="choose-collection-content"
            id="choose-collection"
          >
            <Typography className={classes.heading}>
              Choose Collection
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                {collectionToPickFrom.map(({ _id, title }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          collections.find((c) => c._id === _id) ? true : false
                        }
                        onChange={handleCollection}
                        value={_id}
                      />
                    }
                    label={title}
                    key={_id}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* Answered Prayer */}
        <FormControlLabel
          control={
            <Checkbox
              checked={answeredPrayer}
              onChange={handleAnsweredPrayer}
              value="answered"
            />
          }
          label={`Mark as "Answered Prayer"`}
        />

        {/* NOTE */}
        <TextField
          id="your-prayer-request-note"
          label="Add a note"
          placeholder="Any testimony, word from God or scenerio related to this prayer?"
          variant="outlined"
          className={classes.margin}
          value={note}
          onChange={handleNote}
          minRows={6}
          rowsMax={6}
          multiline
          fullWidth
        />

        {/* REPEAT */}
        {/* <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={repeatLabel} htmlFor="outlined-age-native-simple">
              Repeat
            </InputLabel>
            <Select
              native
              value={repeat}
              onChange={handleRepeat}
              labelWidth={60}
              inputProps={{
                name: 'repeat',
                id: 'repeat-prayer',
              }}
            >
              <option value="never">Never</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Select>
          </FormControl> */}

        {/* Start and End Date */}
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="start-date-picker-dialog"
                label="Start"
                format="MM/dd/yyyy"
                value={startDate}
                onChange={handleStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'Change start date',
                }}
                style={{
                  width: '45%'
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="end-date-picker-dialog"
                label="End"
                format="MM/dd/yyyy"
                value={endDate}
                onChange={handleEndDate}
                KeyboardButtonProps={{
                  'aria-label': 'Change end date',
                }}
                style={{
                  width: '45%'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider> */}
      </DialogContent>

      {/* Delete and Save button */}
      <DialogActions>
        {isEditMode && (
          <DeleteModal prayerId={prayerModal.prayerId} label="Delete" />
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Save
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
