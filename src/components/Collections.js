import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import CollectionBox from './CollectionBox';
import CollectionTitleModal from './CollectionTitleModal';

import { getCollections } from '../actions/collectionsAction';

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
});

const Collections = props => {
  const {
    classes,
    userId,
    collections,
    dispatch,
  } = props;
  const {
    allCollection,
    isFetching,
    isUpdating,
    isAdding,
  } = collections;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  useEffect(() => {
    // if (!allCollection.length) {
      dispatch(getCollections(userId))
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Grid item xs={12} className={classes.collections}>
            {(isFetching || isUpdating || isAdding)
              ? <LinearProgress />
              : allCollection.map(({ _id, title,color, prayers }) => (
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