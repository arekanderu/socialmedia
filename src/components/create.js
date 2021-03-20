import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ProfileAvatar from './profileavatar';
import Posts from './posts';

const Create = (props) => {
  const { firstName,
          lastName,
          firebase,
          uid } = props;
  const [ open, setOpen ] = useState(false);
  const [ textValue, setTextValue ] = useState('');
  const [ databasePosts, setDatabasePost ] = useState([]);
  const [ databaseKeys, setDatabaseKeys ] = useState([]);
  const [ error, setError ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ action, setAction ] = useState('');
  const [ databaseKey, setDatabaseKey ] = useState('');

  const handleClose = () => {
    setOpen(false);
  }

  const post = () => {

    if(textValue !== " " && action === 'Post') {

      let ref = firebase.database().ref('posts/' + uid),
          currentDateTime = new Date().toLocaleString(),
          contentEntry = textValue;

        let postData = {
          content: contentEntry,
          date: currentDateTime
        }

        ref.push(postData);
        resetValues();
    }

    else if(textValue !== " " && action === 'Save'){

     let currentDateTime = new Date().toLocaleString();

     firebase.database().ref('posts/' + uid).child(databaseKey).update({
            content: textValue,
            date: currentDateTime
      });
      handleClose();
    }

    else{
      setError('This post appears to be blank. Please write something.');
    }
  }

  const createPost = () => {
    setOpen(true);
    setTitle('Create Post');
    setAction('Post');
  }

  const editPost = (content, databaseKey) => {
    setOpen(true);
    setTitle('Edit Post');
    setAction('Save');
    setTextValue(content);
    setDatabaseKey(databaseKey);
  }

  const resetValues = () => {
    setTextValue('');
    setOpen(false);
    setError('');
  }

  useEffect(() => {
    const database = () => {
      firebase.database().ref('posts/' + uid).on('value', snapshot => {
        let arrayPosts = [],
            arrayKeyValue = [];

        snapshot.forEach(item => {
            arrayPosts.push(item.val());
            arrayKeyValue.push(item.key);

            setDatabaseKeys(arrayKeyValue.reverse());
            setDatabasePost(arrayPosts.reverse());
        })
      })
    }; database();
  }, [firebase, uid])

  return(
    <div className="wall">
      <br />S
      <TextField
        placeholder={"Whats on your mind, " + firstName}
        fullWidth
        onClick={() => createPost()}
        value={textValue}
      />

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogActions>
            <Button className="close-button" onClick={() => setOpen(false)} >
              <HighlightOffIcon />
            </Button>
            </DialogActions>
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>

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
              {action}
            </Button>
          </DialogActions>
          <p className="alert">{error}</p>
        </Dialog>

    <Posts
      firstName={firstName}
      lastName={lastName}
      databasePosts={databasePosts}
      databaseKeys={databaseKeys}
      editPost={editPost}
    />

    </div>
  )
}

export default Create;