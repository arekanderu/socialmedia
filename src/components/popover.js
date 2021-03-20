import React from 'react';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PopoverPopupState(props) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <MoreVertIcon {...bindTrigger(popupState)}/>
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
            <Box p={3}>
              <Button size="small" onClick={() => props.editPost(props.content, props.databaseKey)}>
                <EditIcon/>&nbsp;
                Edit post
              </Button>
              <hr />
              <Button size="small" >
                <DeleteIcon/>&nbsp;
                Move to trash
              </Button>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}