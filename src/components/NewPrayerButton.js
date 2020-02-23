import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)',
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    transitionDuration: '.218s',
  },
  cardContent: {
    padding: '13px 16px'
  }
})

const NewPrayerButton = props => {
  const { classes, dispatch, pathname, collectionId } = props;

  const openNewPrayer = () => {
    let modalTriggerPath = `${pathname}/?prayerModal=open&prayerId=null`;

    if (collectionId) {
      modalTriggerPath += `&collectionId=${collectionId}`;
    }

    dispatch(push(modalTriggerPath));
  }

  return (
    <Card className={classes.root} onClick={openNewPrayer}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            Add a Prayer request...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

NewPrayerButton.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  collectionId: PropTypes.string
}

NewPrayerButton.defaultProps = {
  collectionId: null
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(withStyles(styles)(NewPrayerButton));