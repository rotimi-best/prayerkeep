import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 6
  },
  header: {
    fontWeight: 'bold'
  }
});

export default withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <IconButton aria-label="close" className={classes.backButton} onClick={onClose}>
        <KeyboardBackspaceIcon />
      </IconButton>
      <Typography className={classes.header} variant="subtitle1">{children}</Typography>
    </MuiDialogTitle>
  );
});