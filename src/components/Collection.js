import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Prayer from './Prayer';

import { getCollections } from '../actions/collectionsAction';
import { getDateCreated } from '../helpers';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
      collectionInView,
      isFetching
    }
  } = props;
  const collection = collectionInView && collectionInView._id === id
    ? collectionInView
    : allCollection.filter(c => c._id === id)[0];

  useEffect(() => {
    if (!collection) {
      dispatch(getCollections(userId))
    };
  }, [collection]);

  if (!collection || isFetching) {
    return null;
  }

  const { title, creator, prayers, createdAt } = collection;
  const dateCreated = getDateCreated(createdAt || creator.createdAt);

  return (
    <main className={classes.root}>
      <div className={classes.toolbar} />
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary" component="p">
              Created by {creator.userId === userId ? 'You' : creator.name} on {dateCreated}
            </Typography>
          </Grid>
          <div className={classes.toolbar} />
          <Grid item xs={12}>
            {prayers.map(prayer => <Prayer key={prayer._id} prayer={prayer} />)}
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

const mapStateToProps = state => ({
  collections: state.collections,
  userId: state.authentication.user.userId,
});

export default connect(mapStateToProps)(withStyles(styles)(Collection))
