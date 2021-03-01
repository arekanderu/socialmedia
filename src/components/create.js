import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Create = (props) => {
  const { firstName,
          lastName,
          firebase,
          uid } = props;
  const [ open, setOpen] = useState(false);
  const [ textValue, setTextValue ] = useState('');
  const [ databasePosts, setDatabasePost ] = useState([]);

  const handleClose = () => {
    setOpen(false);
  }

  const post = () => {
    let ref = firebase.database().ref('posts/' + uid),
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

  const readUserData = () => {
    let arrayPosts = [];

    firebase.database().ref('posts/' + uid).on('value', snapshot => {
      snapshot.forEach(item => {

        let tempPost = item.val();

            arrayPosts.push(tempPost);
            setDatabasePost(arrayPosts.reverse());
      })
    })
  }

  useEffect(() =>{
    readUserData();
  }, [firebase])

  return(
    <div className="wall">
      <br />
      <TextField
        placeholder = {"Whats on your mind, " + firstName}
        fullWidth
        onClick={() => setOpen(true)}
        value = {textValue}
      />

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogActions>
            <Button className="close-button" onClick={() => setOpen(false)} >
              <HighlightOffIcon />
            </Button>
            </DialogActions>
          <DialogTitle id="form-dialog-title">Create A Post</DialogTitle>

          <DialogContent>
              <div className="content-header">
                <Avatar className="avatar" alt="picture" src="/static/images/avatar/1.jpg">
                  <span>{firstName.substring(0,1)}{lastName.substring(0,1)}</span>
                </Avatar>
                  <div className="name">
                    {firstName} {lastName}
                  </div>
                </div>
                <br />
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

    <div className="posts">
      {Object.values(databasePosts).map(({content, date}, i) => (
      <div key={i}>
        <small>{date}</small>
        <h3>{content}</h3>
      </div>
      ))}
    </div>
    </div>
  )
}

export default Create;