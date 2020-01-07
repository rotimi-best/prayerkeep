import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Paper,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  dailyStreak: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const Home = props => {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container maxWidth="sm">
        <Paper variant="outlined" elevation={10}>
          <div className={classes.dailyStreak}>
            <Typography variant="h5">
              "Do not be wierry in prayer for in due season"
            </Typography>
            <Typography variant="subtitle">
            Galatians 6:9
            </Typography>
          </div>
        </Paper>
      </Container>
    </main>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(withStyles(styles)(Home));