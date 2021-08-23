import React from 'react';
import { Container, Popover, Button, Box } from '@material-ui/core';
import ProfileAvatar from './profileavatar';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const Profile = (props) => {
  const { firstName,
          lastName } = props;

  const fullName = firstName + ' ' + lastName;

  return(
    <Container>
      <div className='profile'>
        <div className='profile-avatar'>

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
            <Button {...bindTrigger(popupState)}>
              <ProfileAvatar
                firstName={firstName}
                lastName={lastName}
                size='large'
             />
            </Button>

            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
            <Box p={2}>
              <Button size="small">
                <PhotoLibraryIcon />
                &nbsp; Update Profile Picture
              </Button>
            </Box>
          </Popover>
            </div>
          )}
        </PopupState>
        </div>
        <span className="profile-full-name">{fullName}</span>
      </div>

    </Container>
  )
}

export default Profile;