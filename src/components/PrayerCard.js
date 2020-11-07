import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkContainedIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import Dot from './Dot';

import BiblePasssageCard from './BiblePasssageCard';
import AnsweredBadge from './AnsweredBadge';
// import PrayerIcon from './Icons/Prayer';
import { getDateCreated } from '../helpers';
import { openAlert } from '../actions/alertAction';
import alerts from '../constants/alert';
import { updatePrayer } from '../actions/prayersAction';
import { openSnackBar } from '../actions/snackBarAction';

const useStyles = makeStyles(() => ({
  cardActionRoot: {
    flexWrap: 'wrap',
  },
  card: {
    margin: 10,
    boxShadow: 'none',
    border: '1px solid #dadce0',
    borderRadius: 8
  },
  cardHeaderRoot: {
    padding: '6px 16px 0px 16px'
  },
  chipRoot: {
    margin: 2,
    backgroundColor: `rgba(0,0,0,0.08)`,
    fontFamily: `'Google Sans',Roboto,Arial,sans-serif`,
    fontWeight: 500,
    height: 20,
    fontSize: 11,
    borderRadius: 5,
  },
  chipLabel: {
    // color: '#3c4043',
    fontSize: 11,
    padding: '3px 5px'
  },
  description: {
    color: '#202124',
    letterSpacing: '.01428571em',
    lineHeight: '1.5rem',
    fontSize: 16,
    marginBottom: 5
  },
  classContentRoot: {
    padding: '8px 16px 0px'
  },
  cardActionButtonsRoot: {
    justifyContent: 'space-around',
    padding: '0 8px 8px',
    '& .MuiSvgIcon-root': {
      width: 18,
      height: 18
    },
  },
  iconWithCount: {
    display: 'flex',
    alignItems: 'center'
  },
  count: {
    fontSize: 13,
    marginLeft: 10,
    paddingTop: 5
  },
  prayerStat: {
    padding: '0 8px 8px',
  }
}));

const PrayerCard = props => {
  const { prayer, userId, isPrayerClickable, showCollectionTags } = props;
  const {
    description,
    collections,
    isOwner,
    owner,
    _id,
    createdAt,
    comments,
    intercessors,
    interceeding,
    formattedPassages = [],
    answered
  } = prayer;
  const dispatch = useDispatch();
  const { isLoggedIn, pathname } = useSelector(state => ({
    isLoggedIn: state.authentication.isLoggedIn,
    pathname: state.router.location.pathname
  }))
  const classes = useStyles();
  const [isInterceding, setIsInterceding] = React.useState(interceeding);

  const dateCreated = getDateCreated(createdAt);

  const openPrayer = () => {
    if (!isLoggedIn) {
      return dispatch(push(`/welcome?goTo=${pathname}`));
    }
    dispatch(push(`/prayer/${_id}`))
  }

  const handleComment = () => {
    if (window.location.pathname !== `/prayer/${_id}`) {
      return openPrayer();
    }
    return;
  }

  const handleEdit = () => {
    dispatch(push(`?prayerModal=open&prayerId=${_id}`));
  }

  const handleCollectionClick = collectionId => () => {
    dispatch(push(`/collection/${collectionId}`));
  }

  const handleIsInterceding = () => {
    if (!isLoggedIn) {
      return dispatch(push(`/welcome?goTo=${pathname}`));
    }
    if (isOwner) {
      dispatch(openSnackBar('You cant add your request to your Intercession'))
      return;
    }

    setIsInterceding(isInterceding => {
      const newisInterceding = !isInterceding
      dispatch(
        updatePrayer(userId, _id, { interceeding: newisInterceding })
      );

      if (newisInterceding) {
        dispatch(openSnackBar('Added to your Intercessions'))
      } else {
        dispatch(openSnackBar('Removed from your Intercessions'))
      }
      return newisInterceding
    });
  }

  const handleIPrayed = () => {
    dispatch(openSnackBar('You said Amen'))
  }

  const handleShare = () => {
    const linkToPrayer = `https://${window.location.host}/prayer/${_id}`;
    navigator.clipboard.writeText(linkToPrayer);
    dispatch(openAlert('Link copied to clipboard', alerts.INFO))
  };

  const Count = ({ count }) => (
    <Typography className={classes.count} color="textSecondary" component="span">
      {count}
    </Typography>
  );

  const CustomCardContent = () => {
    const content = (
      <CardContent classes={{ root: classes.classContentRoot }}>
        <Typography className={classes.description} variant="body2" color="textPrimary" component="p">
          {description}
        </Typography>
        {formattedPassages.map((passage, i) => <BiblePasssageCard key={`passage-${i}`} passage={passage} />)}
      </CardContent>
    );

    if (isPrayerClickable) {
      return (
        <CardActionArea onClick={openPrayer}>
          {content}
        </CardActionArea>
      )
    }

    return content;
  }

  const totalComments = Array.isArray(comments) ? comments.length : comments;
  const totalIntercessors = Array.isArray(intercessors) ? intercessors.length : intercessors;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="prayer owner avatar"
            className={classes.avatar}
            src={owner.googleAuthUser.picture}
          />
        }
        action={!isPrayerClickable && isOwner && (
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
        title={owner.googleAuthUser.name}
        subheader={(
          <span>
            Started praying {dateCreated} {answered && <AnsweredBadge />}
          </span>
        )}
        classes={{
          root: classes.cardHeaderRoot
        }}
      />
      <CustomCardContent />
      {showCollectionTags && isOwner && Array.isArray(collections) && <CardActions
        disableSpacing
        classes={{
          root: classes.cardActionRoot
        }}
      >
        {collections.map(list =>
          <Chip
            key={list._id}
            onClick={handleCollectionClick(list._id)}
            label={list.title}
            classes={{
              root: classes.chipRoot,
              label: classes.chipLabel
            }}
          />
        )}
      </CardActions>}
      {showCollectionTags ? (
        <CardActions
          classes={{ root: classes.cardActionButtonsRoot }}
          disableSpacing
        >
          {/* <div className={classes.iconWithCount}>
            <IconButton aria-label="add to your intercessions" onClick={handleIPrayed}>
              <PrayerIcon fill={isInterceding && "#17bf63"} />
            </IconButton>
            <Count count={totalIntercessors} />
          </div> */}
          <div className={classes.iconWithCount}>
            <IconButton aria-label="add to your intercessions" onClick={handleIsInterceding}>
              {isInterceding ? <BookmarkContainedIcon color="primary" /> : <BookmarkOutlinedIcon />}
            </IconButton>
            <Count count={totalIntercessors} />
          </div>
          <div className={classes.iconWithCount}>
            <IconButton aria-label="comment" onClick={handleComment}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Count count={totalComments} />
          </div>
          <IconButton aria-describedby="share-prayer" aria-label="share link" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </CardActions>
        ) : (
        <div className={classes.prayerStat}>
          <Typography className={classes.count} color="textSecondary" component="span">
            {totalIntercessors} interceeding <Dot /> {totalComments} comment{totalComments > 1 ? 's' : ''}
          </Typography>
        </div>
      )}
    </Card>
  )
}

PrayerCard.propTypes = {
  prayer: PropTypes.object.isRequired,
  isPrayerClickable: PropTypes.bool,
  showCollectionTags: PropTypes.bool,
};

PrayerCard.defaultProps = {
  isPrayerClickable: true,
  showCollectionTags: true
}

export default PrayerCard;
