import React, { useState, useEffect }  from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
  const { firebase,
          uid,
          databaseKey,
          filteredArray } = props;

  const [ like, setLike ] = useState(false);
  const [ color, setColor ] = useState('#808080');

  useEffect(() =>{
    /**
     * The function checks the database for post ids.
     */
    const readDatabase = () => {
      firebase.database().ref('likes/' + databaseKey).once("value", snapshot => {
        let arrayPostId = [];

          snapshot.forEach(item => {
            arrayPostId.push(item.key);
           });
        })
      }

      readDatabase();

  }, [firebase, uid]);

  /**
   * When you like a post it will set the state to the oposite of the
   * current state. By default starting state is false. Because its
   * asynchronous the ternary operation is reversed because it is waiting
   * for the result in the useeffect before the value can change.
   * If the user unlike the post it will simply remove the user data in
   * the database.
   */
  const likePost = () => {
    setLike(!like)

    let ref = firebase.database().ref('likes/' + databaseKey);

    like ? ref.remove() : ref.child(uid).set(true);

  };

  return(
    <div>
      <div className="like-icon">
        <IconButton size="small" onClick={() => likePost()}>
        <ThumbUpIcon style={{fill: filteredArray[0] === databaseKey ? '#3b5998 ' : '' }}/>
        <small className="like" style={{ color: filteredArray[0] === databaseKey ? '#3b5998 ' : '' }}>Like</small>
        </IconButton>
      </div>
    </div>
  )
}

export default Likes;