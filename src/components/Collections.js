import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import CollectionBox from './CollectionBox';
import CollectionTitleModal from './CollectionTitleModal';

import { getCollections } from '../actions/collectionsAction';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    padding: `10px 0`,
  },
  collectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  collections: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
    gridGap: '1rem'
  },
  collectionBoxRoot: {
    display: 'flex',
    '&:hover': {
      cursor: 'pointer'
    },
    '& > *': {
      margin: theme.spacing(2),
    },
    width: '100%',
  },
  tab: {
    margin: '10px 0',
    boxShadow: 'none'
  }
});

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    value: index
  };
}

const Collections = props => {
  const {
    classes,
    userId,
    collections,
    dispatch,
  } = props;
  const {
    allCollection,
    sharedWithMe,
    isFetching,
    isUpdating,
    isAdding,
  } = collections;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });
  const [tabValue, setTabValue] = React.useState(0);
  const currentCollections = tabValue === 0 ? allCollection : sharedWithMe;

  useEffect(() => {
    // if (!allCollection.length) {
      dispatch(getCollections(userId))
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <main className={classes.root}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <Container maxWidth="sm">
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.collectionHeader}
          >
            <Typography variant="h4">
              Collections
            </Typography>
            <CollectionTitleModal isNew/>
          </Grid>
          {(isFetching || isUpdating || isAdding)
              && <LinearProgress />}
          <AppBar position="sticky" color="inherit" className={classes.tab}>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="collections-tabs"
              variant="fullWidth"
            >
              <Tab label="My Collections" {...a11yProps(0)} />
              <Tab label="Shared with me" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <Grid item xs={12} className={classes.collections}>
            {currentCollections.map(({ _id, title,color, prayers }) => (
              <CollectionBox
                key={_id}
                id={_id}
                title={title}
                color={color}
                prayers={prayers}
                collectionBoxRoot={classes.collectionBoxRoot}
              />
              ))}
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

Collections.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  collections: state.collections,
  userId: state.authentication.user.userId
});

export default connect(mapStateToProps)(withStyles(styles)(Collections));