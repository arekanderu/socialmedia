import React, { useState, useEffect }  from 'react';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';

const LikeCounter = (props) => {
  const { databaseKey,
          firebase,
          uid,
          filteredArray } = props;

  const [ isUser, setIsUser ] = useState(false);

  useEffect(() =>{
    /**
     *
     */
    const readDatabase = () => {
      firebase.database().ref('likes/' + databaseKey).once("value", snapshot => {
        snapshot.forEach(item => {
          if(item.key === uid){
            setIsUser(true);
          }
          else{
            //show username and like counts.
            //not applicable until future implementations.
            setIsUser(false);
          }
        })
        })
      }

      readDatabase();

  }, [firebase, uid, databaseKey, filteredArray]);

  return(
    <div className="like-counter">
      { !isUser ? '' :
      <div>
        <ThumbUpAltTwoToneIcon fontSize="small" style={{fill: '#3b5998'}} />
        <small className="like-counter-user">You</small>
      </div>
    }
    </div>
  )
}

export default LikeCounter;