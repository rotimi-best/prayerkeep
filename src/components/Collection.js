import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Prayer from './Prayer';
import CollectionTitleModal from './CollectionTitleModal';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Empty from './Empty';

import { getCollections } from '../actions/collectionsAction';
import { getDateCreated } from '../helpers';
// import { areTheyDifferent } from '../helpers/difference';
import routes from '../constants/routes';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    padding: `${theme.spacing(3)}px 0`,
  },
  collectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  }
});

const Collection = props => {
  const {
    match: { params: { id } },
    classes,
    dispatch,
    userId,
    collections: {
      allCollection,
      isFetching,
      isUpdating,
      isAdding,
    },
    prayers: {
      allPrayers
    }
  } = props;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  const [collection, setCollection] = useState(null);

  useEffect(() => {
    // Update our collection changes on prayer state
    if (collection) {
      const collectionPrayers = allPrayers.filter(p => p.collections.find(c => c._id === collection._id));
      // const areDifferent = areTheyDifferent(collectionPrayers, collection.prayers);
      if (collectionPrayers.length !== collection.prayers.length) {
        setCollection({
          ...collection,
          prayers: collectionPrayers
        });
      }
    }
  }, [allPrayers, collection]);

  useEffect(() => {
    const currentCollection = allCollection.filter(c => c._id === id)[0];
    if (currentCollection) {
      setCollection(currentCollection);
    } else {
      dispatch(getCollections(userId));
    }
  }, [allCollection, dispatch, userId, id]);

  const handleBack = () => {
    dispatch(push(routes.COLLECTIONS));
  }

  if (!collection || isFetching || isUpdating || isAdding) {
    return (
      <main className={classes.root}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">
          <LinearProgress />
        </Container>
      </main>
    );
  }

  const { title, color, creator, prayers, createdAt, _id, edittableByUser } = collection;
  const dateCreated = getDateCreated(createdAt || creator.createdAt);

  return (
    <main className={classes.root}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.collectionHeader}
          >
            <Typography variant="h5">
              <IconButton aria-label="back" className={classes.closeButton} onClick={handleBack}>
                <KeyboardBackspaceIcon fontSize="large" />
              </IconButton>
              {title}
            </Typography>
            <CollectionTitleModal
              title={title}
              color={color}
              isNew={false}
              collectionId={_id}
              edittableByUser={edittableByUser}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary" component="p">
              Created by {creator.userId === userId ? 'You' : creator.name} on {dateCreated}
            </Typography>
          </Grid>
          <div className={classes.toolbar} />
          <Grid item xs={12}>
            {prayers.length
              ? prayers.map(prayer => <Prayer key={prayer._id} prayer={prayer} />)
              : <Empty type="prayer" text="No prayer request with this collection yet"/>}
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

const mapStateToProps = state => ({
  collections: state.collections,
  prayers: state.prayers,
  userId: state.authentication.user.userId,
});

export default connect(mapStateToProps)(withStyles(styles)(Collection))
