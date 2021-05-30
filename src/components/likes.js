import React, { useState, useEffect }  from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
  const { firebase,
          uid,
          databaseKey,
          fullName } = props;

  const [ like, setLike ] = useState(true);
  const [ color, setColor ] = useState("");

  //GENERAL IDEA: every post should automatically have their id
  //in likes table and will just add username as people likes it.

  /**
   * When you like a post it the user id of the liker will be added to
   * the database. Unliking the post will simply just remove the user's
   * id in the database.
   */
  const likePost = () => {
    let ref = firebase.database().ref('likes');

    setLike(!like);

    if(like === true){
      ref.child(databaseKey).set({uid: uid});
    }

    else{
      ref.child(databaseKey).remove();
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

  }, [like]);

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