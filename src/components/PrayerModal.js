import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

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
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrayerModal = props => {
  const {
    modalListener: {
      prayerModal
    },
    dispatch,
    classes
  } = props;
  const inputLabel = React.useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [collection, setCollection] = React.useState(['']);
  const [answeredPrayer, setAnsweredPrayer] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleClose = () => {
    dispatch(push('/prayers'))
  };

  const handleCollection = collection => e => {
    console.log('eveent', collection, e)
    const newCollection = e.target.checked ? [...collection, collection] : collection.filter(c => c !== collection);
    setCollection(newCollection)
  }

  const handleAnsweredPrayer = e => {
    setAnsweredPrayer(e.target.checked);
  }

  const handleDateChange = date => {
    setSelectedDate(date);
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
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography id="prayer-request-modal" color="inherit" variant="h6" className={classes.title}>
              New Prayer Request
            </Typography>
            <Button
              color="inherit"
              onClick={handleClose}
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
            placeholder="Start typing..."
            variant="outlined"
            className={classes.margin}
            rows={6}
            rowsMax={6}
            multiline
            fullWidth
          />

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
                {["Spiritual", "Financial", "Relationship", "Academics"].map(collection =>
                  <FormControlLabel
                    control={
                      <Checkbox checked={collection.includes(collection)} onChange={handleCollection(collection)} value={collection} />
                    }
                    label={collection}
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
            placeholder="Any extra details?"
            variant="outlined"
            className={classes.margin}
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
              // value={state.age}
              // onChange={handleChange('age')}
              labelWidth={60}
              inputProps={{
                name: 'repeat',
                id: 'repeat-prayer',
              }}
            >
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
                value={selectedDate}
                onChange={handleDateChange}
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
                value={selectedDate}
                onChange={handleDateChange}
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
  modalListener: state.modalListener
});

export default connect(mapStateToProps)(withStyles(styles)(PrayerModal));