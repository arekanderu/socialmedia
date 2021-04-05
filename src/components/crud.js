import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ProfileAvatar from './profileavatar';
import Posts from './posts';
import DialogBox from './dialogbox';

const Crud = (props) => {
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
  const [ textChanged, setTextChanged ] = useState(false);
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ dialogTitle, setDialogTitle ] = useState('');
  const [ dialogMessage, setDialogMessage ] = useState('');
  const [ dialogActionName, setDialogActionName ] = useState('');
  const [ dialogSecondaryActionName, setDialogSecondaryActionName ] = useState('');

  /**
  * If you make any changes to the textbox while you are in 'Edit' mode
  * and you try to exit it will prompt you if you want to save any
  * changes. Otherwise, it will just close all dialog boxes.
  */
  const handleClose = () => {
    if(action === 'Save' && textChanged === true){
      setOpenDialog(true);
      setDialogTitle('Unsaved changes');
      setDialogMessage('Changes you made will not be saved.');
      setDialogActionName('Keep Editing');
      setDialogSecondaryActionName('Discard');
    }

    else{
      setOpenDialog(false);
      setOpen(false);
    }
  }

  /**
   * First checks if the text value is not empty and the action is 'Post'.
   * If yes it will connect to the database and push the data from the
   * textbox into the database with the current time and date.
   *
   * else if text value is changed from the orignal text and the action is
   * 'Save' it will connect to the database and update the post to the new
   * content with the current time and date.
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

    else if(textChanged === true && action === 'Save'){
     let currentDateTime = new Date().toLocaleString();

     firebase.database().ref('posts/' + uid).child(databaseKey).update({
            content: textValue,
            date: currentDateTime
      });

      setOpen(false);
    }

    else{
      setError('This post appears to be blank. Please write something.');
    }
  }

  /**
   * A function that will open a dialog box and change the title and
   * button name to constitute a creation of a post.
   */
  const createDialog = () => {
    setOpen(true);
    setTitle('Create Post');
    setAction('Post');
  }

  /**
   *
   * @param content the new text value.
   * @param databaseKey the key of the text value you want to edit.
   *
   * A function that will open a dialog box and change the title and
   * button names of the dialog box to constitute an update operation.
   * It will also update new state values to be used later to update the
   * post.
   */
  const editDialog = (content, databaseKey) => {
    setOpen(true);
    setTitle('Edit Post');
    setAction('Save');
    setTextValue(content);
    setDatabaseKey(databaseKey);
    setTemp(content);
  }

  /**
   * A function that will open the dialog box and change the titles, and
   * button names of the dialog box to constitute a delete operation.
   * It will also update databasekey state for later use.
   */
  const deleteDialog = (databaseKey) => {
    setOpenDialog(true);
    setDialogTitle('Move to Trash?');
    setDialogMessage('This post will be deleted. Are you sure you want to continue?');
    setDialogActionName('Cancel');
    setDialogSecondaryActionName('Delete');
    setDatabaseKey(databaseKey);
  }


  /**
   * Delete a post with the database key.
   */
  const deletePost = () => {
    let ref = firebase.database().ref('posts/' + uid);

      ref.child(databaseKey).remove();
  }

  /**
   * Reset values of the text box, close the dialog box and remove any errors.
   */
  const resetValues = () => {
    setTextValue('');
    setOpen(false);
    setError('');
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
     * When you are on edit dialog box and decided to exit it will clear the main
     * textfield.
     */
    const clearTextField = () => {
      if(open === false && action === 'Save') {
        setTextValue('');
      }
    };

    /**
     * If the textvalue of the opened textbox changed it will set state to true.
     */
    const textHasChanged = () => {
      textValue !== temp ? setTextChanged(true) : setTextChanged(false);
    }

    database();
    clearTextField();
    textHasChanged();

  }, [firebase, uid, action, open, textChanged, temp, textValue])

  return(
    <div className="wall">
      <br />
      <TextField
        placeholder={"Whats on your mind, " + firstName}
        fullWidth
        onClick={() => createDialog()}
        value={textValue}
      />

        <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title" fullWidth>
          <DialogActions>
            <Button className="close-button" onClick={() => handleClose()} >
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
              onClick={() => post(false)}
              disabled={textValue.length === 0 || textChanged === false}
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
      editDialog={editDialog}
      open={open}
      deleteDialog={deleteDialog}
    />

    <DialogBox
      open={openDialog}
      title={dialogTitle}
      message={dialogMessage}
      action={dialogActionName}
      secondaryAction={dialogSecondaryActionName}
      openDialog={setOpenDialog}
      mainDialog={setOpen}
      textValue={setTextValue}
      temp={temp}
      isDelete={dialogSecondaryActionName}
      deletePost={deletePost}
    />

    </div>
  )
}

export default Crud;