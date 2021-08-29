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
          deleteComment,
          setImage,
          handleUpload } = props;

  /**
   * Close the Dialog Box and change the text value of the main text box to
   * nothing.
   */
  const handleClose = () => {
    if(isDelete === 'Post'){
      textValue(temp);
    }
    openDialog(false);
  }

  /**
   * Delete a POST and close main dialog box.
   * else if it is a comment it will delete a
   * comment on a the post. Else, it will
   * run upload image command from props.
   * After every if's
   * it will close the dialog box.
   *
   */
  const handleOnClick = () => {
    if(isDelete === 'Post'){
      deletePost();
      mainDialog(false);
    }

    else if(isDelete === 'Comment'){
      deleteComment();
    }

    else{
      handleUpload();
    }

    openDialog(false);
  };

  /**
   * @param e The target file name.
   * Capture the image from file.
   */
  const handleChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  };

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
          {message !== '' ?
            <p>{message}</p>
            :
            <input type="file" onChange={handleChange}/>
          }

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