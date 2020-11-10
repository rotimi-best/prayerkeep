import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: 10,
    boxShadow: 'none',
    border: '1px solid #dadce0',
    borderRadius: 8
  },
}));

export default props => {
  const classes = useStyles();
  return (
    <Card className={classes.root + ` ${props.className}`}>
      {props.children}
    </Card>
  )
}
