import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const DialogBox = (props) => {
  const { open,
          title,
          message,
          action,
          secondaryAction } = props;

  /**
   * Close the Dialog Box.
   */
     const handleClose = () => {
    }

  return(
    <div className="dialog-box">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogActions>
            <Button className="close-button" >
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
              // onClick={}
            >
              {action}
            </Button>

            <Button
               color="primary"
               variant="contained"
              //  onClick={}
            >
              {secondaryAction}
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default DialogBox;