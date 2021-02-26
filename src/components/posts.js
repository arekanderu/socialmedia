import React, { useState, useEffect } from 'react';

//Test if key value is changing or not reversing.
//
const Posts = (props) => {
  const { firebase,
          uid} = props;
  const [ databasePosts, setDatabasePost ] = useState([]);
  //const [ keyValue, setKeyValue ] = useState([]);
  const readUserData = () => {
    let arrayPosts = [],
        arrayKeyValue = [];

    firebase.database().ref('posts/' + uid).once('value', snapshot => {
      snapshot.forEach(item => {

        let tempPost = item.val();
            //tempKeyValue = item.key;

            arrayPosts.push(tempPost);
            //arrayKeyValue.push(tempKeyValue);

            setDatabasePost(arrayPosts.reverse());
            //setKeyValue(arrayKeyValue.reverse());
      })
    })
  }

  useEffect(() =>{
    readUserData();
  },[])

  return(
    <div className="posts">
      {Object.values(databasePosts).map(({content, date}, i) => (
        <div>
          <small>{date}</small>
          <h3 key={i}>{content}</h3>
        </div>
      ))}
    </div>
  )
}

export default Posts;