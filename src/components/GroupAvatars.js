import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function GroupAvatars({ users }) {
  const max = 2
  const firstThree = [...users].splice(0, max);
  const others = [...users].splice(max)
  return (
    <AvatarGroup>
      {firstThree.map(user => (
        <Avatar
          key={user._id}
          alt={user?.googleAuthUser?.name}
          src={user?.googleAuthUser?.picture}
        />
      ))}
      {others.length > 0 && <Avatar alt="more people">
        +{others.length}
      </Avatar>}
    </AvatarGroup>
  );
}