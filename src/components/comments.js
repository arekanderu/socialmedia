import React from 'react';
import { IconButton } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const Comments = (props) => {
  const { focus } = props;

  return(
    <div className="comment-icon">
      <IconButton size="small" onClick={() => focus()}>
        <ChatBubbleIcon />
        <small className="comment">Comment</small>
      </IconButton>
  </div>
  );
}

export default Comments;