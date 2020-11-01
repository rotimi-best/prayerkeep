import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

// import Prayer from './Prayer';
import CollectionTitleModal from './CollectionTitleModal';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Empty from './Empty';
import NewPrayerButton from './NewPrayerButton';
import UserList from './UserList';
import PrayerCard from './PrayerCard';
import GroupAvatars from './GroupAvatars';
import { openAlert } from '../actions/alertAction';
import alerts from '../constants/alert';

import { getCollection, updateCollection } from '../actions/collectionsAction';
import { getDateCreated } from '../helpers';
// import { areTheyDifferent } from '../helpers/difference';
import routes from '../constants/routes';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    '& .MuiContainer-root': {
      padding: 5
    }
  },
  collectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5px'
  },
  authorAndCreatedAt: {
    paddingLeft: 10
  },
  headerText: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingLeft: 5
  },
  groupAvatars: {
    paddingLeft: 15,
    display: 'flex',
  },
  shareButton: {
    height: 'fit-content',
    marginLeft: 5
  },
  tab: {
    marginTop: 10,
    boxShadow: 'none'
  }
});

function userAlreadyJoined(people, userId) {
  return people.some(person => person.userId === userId)
}
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    value: index
  };
}

const Collection = props => {
  const {
    match: { params: { id } },
    classes,
    dispatch,
    userId,
    collections: {
      allCollection,
      collectionInView,
      isFetching,
      isUpdating,
      isAdding,
    },
  } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  useEffect(() => {
    dispatch(getCollection(id, userId));
  }, [dispatch, userId, id]);

  const handleBack = () => {
    dispatch(push(routes.COLLECTIONS));
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!collectionInView || isFetching || isAdding) {
    return (
      <main className={classes.root}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">
          <LinearProgress />
        </Container>
      </main>
    );
  }

  const { title, color, owner, prayers, createdAt, _id, edittableByUser, people } = collectionInView;
  const dateCreated = getDateCreated(createdAt || owner.createdAt);
  const alreadyJoined = userAlreadyJoined(people, userId);

  const handleShareOrJoin = () => {
    if (isUpdating) return
    if (alreadyJoined) {
      navigator.clipboard.writeText(window.location.href);
      dispatch(openAlert('Link copied.', alerts.INFO))
    } else {
      dispatch(updateCollection(_id, { join: true, userId }, allCollection))
    }
  }

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
            <Typography variant="h5" className={classes.headerText}>
              <IconButton aria-label="back" onClick={handleBack}>
                <KeyboardBackspaceIcon />
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
          <Grid item xs={12} className={classes.authorAndCreatedAt}>
            <Typography variant="caption" color="textSecondary" component="p">
              {owner.googleAuthUser.name} | {dateCreated}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.groupAvatars}>
            <GroupAvatars
              users={people}
            />
            <Button
              variant="outlined"
              color="primary"
              className={classes.shareButton}
              endIcon={alreadyJoined ? <LinkIcon /> : <AddIcon />}
              onClick={handleShareOrJoin}
            >
              {isUpdating ? <CircularProgress size={20} /> : (alreadyJoined ? 'Share' : 'Join')}
            </Button>
          </Grid>
          {/* <div className={classes.toolbar} /> */}

          <Grid item xs={12}>
            <NewPrayerButton collectionId={_id} />
          </Grid>

          <AppBar position="sticky" color="inherit" className={classes.tab}>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="collection-tabs"
              variant="fullWidth"
            >
              <Tab label="Prayers" {...a11yProps(0)} />
              <Tab label="People" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          {tabValue === 0 && <Grid item xs={12}>
            {prayers.length
              ? prayers.map(prayer => <PrayerCard userId={userId} key={prayer._id} prayer={prayer} />)
              : <Empty type="prayer" text="No prayer request with this collection yet"/>}
          </Grid>}
          {tabValue === 1 && <Grid item xs={12}>
            <UserList
              users={people}
            />
          </Grid>}
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
