import React from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
  const {  } = props;

  return(
    <div className="like-icon">
    <IconButton size="small">
        <ThumbUpIcon />
        <small className="like">Like</small>
      </IconButton>
    </div>
  )
}

export default Likes;