import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FolderIcon from '@material-ui/icons/Folder';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getCollections } from '../actions/collectionsAction';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  collections: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
    gridGap: '1rem'
  }
});

const CollectionBox = ({ title }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(2),
      },
      width: '100%',
  },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.root} variant="outlined">
      <FolderIcon />
      <span className>
        <Typography variant="body2" color="textPrimary" component="p">
          {title}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          {title}
        </Typography>
      </span>
    </Paper>
  )
}

const Collections = props => {
  const {
    classes,
    userId,
    collections,
    dispatch,
    rootClassName
  } = props;
  const { allCollection, isLoading } = collections;

  useEffect(() => {
    dispatch(getCollections(userId))
  }, []);

  console.log("rootClassName", rootClassName)

  return (
    <main className={classes.root}>
      <div className={classes.toolbar} />
      <Container maxWidth="md">
        <Typography variant="h4">
          Collections
        </Typography>
        <div className={classes.collections}>
          {isLoading
            ? "Loading.........."
            : allCollection.map(({ title }) => (
              <>
                <CollectionBox key={title} title={title} />
                <CollectionBox key={title} title={title} />
                <CollectionBox key={title} title={title} />
                <CollectionBox key={title} title={title} />
                <CollectionBox key={title} title={title} />
              </>
            ))}
        </div>
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