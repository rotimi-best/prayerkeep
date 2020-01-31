import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import colorConstants from '../constants/colors';
import { getDateCreated } from '../helpers';

const styles = theme => ({
  cardActionRoot: {
    flexWrap: 'wrap',
  },
  card: {
    marginBottom: 10
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
    lineHeight: '1.25rem',
    fontFamily: 'Roboto,Arial,sans-serif',
    fontSize: 14,
  },
  date: {
    fontSize: 12
  }
});

const Prayer = props => {
  const { classes, prayer, dispatch } = props;
  const { description, collections, _id, createdAt } = prayer;

  const dateCreated = getDateCreated(createdAt);

  const openPrayer = () => {
    dispatch(push(`?prayerModal=open&prayerId=${_id}`))
  }

  const handleCollectionClick = collectionId => {
    dispatch(push(`/collection/${collectionId}`))
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={openPrayer}>
        <CardContent>
          <Typography className={classes.description} variant="body2" color="textPrimary" component="p">
            {description}
          </Typography>
          <Typography className={classes.date} color="textSecondary">
            Praying since {dateCreated}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        disableSpacing
        classes={{
          root: classes.cardActionRoot
        }}
      >
        {collections.map(list =>
          <Chip
            key={list._id}
            onClick={() => handleCollectionClick(list._id)}
            label={list.title}
            classes={{
              root: classes.chipRoot,
              label: classes.chipLabel
            }}
            style={{
                backgroundColor: list.color || `rgba(0,0,0,0.08)`,
                // fontWeight: 600,
                color: list.color
                  ? colorConstants.colorsBg[list.color]
                    ? '#000'
                    : '#fff'
                  : '#000'
              }}
          />
        )}
      </CardActions>
    </Card>
  )
}

Prayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Prayer));