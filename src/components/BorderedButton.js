import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 20
  }
}));

const BorderedButton = props => {
  const { onClick, label } = props;
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant="outlined"
      color="primary"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

BorderedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default BorderedButton;
