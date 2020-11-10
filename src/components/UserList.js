import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    margin: 10,
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    '& .MuiAvatar-root': {
      marginRight: 20
    }
  },
}));

const UserList = props => {
  const { users } = props;
  const classes = useStyles();

  return users.map((user, id) => (
    <Card key={`user-${id}`} className={classes.card}>
      <Avatar
        aria-label="prayer owner avatar"
        src={user.googleAuthUser.picture}
      />
      <Typography variant="body2">
        {user.googleAuthUser.name}
      </Typography>
    </Card>
  ))
}

UserList.propTypes = {
  prayer: PropTypes.object.isRequired,
  isPrayerClickable: PropTypes.bool
};

UserList.defaultProps = {
  isPrayerClickable: true
}

export default UserList;
