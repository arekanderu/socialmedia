import React, { useState, useEffect }  from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
  const { firebase,
          uid,
          databaseKey } = props;

  const [ like, setLike ] = useState(false);
  const [ color, setColor ] = useState("");

  /**
   * When you like a post it will set the state to the oposite of the
   * current state. By default starting state is false. Because its
   * asynchronous the ternary operation is reversed because it is waiting
   * for the result in the useeffect before the value can change.
   * If the user unlike the post it will simply remove the user data in
   * the database.
   */
  const likePost = () => {
    let ref = firebase.database().ref('likes/' + databaseKey);
    setLike(!like);
    like ? ref.remove() : ref.child(uid).set(true);
  };

  useEffect(() =>{
    /**
     * Change the color to highlight that you like the post.
     */
    const colorChange = () => {
      like ?  setColor("#3B5998") : setColor("#808080");
    }

    /**
     * The function checks the database for post that has been liked and
     * apply set it to the local.
     */
    const database = () => {
      firebase.database().ref('likes/' + databaseKey).once("value", snapshot => {
          snapshot.forEach(item => {
            if(item.val() === true){
              setLike(true);
            }
          })
        })
      }

    database();
    colorChange();

  }, [like, databaseKey, firebase, uid]);

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