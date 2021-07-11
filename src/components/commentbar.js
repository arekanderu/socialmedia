import React, { useState } from 'react';
import ProfileAvatar from './profileavatar';
import { TextField, Grid } from '@material-ui/core';

const Comments = (props) => {
  const { firstName,
          lastName,
          firebase,
          databaseKey } = props;

  const [ textValue, setTextValue ] = useState('');

  /**
   *
   * @param e the event that happened on the textfield.
   *
   * A function that takes the event of the textfield and decides whether its a keyboard Enter
   * event. If yes it will successfully enter the data value of the textfield to the comment
   * database along with the current date and time.
   *
   */
  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      let ref = firebase.database().ref('comments/' + databaseKey),
          currentDateTime = new Date().toLocaleString(),
          contentEntry = textValue;

        let commentData = {
          content: contentEntry,
          date: currentDateTime
        }

        ref.push(commentData);
        resetValues();
    }
  };

  /**
   * Reset values of the text box.
   */
  const resetValues = () => {
    setTextValue('');
  };

  return(
    <div className="comment-bar">
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <div className="small-avatar">
                <ProfileAvatar
                  firstName={firstName}
                  lastName={lastName}
                  size='small'
                />
              </div>
            </Grid>
            <Grid item xs={10} md={11}>
            <TextField
              fullWidth
              autoFocus
              onKeyDown={(e) => handleKeyDown(e)}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Write a comment..."
            />
            </Grid>
        </Grid>
  </div>
  );
}

export default Comments;