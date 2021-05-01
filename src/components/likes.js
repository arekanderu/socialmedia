import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';

const Likes = (props) => {
  const {  } = props;

  return(
    <IconButton size="small">
      <FavoriteIcon />
      <small className="comment-action">Like</small>
    </IconButton>
  )
}

export default Likes;