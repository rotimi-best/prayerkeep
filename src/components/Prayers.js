import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import PrayerCard from './PrayerCard';
import NewPrayerButton from './NewPrayerButton';
import Empty from './Empty';

import { getPrayers } from '../actions/prayersAction';

const styles = theme => ({
  containerRoot: {
    padding: 0,
    borderLeft: '1px solid rgb(230, 236, 240)',
    borderRight: '1px solid rgb(230, 236, 240)',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
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
      interceedingPrayers,
      isFetching,
      isUpdating,
      isAdding,
    },
    dispatch,
    userId
  } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
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
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="inherit"
            onChange={handleChange}
            aria-label="prayers in sections"
            variant="fullWidth"
          >
            <Tab label="My prayers" />
            <Tab label="Intercessions" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {prayers && prayers.length
            ? prayers.map((prayer, i) => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
            : <Empty type="prayer" text="No prayer request added yet"/>}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {interceedingPrayers && interceedingPrayers.length
            ? interceedingPrayers.map((prayer, i) => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
            : <Empty type="prayer" text="No prayer request added yet"/>}
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