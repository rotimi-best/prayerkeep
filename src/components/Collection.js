import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Prayer from './Prayer';
import CollectionTitleModal from './CollectionTitleModal';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Empty from './Empty';
import NewPrayerButton from './NewPrayerButton';
import PrayerCard from './PrayerCard';

import { getCollection } from '../actions/collectionsAction';
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
  },
  prayerContainer: {
    borderLeft: '1px solid rgb(230, 236, 240)',
    borderRight: '1px solid rgb(230, 236, 240)',
    borderTop: '1px solid rgb(230, 236, 240)',
  }
});

const Collection = props => {
  const {
    match: { params: { id } },
    classes,
    dispatch,
    userId,
    collections: {
      collectionInView,
      isFetching,
      isUpdating,
      isAdding,
    },
  } = props;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  useEffect(() => {
    dispatch(getCollection(id, userId));
  }, [dispatch, userId, id]);

  const handleBack = () => {
    dispatch(push(routes.COLLECTIONS));
  }

  if (!collectionInView || isFetching || isUpdating || isAdding) {
    return (
      <main className={classes.root}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">
          <LinearProgress />
        </Container>
      </main>
    );
  }

  const { title, color, owner, prayers, createdAt, _id, edittableByUser } = collectionInView;
  const dateCreated = getDateCreated(createdAt || owner.createdAt);

  return (
    <main className={classes.root}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.collectionHeader}
          >
            <Typography variant="h5">
              <IconButton aria-label="back" onClick={handleBack}>
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
              Created by {owner.userId === userId ? 'You' : owner.googleAuthUser.name} on {dateCreated}
            </Typography>
          </Grid>
          <div className={classes.toolbar} />

          <Grid item xs={12}>
            <NewPrayerButton collectionId={_id} />
          </Grid>

          <Grid item xs={12} className={classes.prayerContainer}>
            {prayers.length
              ? prayers.map(prayer => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
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
