import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const BackButton = ({ defaultGoTo }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBack = () => {
    if (window.history.length > 2) {
      history.goBack();
    } else {
      dispatch(push(defaultGoTo));
    }
  }

  return (
    <IconButton aria-label="back" onClick={handleBack}>
      <KeyboardBackspaceIcon />
    </IconButton>
  );
}

export default BackButton;