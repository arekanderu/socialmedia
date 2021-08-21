import React from 'react';
import { Container } from '@material-ui/core';
import ProfileAvatar from './profileavatar';

const Profile = (props) => {
  const { firstName,
          lastName } = props;

  const fullName = firstName + ' ' + lastName;

  return(
    <Container>
      <div className='profile'>
        <div className='profile-avatar'>
          <ProfileAvatar
            firstName={firstName}
            lastName={lastName}
            size='large'
          />
        </div>
        <span className="profile-full-name">{fullName}</span>
      </div>
    </Container>
  )
}

export default Profile;