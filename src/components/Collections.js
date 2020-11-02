import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css'
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
    marginBottom: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    }
  },
  collections: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  collection: {
    width: '45% !important',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important'
    }
  },
  collectionBoxRoot: {
    width: '100%',
    verticalAlign: 'top',
    display: 'flex',
    marginBottom: 10,
    '&:hover': {
      cursor: 'pointer'
    },
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  tab: {
    margin: '10px 0',
    boxShadow: 'none',
    border: '1px solid #dadce0',
    borderRadius: 8
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
    suggestedCollections,
    isFetching,
    isUpdating,
    isAdding,
  } = collections;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });
  const [tabValue, setTabValue] = React.useState(0);

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
      <Container maxWidth="md">
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
              centered
            >
              <Tab label="My Collections" {...a11yProps(0)} />
              <Tab label="Explore" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          {/* <Grid item xs={12} className={classes.collections}> */}
          {tabValue === 0 && <Masonry
            breakpointCols={{
              'default': 2,
              500: 1
            }}
            className={classes.collections}
            columnClassName={classes.collection}
          >
            {allCollection.map((collection) => (
              <CollectionBox
                key={collection._id}
                collection={collection}
                collectionBoxRoot={classes.collectionBoxRoot}
              />
              ))}
          </Masonry>}
          {tabValue === 1 && <Masonry
            breakpointCols={{
              'default': 2,
              500: 1
            }}
            className={classes.collections}
            columnClassName={classes.collection}
          >
            {suggestedCollections.map((collection) => (
              <CollectionBox
                key={collection._id}
                collection={collection}
                collectionBoxRoot={classes.collectionBoxRoot}
              />
              ))}
          </Masonry>}
          {/* </Grid> */}
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