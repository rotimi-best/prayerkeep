import React from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

export default function SimpleSnackbar() {
  const { open, message } = useSelector(state => ({
    open: state.snackBar.open,
    message: state.snackBar.message,
  }))

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      message={message}
      // autoHideDuration={6000}
    />
  );
}
