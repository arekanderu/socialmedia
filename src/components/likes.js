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

  /**
   * COMMENT ME....
   */
  const likePost = () => {
    setLike(!like);

    if(like === true){

      let ref = firebase.database().ref('likes/');

      let likeData = {
        uid: uid,
        postid: databaseKey,
      }

      ref.push(likeData);
    }

    else{
      //if unliked delete data.
    }
  };

  useEffect(() =>{
    /**
     * Change the color to highlight that you like the post.
     */
    const colorChange = () => {
      like ? setColor("#808080") : setColor("#0000FF");
    }

    // /**
    //  * The function initializes a like table and appends it to the existing
    //  * post this will be used later to see which users liked the post.
    //  */
    // const appendLikeTable = () => {
    //   const initUserName = '',
    //         initUserId = '';

    //   let ref = firebase.database().ref('posts/' + uid).child(databaseKey + '/likes/');
    //     ref.once("value", snapshot => {
    //       if(!snapshot.exists()){
    //         let postData = {
    //           userName: initUserName,
    //           userId: initUserId
    //         };

    //         ref.push(postData);
    //       }
    //    });
    // }

    colorChange();
    // appendLikeTable();
    },[like]);

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