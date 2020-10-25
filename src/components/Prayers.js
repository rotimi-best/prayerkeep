import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import PrayerCard from './PrayerCard';
import NewPrayerButton from './NewPrayerButton';
import Empty from './Empty';

import { getPrayers } from '../actions/prayersAction';

const styles = theme => ({
  containerRoot: {
    padding: 0,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  filters: {
    display: 'flex',
    margin: '10px 5px',
    '& .MuiChip-root': {
      marginRight: 15,
      fontSize: 16,
      fontWeight: 'bold'
    }
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Prayers = props => {
  const {
    classes,
    prayers: {
      allPrayers: prayers,
      answeredPrayers,
      unAnsweredPrayers,
      interceedingPrayers,
      isFetching,
      isUpdating,
      isAdding,
    },
    dispatch,
    userId
  } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = newValue => () => {
    setValue(newValue);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  useEffect(() => {
    if (!prayers.length) {
      dispatch(getPrayers(userId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={classes.content}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
        {(isAdding || isUpdating || isFetching) && <LinearProgress />}
        <CssBaseline />
        <NewPrayerButton />
        <div className={classes.filters}>
          <Chip label="All My Prayers" color={value === 0 ? 'primary' : 'default'} onClick={handleChange(0)}/>
          <Chip label="Intercessions" color={value === 1 ? 'primary' : 'default'} onClick={handleChange(1)}/>
          <Chip label="Answered" color={value === 2 ? 'primary' : 'default'} onClick={handleChange(2)}/>
          <Chip label="Unanswered" color={value === 3 ? 'primary' : 'default'} onClick={handleChange(3)}/>
        </div>
        <TabPanel value={value} index={0}>
          {prayers && prayers.length
            ? prayers.map((prayer, i) => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
            : <Empty type="prayer" text="No prayer request added yet"/>}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {interceedingPrayers && interceedingPrayers.length
            ? interceedingPrayers.map((prayer, i) => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
            : <Empty type="prayer" text="You are not interceeding for anyone yet. Ask your friends for prayers"/>}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {answeredPrayers && answeredPrayers.length
            ? answeredPrayers.map((prayer, i) => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
            : <Empty type="prayer" text="No answered prayer yet, God is working."/>}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {unAnsweredPrayers && unAnsweredPrayers.length
            ? unAnsweredPrayers.map((prayer, i) => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
            : <Empty type="prayer" text="All your prayers are answered :) Ask God for more"/>}
        </TabPanel>
      </Container>
    </main>
  )
}

Prayers.propTypes = {
  classes: PropTypes.object.isRequired,
  prayers: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  prayers: state.prayers,
  userId: state.authentication.user.userId
});

export default connect(mapStateToProps)(withStyles(styles)(Prayers));