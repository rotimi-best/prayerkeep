import React, { useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormLabel from '@material-ui/core/FormLabel';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CollectionMenu from '../CollectionMenu';
import UnLovedIcon from '@material-ui/icons/FavoriteBorderRounded';
import LovedIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';

import PrayerInput from '../PrayerInput';

import { date } from "../../helpers";
import { getFeed, updateQuote } from '../../actions/feedAction';
import { updatePrayer } from '../../actions/prayersAction';
import useStyles from './styles';

const Home = props => {
  const {
    quoteId = '',
    dispatch,
    userId,
    feed,
    prayers,
    userPictureUrl
  } = props;
  const { prayersToday, quote } = feed;
  const classes = useStyles();
  const [isLoved, setIsLoved] = React.useState(quote.isLovedByMe);
  const [comment, setComment] = React.useState('');

  useEffect(() => {
    dispatch(getFeed(userId, quoteId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (quote.isLovedByMe !== isLoved)
      setIsLoved(quote.isLovedByMe);
      // eslint-disable-next-line
  }, [quote.isLovedByMe]);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1280px)'
  });

  const markPrayerAsPrayed = (prayerId) => {
    if (prayerId) {
      dispatch(updatePrayer(userId, prayerId, {
        lastDatePrayed: date({ toUTC: true })
      }, prayers.allPrayers, () => dispatch(getFeed(userId))));
    }
  }

  const handleLoveClick = () => {
    setIsLoved(isLoved => {
      const newIsLoved = !isLoved;
      dispatch(
        updateQuote(userId, quote._id, { loved: newIsLoved })
      );

      return newIsLoved;
    });
  }

  const handleComment = (e) => {
    setComment(e.target.value);
  }
  const handleSubmitComment = () => {
    setComment('');
    dispatch(
      updateQuote(userId, quote._id, { comment })
    );
  }

  return (
    <main className={classes.root}>
      {isDesktopOrLaptop && <div className={classes.toolbar} />}
      <CssBaseline />
      <Container
        maxWidth="sm"
        classes={{
          root: classes.containerRoot
        }}
      >
      {feed.isFetching ? <LinearProgress /> : null}
        <PrayerInput

        />
        <Paper
          variant="elevation"
          className={classes.userStatsRoot}
          elevation={2}
        >
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Prayer Quote
          </Typography>
          <Typography className={classes.bibleQuote} variant="body2" color="textPrimary">
            {quote.title}
          </Typography>

          <Divider light />
          <CardActions disableSpacing classes={{ root: classes.cardActionRoot }}>
            <IconButton aria-label="love quote" onClick={handleLoveClick}>
              {isLoved ? <LovedIcon color="primary" /> : <UnLovedIcon />}
            </IconButton> {quote.loves}
          </CardActions>
          <Divider light />
          <List className={classes.listRoot}>
            <ListItem>
              {comment.length === 0 ? (
                <ListItemAvatar>
                  <Avatar alt="user-profile-photo" src={userPictureUrl.data ? userPictureUrl.data.url : userPictureUrl} />
                </ListItemAvatar>
              ) : null}
              <TextField
                id="comment-on-quote"
                label="Share your thought"
                multiline
                rowsMax={4}
                value={comment}
                onChange={handleComment}
                variant="outlined"
              />
              {comment.length > 0 ? (
                <IconButton aria-label="Submit comment" onClick={handleSubmitComment}>
                  <SendIcon color="action" />
                </IconButton>
              ) : null}
            </ListItem>
          </List>
          {quote?.comments?.map(comment => (
            <React.Fragment key={comment._id}>
              <Divider light />
              <List className={classes.listRoot}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="user-profile-photo" src={comment.author.googleAuthUser.picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.author.googleAuthUser.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {comment.comment}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </React.Fragment>
          ))}

        </Paper>
        <CollectionMenu />
        <Paper
          variant="elevation"
          className={classes.prayersForToday}
          elevation={2}
        >
          <FormControl component="fieldset" className={classes.formControl} classes={{ root: classes.formControlRoot}}>
            <FormLabel component="legend" className={classes.formLabel}>Prayers for today</FormLabel>
            <FormHelperText className={classes.formHelperText}>{!prayersToday.length
              ? 'You don\'t have prayer requests for today'
              : 'Select to mark as prayed today'}
            </FormHelperText>
            <FormGroup>
            {prayers.isUpdating ||prayers.isFetching
                ? <LinearProgress />
                : prayersToday.map(p =>
                    <FormControlLabel
                      key={p._id}
                      control={<Checkbox
                        checked={false}
                        onChange={() => markPrayerAsPrayed(p._id)}
                        inputProps={{ 'aria-label': p.description }}
                        value={p._id} />}
                      label={p.description}
                    />
                  )}
            </FormGroup>
          </FormControl>
        </Paper>
      </Container>
    </main>
  );
};

const mapStateToProps = state => ({
  userId: state.authentication.user.userId,
  feed: state.feed,
  quoteId: state.router.location.query.quoteId,
  prayers: state.prayers,
  userPictureUrl: state.authentication.user
    && state.authentication.user.picture,
});

export default connect(mapStateToProps)(Home);
