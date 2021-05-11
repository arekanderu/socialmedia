import React, { useState, useEffect }  from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
  const { firebase,
          uid } = props;

  const [ like, setLike ] = useState(true);
  const [ color, setColor ] = useState("");

  const users = () => {
      let ref = firebase.database().ref('posts/' + uid),
          userName = "test";

        let postData = {
          like: userName
        }

        ref.push(postData);
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
      <IconButton size="small" onClick={() => setLike(!like)}>
        <ThumbUpIcon style={{fill: color }}/>
        <small className="like" style={{color: color}}>Like</small>
      </IconButton>
    </div>
  )
}

export default Likes;