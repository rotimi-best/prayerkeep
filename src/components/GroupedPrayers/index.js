import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PrayerCard from '../PrayerCard';

const styles = theme => ({
  root: {
    padding: 0,
    borderRadius: 5,
    margin: '16px 10px',
    border: '1px solid #dadce0',
    background: '#f0f1f2'
  },
  header: {
    padding: '5px 0',
    borderBottom: '1px solid #dadce0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 10px',
    '& .MuiTypography-root': {
      fontWeight: 500
    }
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiButton-outlined': {
      borderRadius: 20
    }
  }
});

const GroupedPrayers = props => {
  const {
    classes,
    collectionId,
    title,
    prayers,
    dispatch,
    userId,
    hideAction,
    styles = {}
  } = props;
  const [expand, setExpand] = React.useState(true)

  const handleOpen = () => {
    dispatch(push(`/collection/${collectionId}`));
  };

  const handleExpand = () => {
    setExpand(expand => !expand)
  }

  if (!collectionId && typeof(hideAction) !== "boolean") {
    return prayers.map((prayer, i) => (
      <PrayerCard userId={userId} key={prayer._id} prayer={prayer} showCollectionTags={false}/>
    ))
  }

  return (
    <div className={classes.root} style={styles}>
      <div className={classes.header}>
        <Typography variant="body1">
          {title}
        </Typography>
        {!hideAction && <div className={classes.action}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpen}
          >
            Open
          </Button>
          <IconButton onClick={handleExpand}>
            {expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </div>}
      </div>
      {expand && prayers.map((prayer, i) => (
        <PrayerCard userId={userId} key={prayer._id} prayer={prayer} showCollectionTags={false}/>
      ))}
    </div>
  );
}

GroupedPrayers.propTypes = {
  classes: PropTypes.object.isRequired,
  prayers: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userId: state.authentication.user.userId,
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(withStyles(styles)(GroupedPrayers));