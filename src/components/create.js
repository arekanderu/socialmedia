import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ProfileAvatar from './profileAvatar';
import Posts from './posts';

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
        contentEntry = textValue;

        let postData = {
          content: contentEntry,
          date: currentDateTime
        }

        ref.push(postData);
        setTextValue('');
        setOpen(false);
  }

  useEffect(() => {
    let arrayPosts = [];

    firebase.database().ref('posts/' + uid).on('value', snapshot => {
      snapshot.forEach(item => {

        let tempPost = item.val();

            arrayPosts.push(tempPost);
            setDatabasePost(arrayPosts.reverse());
      })
    })

  }, [firebase, uid])

  return(
    <div className="wall">
      {console.log(textValue.length !== 0)}
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
                <ProfileAvatar firstName={firstName} lastName={lastName}/>
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
              autoComplete="off"
            />
          </DialogContent>

          <DialogActions>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={post}
              disabled={textValue.length === 0}
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>

    <Posts
      firstName={firstName}
      lastName={lastName}
      databasePosts={databasePosts}
    />

    </div>
  )
}

export default Create;