import React, { useState, useEffect }  from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
  const { firebase,
          uid,
          databaseKey,
          firstName,
          lastName } = props;

  const [ like, setLike ] = useState(true);
  const [ color, setColor ] = useState("");
  const fullName = firstName + ' ' + lastName;

  const likePost = () => {
    setLike(!like);
    groupOfUserWhoLiked();
  };

  const groupOfUserWhoLiked = () => {
    if(like === true){
      let ref = firebase.database().ref('posts/' + uid ).child(databaseKey),
        user = fullName,
        liked = true;

        let postData = {
          user,
          liked
        }

        ref.push(postData);
    }

    else{

    }
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