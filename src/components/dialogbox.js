import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const DialogBox = (props) => {
  const { open,
          title,
          message,
          action,
          secondaryAction,
          openDialog,
          mainDialog,
          textValue,
          temp,
          isDelete,
          deletePost,
          deleteComment } = props;

  /**
   * Close the Dialog Box and change the text value of the main text box to
   * nothing.
   */
  const handleClose = () => {
    if(isDelete === ' Delete'){
      textValue(temp);
    }
    openDialog(false);
  }

  /**
   * Delete a post and close main dialog box.
   * else it will delete a comment on a post.
   * It will then close the propmpt dialog box.
   */
  const handleOnClick = () => {
    if(isDelete === 'Delete'){
      deletePost();
      mainDialog(false);
    }

    else{
      deleteComment();
    }

    openDialog(false);
  }

  return(
    <div className="dialog-box">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogActions>
            <Button className="close-button" onClick={() => handleClose()}>
              <HighlightOffIcon />
            </Button>
          </DialogActions>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <Divider />

        <DialogContent >
        <p>{message}</p>
        </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              onClick={() => handleClose()}
            >
              {action}
            </Button>

            <Button
               color="primary"
               variant="contained"
               onClick={() => handleOnClick()}
            >
              {secondaryAction}
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default DialogBox;