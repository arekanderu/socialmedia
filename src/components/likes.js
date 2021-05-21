import React, { useState, useEffect }  from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
  const { firebase,
          uid,
          databaseKey,
          firstName,
          lastName,
          useru,
          uidid } = props;

  const [ like, setLike ] = useState(true);
  const [ color, setColor ] = useState("");
  const userName = firstName + ' ' + lastName;

  const likePost = () => {
    setLike(!like);
    groupOfUserWhoLiked();
  };

  const groupOfUserWhoLiked = () => {

  };

  useEffect(() =>{
    /**
     * Change the color to highlight that you like the post.
     */
    const colorChange = () => {
      like ? setColor("#808080") : setColor("#0000FF");
    }

    colorChange();
    })

  return(
    <div className="like-icon">
      <IconButton size="small" onClick={() => likePost()}>
        <ThumbUpIcon style={{fill: color }}/>
        <small className="like" style={{color: color}}>Like</small>
      </IconButton>
    </div>
  )
}

export default Likes;