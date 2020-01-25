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

const styles = theme => ({
  cardActionRoot: {
    flexWrap: 'wrap',
  },
  card: {
    marginBottom: 10
  },
  chipRoot: {
    margin: 2
  },
  chipLabel: {
    color: '#3c4043',
    fontSize: 11
  }
});

const Prayer = props => {
  const { classes, prayer, dispatch } = props;
  const { description, collections, _id } = prayer;

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
          <Typography variant="body2" color="textPrimary" component="p">
            {description}
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