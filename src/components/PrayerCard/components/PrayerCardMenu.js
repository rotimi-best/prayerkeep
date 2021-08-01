import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { archivePrayer } from '../../../actions/prayersAction';

const options = [
  {
    id: 1,
    label: 'Edit',
  },
  {
    id: 2,
    label: 'Archive',
  },
];

const ITEM_HEIGHT = 48;

function PrayerCardMenu(props) {
  const { prayer, userId } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    dispatch(push(`?prayerModal=open&prayerId=${prayer._id}`));
  };

  const handleArchive = () => {
    dispatch(
      archivePrayer(userId, prayer._id, { isArchived: !prayer.isArchived })
    );

    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (optionId) => () => {
    switch (optionId) {
      case 1:
        return handleEdit();
      case 2:
        return handleArchive();
      default:
        return handleClose();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
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
          <MenuItem key={option.id} onClick={handleMenuSelect(option.id)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default PrayerCardMenu;
