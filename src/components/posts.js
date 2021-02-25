import React, { useState } from 'react';

const Posts = (props) => {
  const { firebase,
          uid} = props;
  const readUserData = () => {
    //Test if key value is changing or not reversing.
    //make the database posts appear.
    let arrayPosts = [],
        arrayKeyValue = [];

    firebase.database().ref('Posts/' + uid).once('value', snapshot => {
      snapshot.forEact(item => {

        let tempPost = item.val(),
            tempKeyValue = item.key;

            arrayPosts.push(tempPost).reverse();
            arrayKeyValue.push(tempKeyValue).reverse();
      })
    })
  }

  return(
    <div className="posts">

    </div>
  )
}

export default Posts;