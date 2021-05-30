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
   * COMMENT ME....
   */
  const likePost = () => {
    setLike(!like);

    if(like === true){
      let ref = firebase.database().ref('likes');

      ref.child(databaseKey).set({uid: uid});
    }

    // else{
    //   //if unliked delete data.
    // }
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