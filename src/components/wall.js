import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Wall = (props) => {
  const { firstName,
          lastName } = props;
  const [ open, setOpen] = useState(false);

  return(
    <div className="wall">
      <br />
      <TextField
        placeholder = {"Whats on your mind, " + firstName}
        fullWidth
        onClick={() => setOpen(true)}
      />

        <Dialog open={open} onClose={open} aria-labelledby="form-dialog-title" fullWidth>
          <DialogActions>
            <Button className="close-button" onClick={() => setOpen(false)} >
              <HighlightOffIcon />
            </Button>
            </DialogActions>
          <DialogTitle id="form-dialog-title">Create A Post</DialogTitle>

          <DialogContent>
            <DialogContentText>
              <div className="content-header">
                <Avatar className="avatar" alt="picture" src="/static/images/avatar/1.jpg">
                  {firstName.substring(0,1)}{lastName.substring(0,1)}
                </Avatar>
                  <div className="name">
                    {firstName} {lastName}
                  </div>
                </div>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              placeholder="Whats on your mind?"
              type="text"
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button
              fullWidth
              color="primary"
              variant="contained">
              Post
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default Wall;