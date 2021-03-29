import React from 'react';
import Popper from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PopoverPopupState(props) {
  /**
   *
   * @param content The text value of the object intending to be edited.
   * @param databaseKey The key value of the object intending to be edited.
   * @param popupState The state of they popup wether its open or close.
   *
   * When you click on the Edit button it will pass the data to the function for later use then it will close the popup.
   */
  const handleOnClick = (content, databaseKey, popupState) =>{
    props.editPost(content, databaseKey)
    popupState.close();
  };

  return (
    <PopupState variant="popper" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <MoreVertIcon {...bindTrigger(popupState)}/>
          <Popper
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
              <Button size="small" onClick={() => handleOnClick(props.content, props.databaseKey, popupState)}>
                <EditIcon/>&nbsp;
                Edit post
              </Button>
              <hr />
              <Button size="small" >
                <DeleteIcon/>&nbsp;
                Move to trash
              </Button>
            </Box>
          </Popper>
        </div>
      )}
    </PopupState>
  );
}