import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ProfileAvatar from './profileavatar';
import Posts from './posts';
import DialogBox from './dialogbox';

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
  const [ temp, setTemp ] = useState('');
  const [ openDialog, setOpenDialog ] = useState(false);

  /**
   * Close the Dialog Box.
   */
  const handleClose = () => {
    setOpen(false);
  }

  /**
   * First checks if the text value is not empty and the action is Post. If
   * yes it will connect to the database and push the data from the text box
   * in to the database with the current time and date.
   *
   * else if text value is not empty but action is Save it will connect to
   * the database and update the post to the new content with the current
   * time and date.
   *
   * else the post is currently empty and will flag an error.
   */
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

  /**
   * A function that will change the title and button name to constitute a
   * creation of a new post.
   */
  const createPost = () => {
    setOpen(true);
    setTitle('Create Post');
    setAction('Post');
  }

  /**
   *
   * @param content the new text value.
   * @param databaseKey the key of the text value you want to edit.
   *
   * A function that will change the title and button name to constitue the
   * update of a given post. It will also update the post.
   */
  const editPost = (content, databaseKey) => {
    setOpen(true);
    setTitle('Edit Post');
    setAction('Save');
    setTextValue(content);
    setDatabaseKey(databaseKey);
    setTemp(content);
  }

  /**
   * Reset values of the text box, close the dialog box and remove any errors.
   */
  const resetValues = () => {
    setTextValue('');
    setOpen(false);
    setError('');
  }

  const handleOnChange = (e) => {
    setTextValue(e.target.value);

    if(textValue !== temp){
      setOpenDialog(true);
    }
    else{
      setOpenDialog(false);
    }

    console.log(openDialog);
  }

  useEffect(() => {
    /**
     * Gather all the post in the database of the logged on user and put it on
     * the array in reverse so it can be viewed from newest to oldest.
     */
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
    };

    /**
     * When you are on edit dialog box and decided to exit it will clear the text
     * field.
     */
    const clearTextField = () => {
      if(open === false && action === 'Save') {
        setTextValue('');
      }
    };

    // const openDialogBox = () => {
    //   if(textValue !== temp){
    //     setOpenDialog(true);
    //     console.log(openDialog);
    //   }
    // }

    database();
    clearTextField();
    // openDialogBox();

  }, [firebase, uid, action, open, openDialog, temp, textValue])

  return(
    <div className="wall">
      <br />
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
          <Divider />
          <br />

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
              onChange={(e) => handleOnChange(e)}
              value={textValue}
              autoComplete="off"
            />

            { temp === textValue ? 'yes' : 'no'}
            { openDialog ? 'yes' : 'no' }

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
      open={open}
    />

    <DialogBox />

    </div>
  )
}

export default Create;