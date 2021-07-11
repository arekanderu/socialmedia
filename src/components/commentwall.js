import React, { useState, useEffect } from 'react';
import ProfileAvatar from './profileavatar';

const CommentWall = (props) => {
  const { firebase,
          databaseKey,
          firstName,
          lastName } = props;

  const [ databasePosts, setDatabasePost ] = useState([]);
  const [ databaseKeys, setDatabaseKeys ] = useState([]);

  useEffect(() => {
    /**
     * Read the comment in database and push it to the state.
     */
    const database = () => {
      let ref = firebase.database().ref('comments/' + databaseKey);
        ref.orderByChild('date').on('value', snapshot => {
        let arrayPosts = [],
            arrayKeyValue = [];

        snapshot.forEach(item => {
            arrayPosts.push(item.val());
            arrayKeyValue.push(item.key);
        })

        setDatabaseKeys(arrayKeyValue.reverse());
        setDatabasePost(arrayPosts.reverse());
      })
    }
    database();
  }, [firebase, databaseKey])


  return(
  <div className="comment-wall">
    {Object.values(databasePosts).map(({content, date}, i) => (
      <div>
        <ProfileAvatar
          firstName={firstName}
          lastName={lastName}
          size='small'
        />
      {content}
      </div>
    ))}
  </div>
  );
}

export default CommentWall;