import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function GroupAvatars({ users }) {
  return (
    <AvatarGroup max={2}>
      {users.map(user => (
        <Avatar
          key={user._id}
          alt={user?.googleAuthUser?.name}
          src={user?.googleAuthUser?.picture}
        />
      ))}
    </AvatarGroup>
  );
}