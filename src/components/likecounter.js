import React, { useState, useEffect }  from 'react';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';

const LikeCounter = (props) => {
  const { firebase,
          uid,
          postId,
          databaseKey } = props;

  const [ username, setUserName ] = useState('');
  const [ isLiked, setIsLiked ] = useState('true');
  const [ counter, setCounter ] = useState('');
  const [ array, setArray ] = useState([]);

  useEffect(() =>{
    /**
     * The function checks the database for post ids.
     */

  const readDatabase = () => {
    firebase.database().ref('likes/' + databaseKey).once("value", snapshot => {
      snapshot.forEach(item => {
        array.push(item.key);

        if(array.length !== 0){
          setCounter(1);
        }
        else{
          setCounter(0);
        }
      })

    })
  }

  readDatabase();

}, [firebase, uid, postId, array]);

  return(
    <div className="like-counter">
      {counter === 1 ?
        <div>
          <ThumbUpAltTwoToneIcon fontSize="small" style={{fill: '#3b5998'}} />
          <small className="like-counter-user">{username}</small>
        </div>
      : ''}
    </div>
  )
}

export default LikeCounter;