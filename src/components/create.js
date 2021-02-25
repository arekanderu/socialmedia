import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Create = (props) => {
  const { firstName,
          lastName,
          firebase,
          uid } = props;
  const [ open, setOpen] = useState(false);
  const [ textValue, setTextValue ] = useState('');
  const post = () => {
    let ref = firebase.database().ref('Posts/' + uid),
        currentDateTime = new Date().toLocaleString(),
        contentEntry = textValue

      let postData = {
        content: contentEntry,
        date: currentDateTime
      }

      ref.push(postData);
      setTextValue('');
      setOpen(false);
  }

  return(
    <div className="wall">
      <br />
      <TextField
        placeholder = {"Whats on your mind, " + firstName}
        fullWidth
        onClick={() => setOpen(true)}
        value = {textValue}
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
              onChange={(e) => setTextValue(e.target.value)}
              value={textValue}
            />
          </DialogContent>

          <DialogActions>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={post}
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default Create;