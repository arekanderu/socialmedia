import React, { useState, useEffect } from 'react';
import ProfileAvatar from './profileavatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const CommentWall = (props) => {
  const { firebase,
          databaseKey,
          firstName,
          lastName,
          postId } = props;

  const [ databasePosts, setDatabasePost ] = useState([]);
  const [ commentCounter, setCommentCounter ] = useState(0);
  const [ message, setMessage ] = useState('View more comments');

  /**
   * STRUGGLES
   * bug 2: hovering css is not following the width of comment bubble.
   *           bug 3: show more comment only shows when you are refreshing the data. (Tip: listen to new comment value to update.)
   */

  const showMoreComment = () =>{
    setMessage('');
    firebase.database().ref('comments/' + databaseKey).once("value", snapshot => {
      let arrayPosts = [];

      snapshot.forEach(item => {
        arrayPosts.push(item.val());
      })

      setDatabasePost(arrayPosts);
    });
  }

  useEffect(() => {
    let ref = firebase.database().ref('comments/' + databaseKey);
    /**
     * Read the comment in database and push it to the state.
     * Query is only limit to 1 which is the very previous
     * comment.
     */
    const singleComment = () => {
        ref.orderByChild('date').limitToLast(1).on('value', snapshot => {

          let arrayPosts = [];

        snapshot.forEach(item => {
            arrayPosts.push(item.val());
        })
        setDatabasePost(arrayPosts);
      })
    }

    /**
     * Check the database how many comments one post has.
     */
    const checkForMoreComments = () => {
      ref.once("value", snapshot => {
        let children = snapshot.numChildren();
        setCommentCounter(children);
         });
    }

    singleComment();
    checkForMoreComments();

  }, [firebase, databaseKey, postId])


  return(
  <div className="comment-wall">
    <ul>
    {Object.values(databasePosts).map(({content}, i) => (
        <li key={i}>
          <div className="comment-avatar">
            <ProfileAvatar
              firstName={firstName}
              lastName={lastName}
              size='small'
            />
          </div>

          <div className="comment-wall-chatbox">
            <small className="comment-first-last-name">
              <a href="/#">{firstName} {lastName}</a>
            </small>

            <div className="comment-content">
              <small>{content}</small>
            </div>
          </div>

            <div className="comment-more">
              <MoreHorizIcon />
            </div>
            <br / >
            {commentCounter > 1 ? <u className="comment-view-more-comment" onClick={showMoreComment}>{message}</u> : '' }

        </li>
    ))}
    </ul>
  </div>
  );
}

export default CommentWall;