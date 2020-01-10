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
  }
});

const Prayer = props => {
  const { classes, prayer, dispatch } = props;
  const { description, collection, _id } = prayer

  const openPrayer = () => {
    dispatch(push(`/prayers?prayerModal=open&prayerId=${_id}`))
  }

  const handleClick = (e) => {
    console.log('clicked chip', e)
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
        {collection.map(list =>
          <Chip key={list.key} onClick={handleClick} label={list.title} classes={{ root: classes.chipRoot }} />
        )}
      </CardActions>
    </Card>
  )
}

Prayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Prayer));