import React, { useState } from 'react';
import { Container, Popover, Button, Box } from '@material-ui/core';
import ProfileAvatar from './profileavatar';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DialogBox from './dialogbox';
import { storage } from '../config/database';

const Profile = (props) => {
  const { firstName,
          lastName,
          uid,
          imageUrl } = props;

  const fullName = firstName + ' ' + lastName;
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ image, setImage ] = useState('');

  /**
   * @param popupState The state of the popup.
   *
   * When you click on the avatar picture it will open a dialog box and close the pop up.
   */
  const handleOnClick = (popupState) => {
    setOpenDialog(true);
    popupState.close();
  }

  /**
   * Handles the upload to firebase storage.
   */
  const handleUpload = () =>{
    const uploadImage = storage.ref('users/' + uid + '/profile.jpg').put(image);

      uploadImage.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        });
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
                imageUrl={imageUrl}
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
        openDialog={setOpenDialog}
        message={''}
        setImage={setImage}
        handleUpload={handleUpload}
        />
    </Container>
  )
}

export default Profile;