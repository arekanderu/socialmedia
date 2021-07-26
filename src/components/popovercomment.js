import React from 'react';
import Popper from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Box, Button } from '@material-ui/core';

export default function PopoverPopupState(props) {
  /**
   *
   * @param content The text value of the object intending to be edited.
   * @param databaseKey The key value of the object intending to be edited.
   * @param popupState The state of they popup wether its open or close.
   *
   * When you click on the Edit button it will pass the data to the function for later use then it will close the popup.
   */
  const handleOnClick = (action, popupState, databaseKey) =>{
    if(action === 'edit'){

    }

    else{

    }
    popupState.close();
  };

  return (
    <PopupState variant="popper" >
      {(popupState) => (
        <div>
          <MoreHorizIcon {...bindTrigger(popupState)}/>
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
              <Button size="small" onClick={() => handleOnClick('edit', popupState, props.databaseKey)}>
                Edit
              </Button>
              <br />
              <Button size="small" onClick={() => handleOnClick('delete', popupState, props.databaseKey)}>
                Delete
              </Button>
            </Box>
          </Popper>
        </div>
      )}
    </PopupState>
  );
}