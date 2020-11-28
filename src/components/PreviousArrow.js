import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core'
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff !important',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.26)'
  }
}));

export default function PreviousArrow(props) {
  const { handleClick, overideClassName } = props;
  const classes = useStyles();

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="arrow"
      onClick={handleClick}
      className={classes.root + ` ${overideClassName}`}
    >
      <NavigateBeforeIcon />
    </IconButton>
  )
}

PreviousArrow.propTypes = {
  handleClick: PropTypes.func,
  overideClassName: PropTypes.string
}

PreviousArrow.defaultProps = {
  overideClassName: ''
}
