import React, { useState }  from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const LikeIcon = (props) => {
  const { firebase,
          uid,
          databaseKey,
          filteredArray } = props;

  const [ like, setLike ] = useState(false);

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
        <small className="like" style={{ color: filteredArray[0] === databaseKey ? '#3b5998' : '' }}>Like</small>
        </IconButton>
      </div>
    </div>
  )
}

export default LikeIcon;