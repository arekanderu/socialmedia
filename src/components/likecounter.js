import React, { useState, useEffect }  from 'react';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';

const LikeCounter = (props) => {
  const { firebase,
          uid,
          postId,
          databaseKey } = props;

  const [ username, setUserName ] = useState('');
  const [ isLiked, setIsLiked ] = useState('true');

  useEffect(() =>{
    /**
     * The function checks the database for post ids.
     */

  const readDatabase = () => {
    firebase.database().ref('likes/' + databaseKey).once("value", snapshot => {
      snapshot.forEach(item => {
        if(item.key === uid){
          setUserName('You');
        }
        else{
          setUserName('Something');
        }
      })
    })
  }

  readDatabase();

}, [firebase, uid, postId]);

  return(
    <div className="like-counter">
      {databaseKey}
         <div>
          <ThumbUpAltTwoToneIcon fontSize="small" style={{fill: '#3b5998'}} />
          <small className="like-counter-user">{username}</small>
        </div>
    </div>
  )
}

export default LikeCounter;