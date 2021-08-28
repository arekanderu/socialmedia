import React, { useState, useEffect } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textField: {
    fontSize: '15px',
    width: '63vw',
  },
}));

const Comment = (props) => {
  const { content,
          triggerEditComment,
          commentId,
          commentIdToEdit,
          textValue,
          setTextValue,
          firebase,
          postId } = props;

  const classes = useStyles();
  const [ textFieldOn, setTextFieldOn ] = useState(false);

  /**
   *
   * @param e the event
   *
   * If you press enter / keycode 13 it will update the post and
   * close the text box.
   * If you press cancel / keycode 27 it wil close the text box.
   */
  const handleKeyDown = (e) => {
    if(e.keyCode === 13){
      firebase.database().ref('comments/' + postId).child(commentId).update({
        content: textValue
      });
      setTextFieldOn(false);
    }

    if(e.keyCode === 27){
      setTextFieldOn(false);
    }
  }

  useEffect(() => {
    /**
     * If you click on edit on your own comment and the comment id
     * of the post matches the one you clicked it will show the edit
     * textbox.
     */
    const changeToTextField = () => {
      if(triggerEditComment && commentId === commentIdToEdit) {
        setTextFieldOn(true);
      }
      else{
        setTextFieldOn(false);
      }
    }

    changeToTextField();

  }, [ triggerEditComment, commentIdToEdit, commentId ])



  return(
    <div>
      <div className="comment-content">
        {textFieldOn ?
          <TextField
            autoFocus
            value={textValue}
            type="text"
            onChange={(e) => setTextValue(e.target.value)}
            autoComplete="off"
            fullWidth
            onKeyDown={handleKeyDown}
            InputProps={{
              className: classes.textField
            }}
          />
        :
        <small>{content}</small>}
      </div>
      {textFieldOn ?
          <small className="esc">Press Esc to <span className="cancel" onClick={() => setTextFieldOn(false)}>cancel</span>.</small> : '' }
    </div>
  );
}

export default Comment;