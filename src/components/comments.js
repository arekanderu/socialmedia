import React from 'react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { IconButton } from '@material-ui/core';

const Comments = (props) => {
  const {  } = props;

  return(
    <IconButton size="small">
      <ChatBubbleOutlineIcon />
      <small className="comment-action">Comment</small>
  </IconButton>
  );
}

export default Comments;