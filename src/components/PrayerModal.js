import React, {
  useState,
  useRef,
  forwardRef,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import CollectionTitleModal from './CollectionTitleModal';
import { getCollections } from '../actions/collectionsAction';
import { addPrayer, updatePrayer, getPrayers } from '../actions/prayersAction';

const styles = theme => ({
  root: {
    flexWrap: 'wrap',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  margin: {
    margin: `${theme.spacing(1)}px 0`,
  },
  newCollection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  expansionRoot: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chipRoot: {
    margin: 2
  },
  choosenCollection: {
    display: 'flex',
    marginBottom: 5
  }
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getPrayer = (prayerId, prayers) => {
  if (prayerId) {
    return prayers.filter(p => p._id === prayerId)[0] || null;
  }

  return null
}

const todaysDate = defDate => {
  const fullDate = defDate ? new Date(defDate) : new Date();

  return new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate())
};

const PrayerModal = props => {
  const {
    modalListener: { prayerModal },
    userId,
    dispatch,
    classes,
    allCollection,
    prayers,
    backUrl
  } = props;
  const inputLabel = useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const collectionToPickFrom = allCollection.filter(c => c.edittableByUser);
  const prayerToOpen = getPrayer(prayerModal.prayerId, prayers.allPrayers);

  const [prayerRequest, setPrayerRequest] = useState('');
  const [collections, setCollection] = useState([]);
  const [answeredPrayer, setAnsweredPrayer] = useState(false);
  const [note, setNote] = useState('');
  const [repeat, setRepeat] = useState('never');
  const [startDate, setStartDate] = useState(todaysDate());
  const [endDate, setEndDate] = useState(todaysDate());
  const [errors, setErrors] = useState({
    prayerRequest: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // componentDidMount - Get collections
  useEffect(() => {
    if (!allCollection && allCollection.length) {
      dispatch(getCollections(userId))
    }
  }, [allCollection]);

  useEffect(() => {
    if (prayerModal.prayerId && !prayerToOpen) {
      dispatch(getPrayers(userId))
    }

  }, [prayerModal.prayerId, prayerToOpen]);

  // componentDidUpdate - Set fields
  useEffect(() => {
    if (prayerModal.open && prayerToOpen) {
      setPrayerRequest(prayerToOpen.description);
      setAnsweredPrayer(prayerToOpen.answered);
      const edittableByUserCol = prayerToOpen.collections
        .filter(c => c.edittableByUser)
        .map(c => c.title)
      setCollection(edittableByUserCol);
      setNote(prayerToOpen.note);
      setRepeat(prayerToOpen.repeat);
      setStartDate(todaysDate(prayerToOpen.start))
      setEndDate(todaysDate(prayerToOpen.end));
    }
  }, [prayerModal.open, prayerToOpen]);

  // componentDidUpdate - Close modal
  useEffect(() => {
    const { error, isAdding, isUpdating } = prayers;
    if (formSubmitted) {
      if (!error && !isAdding && !isUpdating) {
        handleClose()
      }
    }
  }, [prayers.isAdding, prayers.error, prayers.isUpdating, formSubmitted]);

  const handleClose = () => {
    dispatch(push(backUrl));
    setPrayerRequest('');
    setAnsweredPrayer(false);
    setCollection([]);
    setNote('');
    setRepeat('never');
    setStartDate(todaysDate());
    setEndDate(todaysDate());
    setFormSubmitted(false);
    setErrors({
      prayerRequest: false
    });
  };

  const handleCollection = e => {
    const newCollection = e.target.checked
      ? [...collections, e.target.value]
      : collections.filter(c => c !== e.target.value);

    setCollection(newCollection);
  };

  const handleAnsweredPrayer = e => {
    setAnsweredPrayer(e.target.checked);
  };

  const handleStartDate = date => {
    setStartDate(date);
  };

  const handleEndDate = date => {
    setEndDate(date);
  };

  const handlePrayerRequest = e => {
    setPrayerRequest(e.target.value);
  };

  const handleRepeat = e => {
    setRepeat(e.target.value);
  };

  const handleNote = e => {
    setNote(e.target.value);
  };

  const handleSave = e => {
    if (!prayerRequest.length) {
      return setErrors({
        ...errors,
        prayerRequest: true
      });
    }

    const newPrayerRequest = {
      description: prayerRequest,
      repeat,
      note,
      answered: answeredPrayer,
      collections,
      start: new Date(startDate).getTime(),
      end: new Date(endDate).getTime(),
      userId,
    };

    // Send to server
    setFormSubmitted(true);
    if (prayerToOpen) {
      dispatch(updatePrayer(prayerToOpen._id, newPrayerRequest, props.prayers.allPrayers))
    } else dispatch(addPrayer(newPrayerRequest, props.prayers.allPrayers))
  }

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
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography id="prayer-request-modal" color="inherit" variant="h6" className={classes.title}>
              New Prayer Request
            </Typography>
            <Button
              color="inherit"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
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
          />

          <div className={classes.newCollection}>
            <Typography variant="subtitle1">Add to a collection</Typography>
            <CollectionTitleModal title="" isNew/>
          </div>
          {collections.length
            ? <div className={classes.choosenCollection}>
                {collections.map(list =>
                  <Chip key={list} label={list} classes={{ root: classes.chipRoot }} />
                )}
              </div>
            : null}

          {/* Choose Collection */}
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="choose-collection-content"
              id="choose-collection"
            >
              <Typography className={classes.heading}>Choose Collection</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                {collectionToPickFrom.map(({ _id, title }) =>
                  <FormControlLabel
                    control={
                      <Checkbox checked={collections.includes(title)} onChange={handleCollection} value={title} />
                    }
                    label={title}
                    key={_id}
                  />
                )}
              </FormGroup>
            </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          {/* Answered Prayer */}
          <FormControlLabel
            control={
              <Checkbox checked={answeredPrayer} onChange={handleAnsweredPrayer} value="answered" />
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
            rows={6}
            rowsMax={6}
            multiline
            fullWidth
          />

          {/* REPEAT */}
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
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
          </FormControl>

          {/* Start and End Date */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
  );
}

PrayerModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.router.location.search,
  userId: state.authentication.user.userId,
  modalListener: state.modalListener,
  prayers: state.prayers,
  allCollection: state.collections.allCollection
});

export default connect(mapStateToProps)(withStyles(styles)(PrayerModal));