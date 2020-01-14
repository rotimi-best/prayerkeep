import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getCollections } from '../actions/collectionsAction';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

const Collections = props => {
  const {
    classes,
    userId,
    collections,
    dispatch
  } = props;
  console.log("Collection: userId", userId)
  console.log("Collection: collection", collections)

  useEffect(() => {
    console.log("Collection: useEffect")
    dispatch(getCollections(userId))
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container maxWidth="sm">
        <Typography component="h2">
          Collections
        </Typography>
      </Container>
    </main>
  )
}

Collections.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  collections: state.collections,
  userId: state.authentication.user.userId
});

export default connect(mapStateToProps)(withStyles(styles)(Collections));