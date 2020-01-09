import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

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
  const { classes, prayer } = props;
  const { description, prayerList } = prayer
  const handleClick = (e) => {
    console.log('clicked chip', e)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
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
        {prayerList.map(list =>
          <Chip key={list.key} onClick={handleClick} label={list.title} classes={{ root: classes.chipRoot }} />
        )}
      </CardActions>
    </Card>
  )
}

Prayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapStateToProps = state => ({
//   state: state
// });

// export default connect(mapStateToProps)(withStyles(styles)(Prayer));
export default withStyles(styles)(Prayer);