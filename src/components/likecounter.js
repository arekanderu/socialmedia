import React, { useState, useEffect }  from 'react';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';

const LikeCounter = (props) => {
  const { firebase,
          uid,
          postId,
          databaseKey,
          fullName } = props;

  const [ username, setUserName ] = useState('');
  const [ counter, setCounter ] = useState(0);

  useEffect(() =>{
    /**
     * The function reads how much children the post id has.
     * The function also determine wether the one of the children is
     * associated with the logged on user or not. If yes username will be
     * set to 'You' else it will show the fullname of the user.
     */

  const readDatabase = () => {
    firebase.database().ref('likes/' + databaseKey).once("value", snapshot => {
      let children = snapshot.numChildren();
        setCounter(children);

        if(children > 2){
          //Show like count
        }

        //user name to be shown for more than 3 likers.

        snapshot.forEach(item => {
          item.key === uid ? setUserName('You') : setUserName(fullName);
        })
    })
  }

  readDatabase();

}, [firebase, uid, postId]);

  return(
    <div className="like-counter">
      {counter >= 1 ?
        <div>
          <ThumbUpAltTwoToneIcon fontSize="small" style={{fill: '#3b5998'}} />
          <small className="like-counter-user">{username}</small>
        </div>
      : ''}
    </div>
  )
}

export default LikeCounter;