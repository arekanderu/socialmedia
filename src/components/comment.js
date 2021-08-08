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
          triggerEditComment } = props;

  const classes = useStyles();
  const [ textFieldOn, setTextFieldOn ] = useState(false);
  const [ textValue, setTextValue ] = useState('');

  useEffect(() => {
    const changeToTextField = () => {
      if(triggerEditComment) {
        setTextFieldOn(true);
      }

    }


    changeToTextField();

  }, [triggerEditComment])



  return(
    <div className="comment-content">
      {textFieldOn ?
        <TextField
          autoFocus
          value={content}
          type="text"
          // onChange={(e) => setTextValue(e.target.value)}
          autoComplete="off"
          fullWidth
          InputProps={{
            className: classes.textField
          }}
        />
      :
      <small>{content}</small>}

    </div>
  );
}

export default Comment;