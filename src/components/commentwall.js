import React, { useState, useEffect } from 'react';

const CommentWall = (props) => {
  const { firebase,
          databaseKey } = props;

  const [ databasePosts, setDatabasePost ] = useState([]);
  const [ databaseKeys, setDatabaseKeys ] = useState([]);

  useEffect(() => {
    /**
     * EDIT ME.
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
      {content}
      {date}
      </div>
    ))}
  </div>
  );
}

export default CommentWall;