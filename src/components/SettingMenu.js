import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';

import { setIsSubscribedToPushNotification } from '../actions/authAction';

const options = [
  {
    key: 1,
    value: 'Get notification',
    onClick: (dispatch) => {
      dispatch(setIsSubscribedToPushNotification(false));
    }
  }
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (onClick) => () => {
    onClick(dispatch);
    handleClose();
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="setting"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="setting"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.key} onClick={handleMenuSelect(option.onClick)}>
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
