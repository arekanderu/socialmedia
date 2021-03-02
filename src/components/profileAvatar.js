import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const ProfileAvatar = (props) => {
  const { firstName,
          lastName } = props;

  return(
    <Avatar className="avatar" alt="picture" src="/static/images/avatar/1.jpg">
      <span>{firstName.substring(0,1)}{lastName.substring(0,1)}</span>
  </Avatar>
  )
}

export default ProfileAvatar;