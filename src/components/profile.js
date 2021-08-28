import React, { useState } from 'react';
import { Container, Popover, Button, Box } from '@material-ui/core';
import ProfileAvatar from './profileavatar';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DialogBox from './dialogbox';
import storage from '../config/database';

const Profile = (props) => {
  const { firstName,
          lastName } = props;

  const fullName = firstName + ' ' + lastName;
  const [ openDialog, setOpenDialog ] = useState(false);

  /**
   * @param popupState The state of the popup.
   *
   * When you click on the avatar picture it will open a dialog box and close the pop up.
   */
  const handleOnClick = (popupState) => {
    setOpenDialog(true);
    popupState.close();
  }

  return(
    <Container>
      <div className='profile'>
        <div className='profile-avatar'>

        <PopupState variant="popover">
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
              <Button size="small" onClick={() => handleOnClick(popupState)}>
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

      <DialogBox
        open={openDialog}
        title={'Update Profile Picture'}
        action={'Cancel'}
        secondaryAction={'Upload Photo'}
        message={''}
        openDialog={setOpenDialog}
        />

    </Container>
  )
}

export default Profile;