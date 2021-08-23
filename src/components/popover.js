import React, { useState } from 'react';
import Popper from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Box, Button } from '@material-ui/core';
import DialogBox from './dialogbox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PopoverPopupState(props) {

  const [ openDialog, setOpenDialog ] = useState(false);

  /**
   *
   * @param content The text value of the object intending to be edited.
   * @param databaseKey The key value of the object intending to be edited.
   * @param popupState The state of they popup wether its open or close.
   *
   * When you click on the Edit button it will pass the data to the function for later use then it will close the popup.
   */
  const handleOnClick = (functionality, action, popupState, postId) =>{
    if(functionality === 'post'){
      console.log(postId);
      if(action === 'edit'){
        props.editDialog(props.content, postId);
      }

      else{
        props.deleteDialog(postId);
      }
    }


    if(functionality === 'comment'){
      if(action === 'edit'){
        props.action(props.commentId);
        props.setTextValue(props.content);
      }

      else{
        setOpenDialog(true);
      }
    }

    popupState.close();
  };

  const deleteComment = () =>{
    let ref = props.firebase.database().ref('comments/' + props.postId);

    ref.child(props.commentId).remove();
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
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Button size="small" onClick={() => handleOnClick(props.functionality, 'edit', popupState, props.postId, props.commentId)}>
                {props.functionality === 'post' ? <EditIcon /> : '' }
                &nbsp;{props.firstBox}
              </Button>
              <br />
              <Button size="small" onClick={() => handleOnClick(props.functionality, 'delete', popupState, props.postId, props.commentId)}>
                {props.functionality === 'post' ? <DeleteIcon /> : '' }
                &nbsp;{props.secondBox}
              </Button>
            </Box>
          </Popper>
          <DialogBox
            open={openDialog}
            title={'Delete Comment'}
            message={'Are you sure you want to delete this comment? '}
            action={'Cancel'}
            secondaryAction={'Delete'}
            deleteComment={deleteComment}
            openDialog={setOpenDialog}
          />
        </div>
      )}
    </PopupState>
  );
}